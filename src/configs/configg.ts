import {Pool} from "pg";
import dotenv from "dotenv";

dotenv.config();

let client: Pool;

export const pgClient = (): Pool => {
  if (!client) {
    client = new Pool({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "postgres",
      password: process.env.DB_PASSWORD || "admin",
      database: process.env.DB_NAME || "books_test_eigen",
      port: parseInt(`${process.env.DB_PORT}`) || 5433,
    });
  }
  return client;
};
