import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

// Create a Redis instance
const redis = new Redis(process.env.UPSTASH_REDIS_URL);

const storeRefreshToken = async (userId, refreshToken) => {
  try {
    await redis.set(
      `refresh_token:${userId}`,
      refreshToken,
      "EX",
      7 * 24 * 60 * 60 // 7 days expiration
    );
    console.log("Refresh token stored successfully");
  } catch (error) {
    console.error("Error storing refresh token:", error);
  }
};

export default storeRefreshToken;
