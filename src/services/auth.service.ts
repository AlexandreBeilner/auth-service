import { UsersRepository } from '../repositories/users.repository';
import { AuthException } from '../exceptions/auth.exception';
import { Hash } from '../utils/hash';
import {loginData, registerData} from '../types/auth.type';
import {redis} from "../config/redis";
import {Jwt} from "../utils/jwt";
import {RefreshTokensRepository} from "../repositories/refreshTokens.repository";
import dayjs from 'dayjs';

const BLOCK_TIME = 15 * 60; //15 minutes

export class AuthService {
    private usersRepository: UsersRepository;
    private refreshTokensRepository: RefreshTokensRepository;
    constructor(usersRepository: UsersRepository, refreshTokensRepository: RefreshTokensRepository) {
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

    public async login(data: loginData) {
        const user = await this.usersRepository.getByEmail(data.email);
        const passwordIsEquals = Hash.compare(data.password, user?.passwordHash ?? '');
        if (!user || !passwordIsEquals) {
            if (data.key) {
                await redis.incr(data.key);
                await redis.expire(data.key, BLOCK_TIME);
            }
            throw new AuthException('INVALID_CREDENTIAL_ARGUMENTS');
        }

        if (data.key) {
            await redis.del(data.key);
        }


    }

    public async refreshToken(token: string) {

    }

    private generateAccessToken(userId: string) {
        return Jwt.generateAccessToken({userId})
    }

    private async generateRefreshToken(userId: string) {
        const refreshToken = Jwt.generateRefreshToken({userId});
        const expiresAt = dayjs().add(7, 'days').toDate();
        await this.refreshTokensRepository.create({token: refreshToken, userId, expiresAt, revoked: false})
    }
}
