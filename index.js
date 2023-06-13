const db_config = require('./src/configs/env-config');
const app = require('./src/app');
const connectDB = require('./src/configs/db-connect');
// const logger = require('./config/logger');

let server;
connectDB().then(() => {
    console.log('Connected to MongoDB');
    server = app.listen(db_config.port, () => {
        console.log('db_config.port', db_config.port)
        // logger.info(`Listening to port ${config.port}`);
    });
}).catch(e => {
    console.log(e)
})

const exitHandler = () => {
    if (server) {
        server.close(() => {
            //   logger.info('Server closed');
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error) => {
    //   logger.error(error);
    exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
    //   logger.info('SIGTERM received');
    if (server) {
        server.close();
    }
});
