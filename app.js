var express = require('express');
const logger = require('morgan');
const RedisClient = require('ioredis');

var app = express();

const initRedis = () => {
    const redis = new RedisClient({
        sentinels: [{host: process.env.SENTINEL_HOST, port: process.env.SENTINEL_PORT}],
        sentinelPassword: process.env.SENTINEL_PASS,
        name: process.env.SENTINEL_NAME,
        // если ты хочешь подключится к одиночному хосту, то убери коммент ниже, и удали то, что выше
        // host: process.env.SENTINEL_HOST, port:  process.env.SENTINEL_PORT,
    });

    redis.on('error', async (e) => {
      console.error(e);
    });

    return redis;
}

const redis = initRedis()
console.log("redis was created")
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
    const data = await redis.get(req.query.name);
    res.json({ data })
});

app.post('/', async (req, res) => {
    const data = await redis.set(req.body.key, req.body.value);
    res.json({data})
})

module.exports = app;
