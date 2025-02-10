import winston from 'winston';
import { options } from '../config/commander.js';


const customLevelsOptions = {
    levels: {
      fatal: 0,
      error:1,
      warn: 2,
      info: 3,
      http: 4,
      debug:5
    },
    colors: {
      fatal: 'red',
      error:"magenta",
      warn: 'yellow',
      info: 'blue',
      http: 'green',
      debug: 'white'
    }
  };
  

const prodLogger = winston.createLogger({
    levels: customLevelsOptions.levels,
    transports: [
        new winston.transports.Console({ 
            level: "http",
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelsOptions.colors }),
                winston.format.simple()
            )

        }),
        new winston.transports.File({ 
            filename: 'app.log', 
            level: 'warn'
        })
    ]
});

const devLogger = winston.createLogger({
    levels: customLevelsOptions.levels,
    transports: [
        new winston.transports.Console({ 
            level: "debug",
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelsOptions.colors }),
                winston.format.simple()
            )

        })
    ]
});

export const logger = options.logger === 'PRODUCTION' ? prodLogger : devLogger;

export const addLogger = (req, res, next) => {
    req.logger = options.logger === 'PRODUCTION' ? prodLogger : devLogger
    req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`);
    next();
};
