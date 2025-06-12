
// CREAMOS UNA COSNTANTE QUE MUDAREMOS AL ARCHIVO pizzas.js
// const pizza = [
//     {'nombre': "Margarita", 'precio': 10.50},
//     {'nombre': "Cuatro Quesos", 'precio': 12.75},
//     {'nombre': "Napolitana", 'precio': 11.20}
// ]

const fs = require('node:fs');

// Leemos el archivo pizzas.js, lo cual nos devuelve un string
let pizzastring = fs.readFileSync('pizzas.js', 'utf-8',  (err) => { 
    if (err) {throw err};    
})

// Convertimos el string a un objeto JSON, lo cual nos devuelve un array de objetos
let pizzas = JSON.parse(pizzastring);

if (process.argv.length == 2){
// Vamos a preparar un texto para adornar la salida por consola
let menu = "\n\x1b[32mMenu de pizzaNode\n"
menu += "-".repeat(menu.length - 7) + "\n";

// Mostramos primero el texto creado en la variable menu y después vamos a mostrar el contenido del objeto pizzas.js
console.log(menu);
// Ahora ya podemos acceder a las propiedades de los objetos dentro del array
pizzas.forEach((pizza, index) => {
    console.log(`\x1b[32m${index + 1}.\x1b[0m ${pizza.nombre}\n\x1b[32mprecio:\x1b[0m ${pizza.precio}€\n`);
});

// con bucle for
// for (let i = 0; i < pizzas.length; i++) {
//     menu += `\x1b[32m${i + 1}.\x1b[0m ${pizzas[i].nombre}\n\x1b[32mprecio:\x1b[0m ${pizzas[i].precio}€\n`;
// }

console.log("\x1b[32mIndica el numero una pizza para pedirla__\x1b[0m");
} else {







// Vamos a pedir un argumento al usuario para que elija POR NUMERO una pizza del menu
const pedido = process.argv[2]
// Hallaremos que pizza ha pedido el usuario, restando 1 al número introducido (ya que los arrays empiezan en 0).
let pedidoPizza = pizzas[pedido - 1];

if ( pedido < 1 || pedido > pizzas.length) {
    console.log(`\n\x1b[31mEl número \x1b[32m${pedido}\x1b[31m no corresponde a ninguna pizza del menú.\x1b[0m`);
} else {
    console.log(`\nHas pedido la pizza \x1b[32m${pedidoPizza.nombre}\x1b[0m por un precio de \x1b[32m${pedidoPizza.precio}€\x1b[0m`);
}

}