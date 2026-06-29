import { getEnv } from "@/config/env.config";
import { SignOptions } from "jsonwebtoken";

export const config = {
  NODE_ENV: getEnv("NODE_ENV"),
  PORT: getEnv("PORT"),
  FRONTEND_ORIGIN: getEnv("FRONTEND_ORIGIN"),
  BACKEND_ORIGIN: getEnv("BACKEND_ORIGIN"),
  BASE_API: getEnv("BASE_API", '/api/v1'),
  MONGODB_URI: getEnv("MONGODB_URI"),
  JWT: {
    SECRET: getEnv("JWT_SECRET"),
    EXPIRES_IN: getEnv("JWT_EXPIRES_IN") as SignOptions["expiresIn"],
    REFRESH_SECRET: getEnv("JWT_REFRESH_SECRET"),
    REFRESH_EXPIRES_IN: getEnv("JWT_REFRESH_EXPIRES_IN") as SignOptions["expiresIn"], 
  },
  MAILER_SENDER: getEnv("MAILER_SENDER"),
  RESEND_API_KEY: getEnv("RESEND_API_KEY"),
  MAIL_USER: getEnv("MAIL_USER"),
  MAIL_PASSWORD: getEnv("MAIL_PASSWORD"),
};