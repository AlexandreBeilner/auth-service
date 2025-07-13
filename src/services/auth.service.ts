import { UsersRepository } from '../repositories/users.repository';
import { AuthException } from '../exceptions/auth.exception';
import { Hash } from '../utils/hash';
import { loginData, registerData } from '../types/auth.type';
import { redis } from '../config/redis';
import { Jwt } from '../utils/jwt';
import { RefreshTokensRepository } from '../repositories/refreshTokens.repository';
import dayjs from 'dayjs';
import { RefreshToken } from '../models/RefreshToken';

const BLOCK_TIME = 15 * 60; //15 minutes

export class AuthService {
    private usersRepository: UsersRepository;
    private refreshTokensRepository: RefreshTokensRepository;
    constructor(
        usersRepository: UsersRepository,
        refreshTokensRepository: RefreshTokensRepository
    ) {
        this.usersRepository = usersRepository;
        this.refreshTokensRepository = refreshTokensRepository;
    }

    async register(newUser: registerData) {
        const user = await this.usersRepository.getByEmail(newUser.email);
        if (user) {
            throw new AuthException('USED_EMAIL');
        }
        const hashedPassword = (await Hash.make(newUser.password)) as string;
        return await this.usersRepository.createUser({
            email: newUser.email,
            passwordHash: hashedPassword,
            name: newUser.name,
        });
    }

    public async login(data: loginData, rateLimitKey?: string) {
        console.log(data);
        const user = await this.usersRepository.getByEmail(data.email);
        const passwordIsEquals = await Hash.compare(data.password, user?.passwordHash ?? '');
        if (!user || !passwordIsEquals) {
            if (rateLimitKey) {
                await redis.incr(rateLimitKey);
                await redis.expire(rateLimitKey, BLOCK_TIME);
            }
            throw new AuthException('INVALID_CREDENTIAL_ARGUMENTS');
        }

        if (rateLimitKey) {
            await redis.del(rateLimitKey);
        }

        const accessToken = this.generateAccessToken(user.id);
        const refreshToken = await this.generateRefreshToken(user.id);
        return {
            accessToken,
            refreshToken,
        };
    }

    public async refreshToken(token: string) {
        const refreshToken = await this.refreshTokensRepository.getByToken(token);

        if (!refreshToken || refreshToken.revokedAt) {
            throw new AuthException('INVALID_REFRESH_TOKEN');
        }

        try {
            Jwt.verifyRefreshToken(token);
        } catch (err) {
            await this.revokeToken(refreshToken);
            throw new AuthException('INVALID_REFRESH_TOKEN');
        }

        if (refreshToken.expiresAt < new Date()) {
            await this.revokeToken(refreshToken);
            throw new AuthException('INVALID_REFRESH_TOKEN');
        }

        const newRefreshToken = this.generateRefreshToken(refreshToken.userId);
        const newAccessToken = this.generateAccessToken(refreshToken.userId);

        await this.revokeToken(refreshToken);

        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        };
    }

    private generateAccessToken(userId: string) {
        return Jwt.generateAccessToken({ userId });
    }

    private async revokeToken(token: RefreshToken) {
        token.revokedAt = new Date();
        await token.save();
    }

    private async generateRefreshToken(userId: string) {
        const refreshToken = Jwt.generateRefreshToken({ userId });
        const expiresAt = dayjs().add(7, 'days').toDate();
        await this.refreshTokensRepository.create({ token: refreshToken, userId, expiresAt });
        return refreshToken;
    }
}
