import { Response, Request } from 'express';
export class Cookie {
    static set(res: Response, key: string, value: any) {
        res.cookie(key, value, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            path: '/',
        });
    }

    static get(req: Request, key: string) {
        return req.cookies[key] ?? null;
    }

    static del(res: Response, key: string) {
        res.clearCookie(key, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            path: '/',
        });
    }
}
