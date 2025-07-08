import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional, NonAttribute,
} from '@sequelize/core';
import {Attribute, PrimaryKey, NotNull, Default, Unique, HasMany, HasOne} from '@sequelize/core/decorators-legacy';
import { v4 as uuidv4 } from 'uuid';
import {OAuthAccount} from "./OAuthAccount";
import {RefreshToken} from "./RefreshToken";

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    @Attribute(DataTypes.UUID)
    @PrimaryKey
    @Default(() => uuidv4())
    declare id: CreationOptional<number>;

    @Attribute(DataTypes.STRING)
    @NotNull
    @Unique
    declare email: string;

    @NotNull
    @Attribute(DataTypes.STRING)
    declare passwordHash: string;

    @Default(false)
    @Attribute(DataTypes.BOOLEAN)
    declare isEmailVerified: boolean;

    @Default(false)
    @Attribute(DataTypes.BOOLEAN)
    declare is2FAEnabled: boolean;

    @Attribute(DataTypes.STRING)
    declare twoFASecret: string;

    @HasMany(() => OAuthAccount, 'userId')
    declare users?: NonAttribute<OAuthAccount[]>;

    @HasOne(() => RefreshToken, 'userId')
    declare userTokens?: NonAttribute<RefreshToken[]>;
}