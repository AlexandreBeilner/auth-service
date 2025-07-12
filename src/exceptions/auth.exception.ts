import {AbstractException} from "./abstract.exception";

export class AuthException extends AbstractException {
    private static readonly exceptions = {
        USED_EMAIL: {
            message:
                'E-mail já está em uso.',
            statusCode: 409,
        },
    };
    constructor(errorCode: keyof typeof AuthException.exceptions) {
        const { message, statusCode } = AuthException.exceptions[errorCode];
        super(message, statusCode);
    }
}