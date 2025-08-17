import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.js';
import uploadRoutes from './routes/uploadRoute.js';
import fileRoutes from './routes/fileRoute.js';
import scanRoutes from './routes/scan.js'
import downloadRoute from './routes/downloadFile.js';
import delRoute from './routes/deleteFile.js';
import revRoute from './routes/reverseStatus.js';
import aiRoutes from './routes/ai.js';
import healthRoute from './routes/health.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({origin: process.env.FRONTEND_URL, credentials: true}));
app.use(cookieParser());
app.use('/', authRoutes);
app.use('/', uploadRoutes);
app.use('/', fileRoutes);
app.use('/', scanRoutes);
app.use('/', downloadRoute);
app.use('/', delRoute);
app.use('/', revRoute);
app.use('/', aiRoutes);
app.use('/', healthRoute);
connectDB();


app.listen(process.env.PORT, 
    () => console.log(`server running @ http://localhost:${process.env.PORT || "4000"}`)
);