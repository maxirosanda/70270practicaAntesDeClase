import dotenv from 'dotenv'
import { options } from './commander.js'
console.log(options.mode)
dotenv.config({
    path: options.mode === "production" ? '.env' : '.env.dev'
})

export const config = {
    port:process.env.PORT
}

