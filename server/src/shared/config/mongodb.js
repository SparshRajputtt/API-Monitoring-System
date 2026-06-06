import mongoose from "mongoose";
import config from "./config.js";
import logger from "./logger.js";


/**
 * MongoConnection Class
 * - Manages the MongoDB connection using Mongoose.
 * - Implements a singleton pattern to ensure only one connection instance is used throughout the application.
 * - Handles connection errors and implements automatic reconnection logic.
 */
class MongoConnection {
    constructor() {
        this.connection = null;
    }

    /**
     * Connect to MongoDB using Mongoose
     * - If already connected, returns the existing connection.
     * - On connection errors, logs the error and retries after a delay.
     * @returns {Promise<mongoose.Connection>} The MongoDB connection instance
     */
    async connect() {
        try {
            if (this.connection) {
                logger.info("Already connected to MongoDB");
                return this.connection;
            }
            this.connection = await mongoose.connect(config.mongo.uri, {
                dbName: config.mongo.dbName,
            });
            logger.info(`Connected to MongoDB: ${config.mongo.dbName}`);

            this.connection.on("error", (err) => {
                logger.error("MongoDB connection error:", err);
            });

            this.connection.on("disconnected", () => {
                logger.warn("MongoDB connection lost. Attempting to reconnect...");
                this.connection = null;
                setTimeout(() => this.connect(), 5000); // Retry after 5 seconds
            });

            return this.connection;

        } catch (error) {
            logger.error("Failed to connect to MongoDB:", error);
            throw error;
        }
    }

    /**
     * This helps to Disconnect from MongoDB
     * - If not connected, does nothing.
     * - On disconnection errors, logs the error.
     */
    async disconnect() {
        try {
            if (this.connection) {
                await mongoose.disconnect();
                logger.info("Disconnected from MongoDB");
                this.connection = null;
            }
        } catch (error) {
            logger.error("Failed to disconnect from MongoDB:", error);
            throw error;
        }
    }

    /**
     * Get the MongoDB connection instance
     * - Throws an error if not connected.
     * @returns {mongoose.Connection} The MongoDB connection instance
     */
    getConnection() {
        if (!this.connection) {
            throw new Error("MongoDB connection not established. Call connect() first.");
        }
        return this.connection;
    }
}

export default MongoConnection;