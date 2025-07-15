import { TwoFaStrategy } from '../strategies/twoFa/twoFa.strategy';
import { UserException } from '../exceptions/user.exception';
import { UsersRepository } from '../repositories/users.repository';

export class TwoFaService {
    private twoFaStrategy: TwoFaStrategy | undefined;
    private usersRepository: UsersRepository;
    constructor(userRepository: UsersRepository) {
        this.usersRepository = userRepository;
    }

    setTwoFaStrategy(strategy: TwoFaStrategy) {
        this.twoFaStrategy = strategy;
    }

    async activate(userId: string) {
        const user = await this.usersRepository.getById(userId);
        if (!user) {
            throw new UserException('USER_NOT_FOUND');
        }
        return this.twoFaStrategy?.activate(user);
    }

    async confirmActivation(userId: string, data: { code: string }) {
        const user = await this.usersRepository.getById(userId);
        if (!user) {
            throw new UserException('USER_NOT_FOUND');
        }
        return this.twoFaStrategy?.confirmActivation(user, data.code);
    }
}
