// Requerimos fs
const fs = require("node:fs");

// Creamos una constante donde eliminamos los dos primeros elementos del array, dejando solo los argumentos que el usuario ha introducido.
const args = process.argv.slice(2);

// Creamos una constante donde concatenamos los argumentos del array con un espacio en medio de cada uno
let colores = { usuarios: [] }

// Creamos una variable para mostrar los textos dentro de cada caso.
let menu = "";

// Si el archivo colores.json existe, se lee en lugar de la constante colores (que está vacia predeterminadamente)
if (fs.existsSync("colores.json")) {
  try {
    const coloresleido = fs.readFileSync("colores.json", "utf8");
    colores = JSON.parse(coloresleido);
  } catch (error) {
    console.error("Error al leer o parsear colores.json:", error.message);
  }
}

function guarDatos() {
    const datos = JSON.stringify(colores, null, 2);
    fs.writeFileSync("colores.json", datos, "utf-8")
}

function mostrarAyuda(){
    //COLORES
    const verde = "\x1b[32m"
    const azul = "\x1b[34m"
    const amarillo = "\x1b[33m"
    const reset = "\x1b[0m"
    //MENSAJE
    let ayuda = `${verde}COLORES - Listado de usuarios`
    ayuda += "\n" + "-".repeat(ayuda.length) + "\n" + reset
    ayuda +=`


${amarillo}Comandos disponibles:

1. Registrar usuario:${reset}
   node colores.js nombre apellido idioma color
   ${verde}Ejemplo: node colores.js Anna-Maria Garcia inglés negro${reset}

${amarillo}2. Borrar usuario:${reset}
   node colores.js nombre apellido -1
   ${verde}Ejemplo: node colores.js Anna-Maria Garcia -1${reset}

${amarillo}3. Buscar usuario:${reset}
   node colores.js nombre apellido
   ${verde}Ejemplo: node colores.js Anna-Maria Garcia${reset}

${amarillo}4. Ver usuarios por color escogido:${reset}
   node colores.js color
   ${verde}Ejemplo: node colores.js negro${reset}

${amarillo}5. Ver todos los usuarios:${reset}
   node colores.js

${amarillo}6. Mostrar esta ayuda:${reset}
   node colores.js --help
   node colores.js --menu

${azul}Nota: Los nombres compuestos deben escribirse con guión (Anna-Maria)${reset}
`;

  console.log(ayuda)
}

// Vamos a manejar los casos que serán
// 1: sin argumentos            
// - lista de todos los usuarios (nombre, apellido, idioma) con sus colores elegidos ORDENADOS ALFABETICAMENTE x APELLIDO
// 2: con 1 argumento (color)   
// - lista de los usuarios (nombre, apellido, idioma) que tengan ese color como elegido
// 3: con 2 argumentos (nombre y apellido)
// - lista de los usuarios que tengan ese nombre y apellido (nombre, apellido, idioma) y colores elegidos
// 4: con 3 argumentos (nombre, apellido y -1)
// - eliminación del usuario escrito que coincida en nombre y apellido DE TODOS LOS REGISTROS
// 5: con 4 argumentos (nombre, apellido, idioma y color)
// - inscripcion de un nuevo usuario a la base de datos (JSON)

if (args.includes("--help") || args.includes("--menu")) {
  mostrarAyuda();
  process.exit(); // Para evitar que siga al switch
}

switch (args.length) {
    case 0:
    menu = "\nListado de usuarios y colores\n"
    menu += "-".repeat(menu.length - 2) + "\n";
    let usuarios = [...colores.usuarios].sort((a,b) => {
    return (
    a.apellido.localeCompare(b.apellido) ||
    a.nombre.localeCompare(b.nombre) ||
    a.color.localeCompare(b.color))
        // if (a.apellido > b.apellido) return 1
        // if (a.apellido < b.apellido) return -1
        // if (a.nombre > b.nombre) return 1
        // if (a.nombre < b.nombre) return -1
        // if (a.color > b.color) return 1
        // if (a.color < b.color) return -1
        // // El return 0 es necesario porque si hubiese datos exactamente iguales, devolveria undefined de no tenerlo puesto.
        // return 0
    })
    for (usu of usuarios){
        menu += `\nNombre: ${usu.nombre} \nApellido: ${usu.apellido} \nIdioma: ${usu.idioma} \nColor: ${usu.color}\n`
    }
    console.log(menu);
    break;

    case 1:
    let color = args[0];
    menu = "\nListado de usuarios con el color: " + color + "\n"
    menu += "-".repeat(menu.length - 2) + "\n";
        for (usu of colores.usuarios){
        if (color === usu.color) {
             menu += `Nombre: ${usu.nombre} \nApellido: ${usu.apellido} \nIdioma: ${usu.idioma} \n`
        }
    }
    console.log(menu);
    break;

    case 2:
    let nombre = args[0]
    let apellido = args[1]
    menu = "\nListado de usuarios con el nombre y apellido: " + nombre + " " + apellido + "\n"
    menu += "-".repeat(menu.length -2) + "\n"
        for (usu of colores.usuarios){
            if (usu.nombre === nombre && usu.apellido === apellido) {
                menu += `Nombre: ${usu.nombre} \nApellido: ${usu.apellido} \nIdioma: ${usu.idioma} \nColor: ${usu.color}\n`
            }
        }
    console.log(menu);
    break;

    case 3:
    if (args[2] === "-1") {
        let nombreABorrar = args[0];
        let apellidoABorrar = args[1];
        let nuevosUsuarios = [];
        let eliminados = 0;

    for (usu of colores.usuarios) {
        if (usu.nombre === nombreABorrar && usu.apellido === apellidoABorrar) eliminados++; 
        else nuevosUsuarios.push(usu);  
    }
    
    colores.usuarios = nuevosUsuarios;

    if (eliminados > 0) {
        guarDatos()
        console.log(`Se eliminaron ${eliminados} usuario(s) llamados ${nombreABorrar} ${apellidoABorrar}`);
    } else console.log("No tenemos matriculado a ese alumno")

    } else console.log("Error: Comando no válido");
    break;

    case 4:
    let nuevoUsuario = {
        nombre: args[0],
        apellido: args[1],
        idioma: args[2],
        color: args[3],
    }
    colores.usuarios.push(nuevoUsuario);
    guarDatos();
    console.log(`Usuario ${nuevoUsuario.nombre} ${nuevoUsuario.apellido} matriculado/a`);
    break;

}
    
