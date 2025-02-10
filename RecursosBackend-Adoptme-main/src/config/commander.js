import { program } from "commander"

program
    .option("--logger <logger>","","DEVELOPMENT")
program.parse()

export const options = program.opts()