/*const suma = (num1, num2) => {
    if (!num1 || !num2) return 0
    if (typeof num1 !== "number" || typeof num2 !== "number") return null
    const result =  num1 + num2
    return result
}
*/
/*
const suma = (...nums) => {

    if (nums.length === 0) return 0
    let validInput = true
    for (let i = 0; i < nums.length && validInput; i++) {
      if (typeof nums[i] !== "number") {
        validInput = false
      }
    }

    if (!validInput) return null

    let result = 0
    for (let i = 0; i < nums.length; i++) {
      result += nums[i]
    }
    return result

  }
  */

const suma = (...nums) => {

  if (nums.length === 0) return 0
  if (!nums.every(num => typeof num === "number")) return null
  return nums.reduce((acc, num) => acc + num)

}



let testsPasados = 0
let testsTotales = 4

console.log("Test 1: La función debe devolver null si algún parámetro no es numérico");
const resultTest1 = suma("2", 2);

if (resultTest1 === null) {
    console.log("Test 1 pasado")
    testsPasados++
} else {
    console.log(`Test 1 no pasado, se recibió ${typeof resultTest1}, pero se esperaba null`)
}

console.log("Test 2: La función debe devolver 0 si no se pasó ningún parámetro")

const resultTest2 = suma()

if (resultTest2 === 0) {
    console.log("Test 2 pasado")
    testsPasados++
} else {
    console.log(`Test 2 no pasado, se recibió ${resultTest2}, pero se esperaba 0`)
}

console.log("Test 3: La función debe resolver la suma correctamente.");

const resultTest3 = suma(2, 3)

if (resultTest3 === 5) {
    console.log("Test 3 pasado");
    testsPasados++
} else {
    console.log(`Test 3 no pasado, se recibió ${resultTest3}, pero se esperaba 5`)
}

console.log("La función debe poder hacer la suma con cualquier cantidad de números")

const resultTest4 = suma(1, 2, 3, 4, 5)

if (resultTest4 === 15) {
    console.log("Test 4 pasado")
    testsPasados++
} else {
    console.log(`Test 4 no pasado, se recibió ${resultTest4}, pero se esperaba 15`)
}

if (testsPasados === testsTotales) {
    console.log("Todos los tests se han pasado con éxito");
} else {
    console.log(`Se pasaron ${testsPasados} tests de un total de ${testsTotales}`);
}
