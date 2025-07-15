import { User } from '../../models/User';

export interface TwoFaStrategy {
    activate: (user: User) => Promise<any>;
    confirmActivation: (user: User, code: string) => Promise<boolean>;
}
