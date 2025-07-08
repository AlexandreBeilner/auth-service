import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from '@sequelize/core';
import {Attribute, PrimaryKey, Default} from '@sequelize/core/decorators-legacy';
import { v4 as uuidv4 } from 'uuid';

export class OAuthAccount extends Model<InferAttributes<OAuthAccount>, InferCreationAttributes<OAuthAccount>> {
    @Attribute(DataTypes.UUID)
    @PrimaryKey
    @Default(() => uuidv4())
    declare id: CreationOptional<number>;

    @Attribute(DataTypes.UUID)
    declare userId: string;

    @Attribute(DataTypes.STRING)
    declare provider: string;

    @Attribute(DataTypes.STRING)
    declare providerUserId: string;

    @Attribute(DataTypes.STRING)
    declare accessToken: string;
}