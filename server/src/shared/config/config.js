//yha pr hum basically global level ka config likhenge.

import dotenv from 'dotenv';

dotenv.config();

const config = {
    //Server
    node_env: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT, 10) || 5000,

    //MongoDB
    mongo: {
        uri: process.env.MONGO_URI || 'mongodb://localhost:27017/api_monitoring',
        dbName: process.env.MONGO_DB_NAME || 'api_monitoring',
    },

    //PostgreSQL
    postgres: {
        host: process.env.PG_HOST || 'localhost',
        port: parseInt(process.env.PG_PORT, 10) || 5432,
        database: process.env.PG_DATABASE || 'api_monitoring',
        user: process.env.PG_USER || 'postgres',
        password: process.env.PG_PASSWORD || 'password',
    },

    //RabbitMQ
    rabbitmq: {
        url: process.env.RABBITMQ_URL || 'amqp://localhost',
        queue: process.env.RABBITMQ_QUEUE || 'api_hits',
        publisherConfirm: process.env.RABBITMQ_PUBLISHER_CONFIRM === 'true' || false, //MSG LOST
        retryAttempts: parseInt(process.env.RABBITMQ_RETRY_ATTEMPTS, 10) || 3,
        retryDelay: parseInt(process.env.RABBITMQ_RETRY_DELAY, 10) || 1000,
    },

    //JWT
    jwt: {
        secret: process.env.JWT_SECRET || '382c8cafda4d04dc9d480fd89a495ba20cc97aa8e4e4fbdd38dec22dbeae0231',
        expiresIn: process.env.JWT_EXPIRES_IN || '24h',
    },

    //Rate Limit
    rateLimit: {
        windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 15 * 60 * 1000, // 15 minutes
        maxRequests: parseInt(process.env.RATE_LIMIT_MAX, 10) || 1000, // limit each IP to 1000 requests per windowMs
    },
}

export default config;