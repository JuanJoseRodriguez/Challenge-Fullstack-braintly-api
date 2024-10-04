import dotenv from "dotenv";

dotenv.config();

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  HOST: process.env.HOST || "localhost",
  PORT: process.env.PORT || "8000",
  CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:3000",
  DB_CONNECT: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@braintlydb.wbdqj.mongodb.net/?retryWrites=true&w=majority&appName=braintlyDB`,
};
