import { z } from 'zod';

export class AuthValidator {
    static register() {
        const strongPasswordRegex =
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
        return z.object({
            name: z.string().min(3),
            email: z.string().email(),
            password: z.string().trim().regex(strongPasswordRegex),
        });
    }

    static login() {
        return z.object({
            email: z.string().email(),
            password: z.string(),
        });
    }

    static activate2FA() {
        return z.object({
            type: z.enum(['totp', 'email_otp']),
        });
    }
}
