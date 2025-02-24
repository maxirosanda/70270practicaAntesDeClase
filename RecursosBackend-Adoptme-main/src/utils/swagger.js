import { baseDir } from "./index.js";

export const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: "Documentación del poder y del saber",
            description: "API pensada para clase de Swagger"
        }
    },
    apis: [`${baseDir}/docs/**/*.yaml`]
};