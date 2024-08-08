"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pgClient = void 0;
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let client;
const pgClient = () => {
    if (!client) {
        client = new pg_1.Pool({
            host: process.env.DB_HOST || "localhost",
            user: process.env.DB_USER || "postgres",
            password: process.env.DB_PASSWORD || "admin",
            database: process.env.DB_NAME || "books_test_eigen",
            port: parseInt(`${process.env.DB_PORT}`) || 5433,
        });
    }
    return client;
};
exports.pgClient = pgClient;
