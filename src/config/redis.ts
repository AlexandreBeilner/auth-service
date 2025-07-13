import Redis from "ioredis";
import {config} from "./config";

export const redis = new Redis({
    host: config.redis.host,
    password: config.redis.password,
    port: Number(config.redis.port)
})