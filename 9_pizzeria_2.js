// VAMOS A MOSTRAR EL MENU DE INGREDIENTES, PERO VAMOS A ESPECIFICAR:
// - 1 > ELEGIR UN TIPO DE MASA (normal, espelta)
// - 2 > ELEGIR HASTA 4 INGREDIENTES EXTRA (tomate, champiñones, mozzarella, pepperoni, aceitunas, gorgonzola, provolone, anchoa)
// Ejemplo de entrada por terminal: node 9_pizzeria_2.js 1 3 4 5 6
// CUANDO SE ELIJAN TODOS LOS INGREDIENTES LA SALIDA DEBE SER:
// Has elegido pizza de masa normal con los siguientes ingredientes
// Precio total: X
//========================================================================================================================================//

// Vamos a importar el array de ingredientes desde el archivo ingredientes.js
const ingredientes = require('./ingredientes.js')

// Preparamos un texto para adornar la salida por consola
let menu = "\n\x1b[1;35mMenu de ingredientes\n"
menu += "-".repeat(menu.length - 9) + "\n\x1b[0m"

// Si no hay argumentos, mostramos el menu y terminamos la ejecución
if (process.argv.length < 3) {
    console.log(menu);
    ingredientes.forEach((ingrediente, index) => {
    const color = index < 2 ? '\x1b[33m' : '\x1b[32m';
    console.log(`${color}${index + 1}. ${ingrediente.ingrediente}\x1b[0m \n\t- ${ingrediente.precio.toFixed(1)}€`)
    })
    console.log("\nPor favor, indica los numeros para la \x1b[1;33mmasa\x1b[0m (\x1b[33m1\x1b[0m o \x1b[33m2\x1b[0m) y hasta 4 \x1b[1;32mingredientes extra\x1b[0m (\x1b[32m3\x1b[0m - \x1b[32m10\x1b[0m) separados por espacios.")
    console.log("\x1b[36mEjemplo: \x1b[1m\x1b[34mnode 9_pizzeria_2.js 1 3 4 5 6\x1b[0m")
    console.log("\x1b[34mLa pizza elegida sería de masa normal con: tomate, champiñones, mozzarella, pepperoni\x1b[0m")
    process.exit()
}

// Vamos a almacenar el indice 2 del argumento, donde debe ir el numero de la masa (1 o 2 - que son los indices 0 o 1 en el array ingredientes).
const masaIndex = process.argv[2] - 1

// Si no es el indice 0 o 1 del array , mostramos un mensaje de error y terminamos la ejecución.
if (masaIndex > 1 || masaIndex < 0 || isNaN(masaIndex)) {
    console.log('\x1b[31mError: El primer numero debe corresponder a una masa (números 1 o 2)\x1b[0m')
    process.exit()
}

// Validamos con un bucle for que los ingredientes extra sean válidos (índices 2 a 9), si no, mostramos mensaje de error y terminamos.
for (let i = 3; i < process.argv.length; i++) {
    const ingredienteIndex = process.argv[i] - 1;
    if (ingredienteIndex < 2 || ingredienteIndex >= ingredientes.length || isNaN(ingredienteIndex)) {
        console.log(`\x1b[31mError: ${process.argv[i]} no es un ingrediente extra válido (números del 3 al 10)\x1b[0m`)
        process.exit()
        // Si se piden más de 4 ingredientes extra, mostraremos mensaje de error.
    } else if (i > 6) {
        console.log('\x1b[31mError: Solo puedes elegir hasta 4 ingredientes extra (del 3 al 10)\x1b[0m')
        process.exit()
    }
}

// Mensaje final para mostrar la selección al usuario y calcular precio
// Primero empezamos a calcular el precio total partiendo del precio de la  masa elegida
let precioTotal = ingredientes[masaIndex].precio

console.log(`\nHas elegido pizza de masa \x1b[32m${ingredientes[masaIndex].ingrediente}\x1b[0m`)
console.log("con los siguientes ingredientes:")

// Bucle for para que si todo es correcto, se muestren los ingredientes seleccionados y se sumen a precioTotal
for (let i = 3; i < process.argv.length; i++) {
    // Obtenemos el indice del ingrediente seleccionado por el usuario, restandole 1 porque los argumentos empiezan en 0.
    let ingrediente = ingredientes[process.argv[i] - 1]
    console.log(`\x1b[32m- ${ingrediente.ingrediente}\x1b[0m`)
    precioTotal += ingrediente.precio
}

// Finalmente mostramos el precio total de la pizza elegida.
console.log(`\nPrecio total:\x1b[32m ${precioTotal}€\x1b[0m`)

