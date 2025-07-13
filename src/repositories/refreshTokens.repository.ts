import { InferCreationAttributes } from '@sequelize/core';
import { RefreshToken } from '../models/RefreshToken';

type RefreshTokenData = InferCreationAttributes<RefreshToken>;

export class RefreshTokensRepository {
    async create(data: Omit<RefreshTokenData, 'id'>) {
        return await RefreshToken.create(data);
    }

    async getByToken(token: string) {
        return await RefreshToken.findOne({
            where: { token: token },
        });
    }
}
