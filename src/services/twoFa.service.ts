import { TwoFaStrategy } from '../strategies/twoFa/twoFa.strategy';
import { UserException } from '../exceptions/user.exception';
import { UsersRepository } from '../repositories/users.repository';
import { EmailService } from './email.service';
import {config} from "../config/config";

export class TwoFaService {
    private twoFaStrategy: TwoFaStrategy | undefined;
    private usersRepository: UsersRepository;
    private emailService: EmailService;
    constructor(userRepository: UsersRepository, emailService: EmailService) {
        this.usersRepository = userRepository;
        this.emailService = emailService;
    }

    setTwoFaStrategy(strategy: TwoFaStrategy) {
        this.twoFaStrategy = strategy;
    }

    async activate(userId: string) {
        const user = await this.usersRepository.getById(userId);
        if (!user) {
            throw new UserException('USER_NOT_FOUND');
        }
        const response = await this.twoFaStrategy?.activate(user);
        await this.notifyActivation();
        return response;
    }

    async confirmActivation(userId: string, data: { code: string }) {
        const user = await this.usersRepository.getById(userId);
        if (!user) {
            throw new UserException('USER_NOT_FOUND');
        }
        return this.twoFaStrategy?.confirmActivation(user, data.code);
    }

    async notifyActivation() {
        await this.emailService.send(
            'alexandrebeilner10@gmail.com',
            'Autenticação em dois fatores ativada com sucesso',
            '',
            `<p>Olá,</p>
        <p>A autenticação em dois fatores foi <b>ativada com sucesso</b> em sua conta.<br>
        A partir de agora, será solicitado um segundo fator de verificação ao acessar nossos serviços, tornando sua conta ainda mais segura.</p>
        <p>Se você não reconhece esta alteração, por favor, <b>troque sua senha imediatamente</b> e entre em contato com nossa equipe de suporte.</p>
        <p>Atenciosamente,<br>Equipe ${config.serviceName}</p>`
        );
    }
}
