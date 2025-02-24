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
import cluster from 'cluster';
import { cpus } from 'os';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { swaggerOptions } from './utils/swagger.js';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT||8080;


const specs = swaggerJsdoc(swaggerOptions);
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(addLogger);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);


app.get('/operacionsencilla', (req, res) => {
    let sum = 0;
    for (let i = 0; i < 10000; i++) {
        sum += i;
    }
    res.send({ status: "success", message: `El worker ${process.pid} ha atendido esta petición, el resultado es ${sum}` });
});

app.get('/operacioncompleja', (req, res) => {
    let sum = 0;
    for (let i = 0; i < 5e8; i++) {
        sum += i;
    }
    res.send({ status: "success", message: `El worker ${process.pid} ha atendido esta petición, el resultado es ${sum}` });
});

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

const cpusCount = cpus().length;

if(cluster.isPrimary){

    console.log(`Primary ${process.pid} is running`);

    for(let i=0; i<cpusCount; i++){
        cluster.fork();
    }

    cluster.on('exit', (worker) => {
        console.log(`Worker ${worker.process.pid} died. Forking a new worker...`);
        cluster.fork();
    });

}else{

    console.log(`Worker ${process.pid} started`);
    app.listen(8080, () => {
        logger.info(`Server running on port ${8080}`);
    });
}
