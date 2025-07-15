import { AbstractException } from './abstract.exception';
import { UserMessage } from '../messages/user.message';

export class UserException extends AbstractException {
    private static readonly exceptions = {
        USER_NOT_FOUND: {
            message: UserMessage.USER_NOT_FOUND,
            statusCode: 404,
        },
    };
    constructor(errorCode: keyof typeof UserException.exceptions) {
        const { message, statusCode } = UserException.exceptions[errorCode];
        super(message, statusCode);
    }
}
