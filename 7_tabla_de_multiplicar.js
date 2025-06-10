// VAMOS A CREAR UN SCRIPT PARA GENERAR TABLAS DE MULTIPLICAR

//CASO 1:
// El usuario introducirá en el terminal un texto así:
// node 7_tabla_de_multiplicar.js NUMERO.   
// Por ejemplo: node 7_tabla_de_multiplicar.js 5
// El valor final es el del numero sobre el cual realizaremos la tabla de multiplicar (desde el 1 al 10)
// Esta tabla la guardaremos en un archivo llamado tabla_de_multiplicar_del_NUMERO.txt

//La salida será asi: 
//Tabla de multiplicar del 2
//==============================
// 1 x 5 = 5
// 2 x 5 = 10 ...


// Primero importamos el módulo fs (File System) de Node.js. Y la guardamos en una constante.
const fs = require('node:fs');

// Con process.argv[2] hallamos el tercer argumento (el índice 0 es la ruta de node, el 1 es la ruta del script).
const numero = process.argv[2];

// Creamos el título de la tabla con un formato visual usando una línea de separación.
let texto = "Tabla de multiplicar del " + numero + "\n";
texto += "=".repeat(texto.length -1) + "\n\n";

// Usamos el bucle for para generar la tabla de multiplicar del número proporcionado.
// Como siempre, primero se da un valor a i, luego se indica una condición y por ultimo se indica como incrementará i.
// for (let i = 1; i <= 10; i++) {

//     // Añadimos (concatenamos) las lineas que aparecerán por cada iteracion.
//     texto += `\t\t${i} x ${numero} = ${i * numero}\n`;
// }
// // Usamos fs.writeFileSync para escribir el nombre del archivo y su contenido de texto.
// // Tambien especificamos la codificación y manejamos el error si ocurre.
// fs.writeFileSync(`tabla_de_multiplicar_del_${numero}.txt`, texto, 'utf-8', (err) => { 
// if (err) {throw err};    
// }) 

// =========================================================================================

//CASO 2:
// Ahora vamos a modificar el código para que el usuario pueda especificar el rango de la tabla de multiplicar
// Las posiciones de los argumentos serán las siguientes:
// 2 - NUMERO PARA EL QUE SE QUIERE LA TABLA DE MULTIPLICAR
// 3 - NUMERO PARA EMPEZAR LA TABLA
// 4 - NUMERO PARA TERMINAR LA TABLA

// *** CODIGO COLOR ROJO = \x1b[31m
// *** CODIGO COLOR RESET = \x1b[0m

const comienzo = process.argv[3];
const fin = process.argv[4];

// Usamos un bucle for para generar la tabla de multiplicar del número proporcionado.
// El bucle comenzará desde el número indicado en 'comienzo' y terminará en el número indicado en 'fin'.
for (let i = comienzo; i <= fin; i++) {
    // Añadimos (concatenamos) las líneas que aparecerán por cada iteración.
    texto += `\t\t${i} x ${numero} = ${i * numero}\n`;
}

// Vamos a usar writeFileSync para escribir el nombre del archivo y su contenido de texto.
// También especificamos la codificación y manejamos los diferentes errores que puedan ocurrir si falta algun argumento o si el archivo no se puede escribir.
if (numero, comienzo, fin) {fs.writeFileSync(`tabla_de_multiplicar_del_${numero}.txt`, texto, 'utf-8' )
 console.log(`Tabla de multiplicar del ${numero} generada correctamente.`);
} else if (!numero || isNaN(numero)) {
    console.error("\x1b[31mError: \nDebes proporcionar un número para generar la tabla de multiplicar.");
} else if (!comienzo || isNaN(comienzo)) {
    console.error("\x1b[31mError: \nDebes proporcionar un número de inicio válido para la tabla.");
} else if (!fin || isNaN(fin)) {
    console.error("\x1b[31mError: \nDebes proporcionar un número de fin válido para la tabla.");
}


// OTRA OPCION PARA LOS ERRORES:
if (process.argv.length < 5) {
    console.error("\x1b[0mDebes proporcionar un número para generar la tabla de multiplicar, un número de inicio y un número de fin. \nEjemplo de uso: node 7_tabla_de_multiplicar.js 5 1 10");
}