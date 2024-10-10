import { Redis } from "@upstash/redis";



const redis = new Redis({
  url: "https://superb-calf-28847.upstash.io",
  token: process.env.REDIS_TOKEN,
});

export async function rateLimit(ip: string): Promise<boolean> {
  const key = `rate_limit:${ip}`;
  const limit = 100; // 100 requests
  const window = 60 * 60; // 1 hour in seconds

  try {
    const requests = await redis.incr(key);
    if (requests === 1) {
      await redis.expire(key, window);
    }

    return requests > limit;
  } catch (error) {
    console.error("Redis operation failed:", error);
    // In case of Redis failure, allow the request to proceed
    return false;
  }
}
