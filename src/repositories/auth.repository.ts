import {User} from "../models/User";
import {InferCreationAttributes} from "@sequelize/core";

type UserCreateInput = InferCreationAttributes<User>;

export class AuthRepository {
    async createUser(user: Omit<UserCreateInput, 'id'>) {
        return await User.create(user);
    }

    async getById(id: string) {
        return await User.findByPk(id);
    }

    async getByEmail(email: string) {
        return await User.findOne({where: {email}})
    }
}