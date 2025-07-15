import dotenv from 'dotenv';

dotenv.config();

interface Config {
    port: number;
    nodeEnv: string;
    serviceName: string;
    database: {
        db: string;
        user: string;
        password: string;
        host: string;
        port: string;
    };
    redis: {
        host: string;
        port: string;
        password: string;
    };
    jwt: {
        access: string;
        refresh: string;
        accessExpiresIn: number;
        refreshExpiresIn: number;
    };
    smtp: {
        user: string;
        pass: string;
    };
}

const config: Config = {
    port: Number(process.env.PORT) || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    serviceName: process.env.SERVICE_NAME || 'XDB',
    database: {
        db: process.env.DB_NAME as string,
        user: process.env.DB_USER as string,
        password: process.env.DB_PASSWORD as string,
        host: process.env.DB_HOST as string,
        port: process.env.DB_PORT as string,
    },
    redis: {
        host: process.env.REDIS_HOST as string,
        port: process.env.REDIS_PORT as string,
        password: process.env.REDIS_PASSWORD as string,
    },
    jwt: {
        access: process.env.ACCESS_TOKEN_SECRET as string,
        refresh: process.env.REFRESH_TOKEN_SECRET as string,
        accessExpiresIn: 60 * 15, // 15 minutes,
        refreshExpiresIn: 60 * 60 * 24 * 7, // 7 days,
    },
    smtp: {
        user: process.env.SMTP_USER as string,
        pass: process.env.SMTP_PASS as string,
    },
};

export { config };
