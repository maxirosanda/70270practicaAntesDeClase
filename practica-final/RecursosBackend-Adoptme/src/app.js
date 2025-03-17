import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import dotenv from 'dotenv';
import { logger, addLogger } from './utils/logger.js';
import { swaggerOptions } from './utils/swagger.js';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

dotenv.config();
const app = express();
const PORT = process.env.PORT||8080;
const connection = mongoose.connect(process.env.MONGODB_URI)

app.use(express.json());
app.use(cookieParser());

app.use(addLogger)
const specs = swaggerJsdoc(swaggerOptions)
app.use("/docs",swaggerUi.serve,swaggerUi.setup(specs))

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);

app.listen(PORT,()=>logger.info(`Listening on ${PORT}`))
