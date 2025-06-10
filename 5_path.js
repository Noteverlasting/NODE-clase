const path = require('node:path');

console.log(path.sep)

const ruta = "proyecto/css/style.css";
const rutaCSS = path.join("proyecto", "css", "style.css");
console.log(rutaCSS)

console.log(path.dirname(rutaCSS)  ) // directorio
console.log(path.basename(rutaCSS)) // nombre del archivo