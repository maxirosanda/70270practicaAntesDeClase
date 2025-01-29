/*console.log(process.cwd())
console.log(process.pid)
console.log(process.version)
console.log(process.platform)
console.log(process.arch)
console.log(process.argv)
console.log(process.memoryUsage())
*/
// En todos los ejemplos retiramos los dos argumentos por default

// Si ejecutamos "node process.js 1 2 3"
//console.log(process.argv.slice(2)); // Imprimirá [1, 2, 3]

// Si ejecutamos "node process.js a 2 -a"
//console.log(process.argv.slice(2)); // Imprimirá ['a', '2', '-a']

// Si ejecutamos "node process.js"
//console.log(process.argv.slice(2)); // Imprimirá []

// Si ejecutamos "node process.js --mode development"
//console.log(process.argv.slice(2)); // Imprimirá ['--mode', 'development']

import { Command } from 'commander';

const program = new Command(); // Inicializamos un nuevo comando de commander

program
  .option('-d', 'Variable para debug', false) // primero: El comando, segundo: descripción, tercero: valor default
  .option('-p <port>', 'Puerto del servidor', 8080) // <port> es el argumento a colocar
  .option('--mode <mode>', 'Modo de trabajo', 'production') // <mode> es el argumento a colocar
  .requiredOption('-u <user>', 'Usuario utilizando el aplicativo', 'No se ha declarado un usuario') 
  // para requiredOption, el tercer argumento es un mensaje de error en caso de que no se especifique
  .option('-l, --letters [letters...]', 'specify letters'); // Permite múltiples valores opcionales

program.allowExcessArguments()
program.parse(); // parse se utiliza para cerrar la configuración de comandos

console.log('Options: ', program.opts());
console.log('Remaining arguments: ', program.args);

//node process.js -d -p 3000 --mode development -u root --letters a b c
//node process.js -p 3000 -u root --letters a b c -- 2 a 5