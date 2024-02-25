const redis = require('redis');

const config = {
  url: process.env.REDIS_URL,
  standardTTL: process.env.REDIS_STANDARD_TTL,
};

let client = redis.createClient({
  url: config.url
});

const connectRedis = async () => {
  client = await client.connect();
};

const getData = async (key) => {
  const data = await client.get(key);
  return JSON.parse(data);
};

const setData = (key, value, timeout) => {
  return client.set(key, JSON.stringify(value), {
    EX: timeout || config.standardTTL
  });
};

const deleteData = (key) => {
  return client.del(key);
};

module.exports = {
  config,
  connectRedis,
  getData,
  setData,
  deleteData
};