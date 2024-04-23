const redis = require('redis');
require('dotenv').config();

const client = redis.createClient({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
});

client.on('connect', () => {
  console.log('Connected to Redis');
});

client.on('ready', () => {
  console.log('Redis client is ready to use');
});

client.on('error', (err) => {
  console.error('Redis client error:', err);
});

client.on('end', () => {
  console.error('Redis client connection closed');
});

process.on('SIGINT', () => {
  console.log('Received SIGINT. Closing Redis connection...');
  client.quit(() => {
    console.log('Redis connection closed');
    process.exit(0);
  });
});

// Add a test command to ensure client is functional
// const setAsync = promisify(client.set).bind(client);

// (async () => {
//     try {
//         const reply = await setAsync('22', '11');
//         console.log('Set operation result:', reply);
//     } catch (err) {
//         console.error('Error setting value in Redis:', err);
//     }
// })();

module.exports = client;
