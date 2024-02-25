const Express = require('express');
const BodyParser = require('body-parser');
const App = Express();
const Path = require('path');
require('dotenv').config({ path: Path.join(__dirname, '../config/.env')});
const Logger = require('./server/helpers/Logger');
const Cors = require('./server/middlewares/Cors');
const TransactionId = require('./server/middlewares/TransactionId');
const { connectMongoDb, config: mongoConfig } = require('./server/services/MongoDbService');
const { connectRedis, config: redisConfig } = require('./server/services/RedisService');

const AuthRoute = require('./server/routes/AuthRoute');
const UserRoute = require('./server/routes/UserRoute');

const PORT = process.env.PORT || 8080;
const API_PATH = process.env.API_PATH || '';
const BASE_PATH = API_PATH ? `/${API_PATH}`: '';
const BASE_URL = `localhost:${PORT}${BASE_PATH}`;

const server = App.listen(PORT, async () => {
    try {
        await connectMongoDb();
        await connectRedis();
        Logger.info(`App Base Url: ${BASE_URL}`);
        Logger.info(`Communicating to DB: ${mongoConfig.url}`);
        Logger.info(`Communicating to Redis: ${redisConfig.url}`);
    } catch (err) {
        Logger.error(err);
    }
});

App.use(TransactionId);

App.use(Cors);

App.use(Express.json());

App.use(BodyParser.urlencoded({ limit: '50mb', extended: true }));
App.use(BodyParser.json({limit: '50mb'}));

App.use(`${BASE_PATH}/auth`, AuthRoute);
App.use(`${BASE_PATH}/user`, UserRoute);

App.use((req, res) => {
    res.status(404).send({ error: 'Not Found' });
});

const stopServer = () => {
    server.close((err) => {
        Logger.info('server: Exit', { err });
    });
};

process.on('exit', () => {
    stopServer();
});

process.on('SIGINT', () => {
    stopServer();
});

process.on('uncaughtException', err => {
    if (err) Logger.error(err);
    Logger.info('uncaughtException: Exit');
    stopServer();
    process.exit(99);
});