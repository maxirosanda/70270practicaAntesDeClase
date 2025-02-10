import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { faker } from '@faker-js/faker';
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import dotenv from 'dotenv';
import errorHandler from './middlewares/errors.js'
import { addLogger, logger } from './utils/logger.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT||8080;

app.use(express.json());
app.use(cookieParser());
app.use(addLogger);
app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);

app.get('/mockingpets', (req, res) => {
    const pets = [];
    const speciesList = ['dog', 'cat', 'fish']; 

    for (let i = 0; i < 100; i++) {
        pets.push({
            name: faker.person.firstName(),
            species: faker.helpers.arrayElement(speciesList), 
            birthdate: faker.date.birthdate({ min: 1, max: 15, mode: 'age' }).toISOString().split('T')[0]
        });
    }

    res.send({ status: "success", payload: pets });
});

app.use(errorHandler)

mongoose.connect(process.env.MONGO_URL)

app.listen(PORT, () => logger.info(`Listening on ${PORT}`));
