import { TwoFaStrategy } from '../twoFa.strategy';
import { User } from '../../../models/User';
import { EmailService } from '../../../services/email.service';

export class TwoFaOPTStrategy implements TwoFaStrategy {
    activate = async (user: User) => {
        await user.update({
            isTwoFactorEnabled: true,
            twoFactorType: 'email_otp',
        });
    };

    confirmActivation = async (user: User, code: string) => {
        return true;
    };
}
