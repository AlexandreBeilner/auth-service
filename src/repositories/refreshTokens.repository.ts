import {InferCreationAttributes} from "@sequelize/core";
import {RefreshToken} from "../models/RefreshToken";

type CreateRefreshToken = InferCreationAttributes<RefreshToken>;

export class RefreshTokensRepository {
    async create(data: Omit<CreateRefreshToken, 'id'>) {
        return await RefreshToken.create(data)
    }

    async getByToken(token: string) {
        return RefreshToken.findOne({
            where: {token: token}
        })
    }
}