import {AuthRepository} from "../repositories/auth.repository";
import {AuthException} from "../exceptions/auth.exception";
import {Hash} from "../utils/hash";
import {registerData} from "../types/auth.type";

export class AuthService {
    private authRepository: AuthRepository;
    constructor(authRepository: AuthRepository) {
        this.authRepository = authRepository;
    }

    async register(newUser: registerData) {
        const user = await this.getByEmail(newUser.email);
        if (user) {
            throw new AuthException('USED_EMAIL');
        }
        const hashedPassword = await Hash.make(newUser.password) as string;
        return await this.authRepository.createUser({
            email: newUser.email,
            passwordHash: hashedPassword,
            name: newUser.name
        })
    }

    private getByEmail(email: string) {
        return this.authRepository.getByEmail(email)
    }
}
