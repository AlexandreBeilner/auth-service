import { TwoFaStrategy } from '../twoFa.strategy';
import { authenticator } from 'otplib';
import qrcode from 'qrcode';
import { config } from '../../../config/config';
import { User } from '../../../models/User';
import { UserException } from '../../../exceptions/user.exception';
import { AuthException } from '../../../exceptions/auth.exception';

export class TwoFaTOPTStrategy implements TwoFaStrategy {
    activate = async (user: User) => {
        const secret = authenticator.generateSecret();
        const otpauth = authenticator.keyuri(user.email, config.serviceName, secret);
        const qrCodeUrl = await qrcode.toDataURL(otpauth);

        await user.update({
            twoFactorType: 'totp',
            twoFactorSecret: secret,
        });

        return {
            qrcode: qrCodeUrl,
        };
    };

    confirmActivation = async (user: User, code: string) => {
        const secret = user.twoFactorSecret;
        if (!secret) {
            throw new UserException('USER_NOT_FOUND');
        }

        const isValid = authenticator.check(code, secret);
        if (!isValid) {
            throw new AuthException('INVALID_2FA_CODE');
        }

        await user.update({
            isTwoFactorEnabled: true,
        });

        return true;
    };
}
