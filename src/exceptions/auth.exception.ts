import { AbstractException } from './abstract.exception';
import { AuthMessage } from '../messages/auth.message';

export class AuthException extends AbstractException {
    private static readonly exceptions = {
        USED_EMAIL: {
            message: AuthMessage.USED_EMAIL,
            statusCode: 409,
        },
        INVALID_CREDENTIAL_ARGUMENTS: {
            message: AuthMessage.INVALID_CREDENTIAL_ARGUMENTS,
            statusCode: 401,
        },
        INVALID_REFRESH_TOKEN: {
            message: AuthMessage.INVALID_REFRESH_TOKEN,
            statusCode: 401,
        },
        INVALID_ACCESS_TOKEN: {
            message: AuthMessage.INVALID_ACCESS_TOKEN,
            statusCode: 401,
        },
    };
    constructor(errorCode: keyof typeof AuthException.exceptions) {
        const { message, statusCode } = AuthException.exceptions[errorCode];
        super(message, statusCode);
    }
}
