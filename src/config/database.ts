import { Sequelize } from '@sequelize/core';
import { PostgresDialect } from '@sequelize/postgres';
import { User } from '../models/User';
import { OAuthAccount } from '../models/OAuthAccount';
import { RefreshToken } from '../models/RefreshToken';
import { config } from './config';

const db = new Sequelize({
    dialect: PostgresDialect,
    database: config.database.db,
    user: config.database.user,
    password: config.database.password,
    host: config.database.host,
    port: Number(config.database.port),
    ssl: config.nodeEnv !== 'development',
    clientMinMessages: 'notice',
    models: [User, OAuthAccount, RefreshToken],
    define: {
        underscored: true,
    },
});

const connect = async () => {
    await db.authenticate();

    await db.sync({
        alter: true,
    });
};

export const database = {
    db,
    connect,
};
