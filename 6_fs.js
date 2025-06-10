const fs = require('node:fs');

// console.log(fs)

let texto = "En un lugar de la Mancha de cuyo nombre no quiero acordarme, no ha mucho ..."

// fs.writeFileSync('prueba.txt', texto, 'utf-8');

// fs.appendFileSync('prueba.txt', '\n\tEl Quijote', 'utf-8');

const textoFichero = fs.readFileSync('pruebas.txt', 'utf-8',  (err) => { 
    if (err) {throw err};    
})

console.log("Texto leído correctamente")
console.log(textoFichero);
