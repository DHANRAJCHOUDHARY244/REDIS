const redis = require("redis");

const redisClient = redis.createClient();


(async () => { 
    await redisClient.connect();
})();

redisClient.on("ready", () => {
    console.log("Redis Connected Successfully!");
});

redisClient.on("error", (err) => {
    console.log("Error in the Redis Connection");
});

module.exports = {
    redisClient,
};
