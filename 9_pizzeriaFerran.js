// Vamos a importar el array de ingredientes desde el archivo ingredientes.js
const ingredientes = require('./ingredientes.js')

if (process.argv.length == 2) {
let menu = "Node's Pizzas\n"
menu += "=".repeat(menu.length -1)
menu += "\nNuestras masas"
menu += `\n1. ${ingredientes[0].ingrediente} : ${ingredientes[0].precio.toFixed(2)}`
menu += `\n2. ${ingredientes[1].ingrediente} : ${ingredientes[1].precio.toFixed(2)}`
menu += `\nNuestros ingredientes (elegir cuatro):`
for (let i = 2; i < ingredientes.length; i++) {
    menu += `\n${i+1}.${ingredientes[i].ingrediente} : ${ingredientes[i].precio.toFixed(2)}`
}
menu += "\n\n"
console.log(menu);
} else {

let mensaje = `\nHas elegido pizza con masa ${ingredientes[process.argv[2] -1].ingrediente}`
mensaje += `\ncon ${ingredientes[process.argv[3] -1].ingrediente},`
mensaje += `${ingredientes[process.argv[4] -1].ingrediente},`
mensaje += `${ingredientes[process.argv[5] -1].ingrediente} y `
mensaje += `${ingredientes[process.argv[6] -1].ingrediente}`

let importe = 0

for (let i = 2; i < process.argv.length; i++) {
    importe += ingredientes[process.argv[i] -1].precio
}

mensaje += `\nImporte total: ${importe.toFixed(2)} €`
console.log(mensaje);
}