import { program } from "commander"

program
    .option('--mode <mode>', 'Modo de trabajo', 'develoment')
program.parse()

export const options = program.opts()
