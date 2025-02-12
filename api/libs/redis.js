import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

// using redis to store the refresh token
export const redis = new Redis(process.env.UPSTASH_REDIS_URL);
