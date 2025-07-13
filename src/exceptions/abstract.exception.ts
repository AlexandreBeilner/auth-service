export abstract class AbstractException extends Error {
    public statusCode: number;

    protected constructor(message: string = 'Unknown error', statusCode = 500) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}
