import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from '@sequelize/core';
import { Attribute, PrimaryKey, Default } from '@sequelize/core/decorators-legacy';
import { v4 as uuidv4 } from 'uuid';

export class RefreshToken extends Model<
    InferAttributes<RefreshToken>,
    InferCreationAttributes<RefreshToken>
> {
    @Attribute(DataTypes.UUID)
    @PrimaryKey
    @Default(() => uuidv4())
    declare id: CreationOptional<number>;

    @Attribute(DataTypes.UUID)
    declare userId: string;

    @Attribute(DataTypes.STRING)
    declare token: string;

    @Attribute(DataTypes.DATE)
    declare expiresAt: Date;

    @Default(false)
    @Attribute(DataTypes.BOOLEAN)
    declare revoked: boolean;
}
