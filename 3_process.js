// Versión actual de NODE en ejecución
// console.log(process.versions.node)

// Versión del motor V8
// console.log(process.versions.v8)

// clg
// console.log(process.argv)

// if (process.argv[2] == '--help') {

//     console.log("Menú de ayuda:	")
//     console.log("...")
//  } else {
//     console.log("Ejecutar la aplicación")
//  }

console.log(`Buenos dias, ${process.argv[2]}!`)
//Con esto, en la terminal, al escribir 'node .\3_process.js Omar', se mostrará "Buenos dias, Omar!" en la consola de Node.
//Si el segundo argumento tiene más de una palabra, necesitaremos ponerlo entre comillar 'node .\3_process.js "Don Omar"'