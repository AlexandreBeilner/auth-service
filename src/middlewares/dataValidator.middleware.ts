import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';

type validateType = (req: Request, res: Response, next: NextFunction) => void;

export class DataValidatorMiddleware {
    static validateBody = (schema: ZodSchema, overwrite: boolean = true): validateType => {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                const parse = schema.parse(req.body);
                if (overwrite) {
                    req.body = parse;
                }
                return next();
            } catch (err: any) {
                return res.status(400).json({
                    message: 'Validation Error',
                    errors: err.errors,
                });
            }
        };
    };

    static validateParams = (schema: ZodSchema): validateType => {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                schema.parse(req.params);
                return next();
            } catch (err: any) {
                return res.status(400).json({
                    message: 'Validation Error',
                    errors: err.errors,
                });
            }
        };
    };

    static validateQuery = (schema: ZodSchema): validateType => {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                schema.parse(req.query);
                return next();
            } catch (err: any) {
                return res.status(400).json({
                    message: 'Validation Error',
                    errors: err.errors,
                });
            }
        };
    };
}
