/*process.on('exit', code => {
    console.log(`Este código se ejecutará justo antes de salir del proceso`);
    console.log(`El proceso está saliendo con el código: ${code}`);
  })

  process.on('uncaughtException', exception => {
    console.log(`Este código atrapa todas las excepciones no controladas`);
    console.error(`Excepción atrapada: ${exception.message}`);
    process.exit(1);
  })
console()*/

// Función principal
function listNumbers(...numbers) {
    const types = numbers.map(arg => typeof arg); // Mapea los tipos de cada argumento
  
    // Verificar si todos los elementos son numéricos
    const isValid = numbers.every(arg => typeof arg === "number");
  
    if (!isValid) {
      console.error("Invalid parameters", types); // Mostrar tipos de los parámetros
      process.exit(-4); // Escapar del proceso con código -4
    }
  
    console.log("Todos los parámetros son válidos:", numbers); // Si son válidos, mostrarlos
  }
  
  // Listener para el evento de salida
  process.on('exit', code => {
    if (code === -4) {
      console.log("Proceso finalizado por argumentación inválida en una función");
    } else {
      console.log(`El proceso finalizó con el código: ${code}`);
    }
  });
  
  // Ejemplo de uso
  listNumbers(1, 2, "a", true); // Generará error
  // listNumbers(1, 2, 3); // Este sería un caso válido

