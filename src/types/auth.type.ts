import { z } from 'zod';
import { AuthValidator } from '../validators/auth.validator';

export type registerData = z.infer<ReturnType<typeof AuthValidator.register>>;
export type loginData = z.infer<ReturnType<typeof AuthValidator.login>> & {key?: string};
