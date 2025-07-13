import { Response } from 'express';
import { AbstractException } from '../exceptions/abstract.exception';
export class ErrorHandler {
    public static throw(error: any, res: Response) {
        if (error instanceof AbstractException) {
            res.status(error.statusCode).json({ message: error.message });
            return;
        }
        res.status(500).json({ message: 'Unexpected error' });
    }
}
