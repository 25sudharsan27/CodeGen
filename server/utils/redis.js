// config/redisClient.js
const redis = require("redis");

const redisClient = redis.createClient({
  url: "redis://default:aRXEmViVGFOc6o2YqOqtNIlPmkj8G4JC@redis-17867.c16.us-east-1-3.ec2.redns.redis-cloud.com:17867",
  legacyMode: true, // Optional: for callback support
});

redisClient.connect().catch(console.error);

redisClient.on("connect", () => {
  console.log("✅ Connected to Redis Cloud");
});

redisClient.on("error", (err) => {
  console.error("❌ Redis Error:", err);
});
// Promisify after connecting
const { promisify } = require("util");
const getAsync = promisify(redisClient.get).bind(redisClient);

module.exports = redisClient;
