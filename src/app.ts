import express, {Request, Response } from "express";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import morgan from 'morgan';

import { config } from '@/config/app.config';
import { errorHandler } from '@/shared/middlewares/errorHandler.middleware';
import { asyncHandler } from "@/shared/middlewares/asyncHandler.middleware";
import authRoutes from "@/modules/auth/auth.route";
import userRoutes from "@/modules/users/user.route";
import { authMiddleware } from "@/shared/middlewares/auth.middleware";


const app = express();
const BASE_API = config.BASE_API;
app.use(helmet());
if(config.NODE_ENV === 'development') {
   app.use(morgan('dev')); 
}
// const allowedOrigins = [
//   "http://localhost:5173",
//   "http://127.0.0.1:5173"
// ];

// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true,
//   exposedHeaders: ["set-cookie"] // 🔥 IMPORTANT
// }));
app.use(cors({
  origin: (origin, callback) => callback(null, origin), // accepte tout, reflète l'origine reçue
  credentials: true,
  exposedHeaders: ["set-cookie"]
}));
app.use(express.json());
app.use(cookieParser()); 


app.get('/', asyncHandler(
    async (_req: Request, res: Response) => {
       
      return res.status(200).json({
        message: 'App is perfect running!'
      })
    }
));

app.use(`${BASE_API}/auth`, authRoutes);
app.use(`${BASE_API}/users`,authMiddleware, userRoutes);

app.use(errorHandler);

export default app;