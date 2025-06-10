import {freemem, totalmem, cpus, hostname, release, userInfo} from "os"


// freemem devuelve la cantidad de memoria libre en bytes
console.log('Memoria libre:', (freemem()/1024/1024/1024).toFixed(2) + " GB libres")
console.log('Memoria total:', (totalmem() / 1024 / 1024 / 1024).toFixed(2) + " GB totales")
console.log("Hay", cpus().length, "núcleos")
console.log("Versión del sistema operativo:", release())

// const os = require("os")
// console.log(os)