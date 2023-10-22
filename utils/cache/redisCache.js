import logger from "../../config/logger.js";
import { redisClient } from "../../config/redis.js";

export const getCacheData = async (key) => {
  try {
    const data = await redisClient.get(key);
    logger.info(`캐시 데이터를 불러오는데 성공했습니다!`);
    return JSON.parse(data);
  } catch (err) {
    logger.error(`캐시 데이터를 가저오는 중 오류 발생: ${err.message}`);
    return null;
  }
};

export const setCacheData = async (key, data, ttl) => {
  try {
    await redisClient.set(key, JSON.stringify(data), "EX", ttl);
    logger.info(`캐시에 저장하는데 성공했습니다!`);
  } catch (err) {
    logger.error(`캐시 데이터를 저장하는 중 오류 발생: ${err.message}`);
  }
};
