/*
APLICACIÓN: ESCUELA

El objetivo es matricular alumnos en una escuela y poder mostrar esa información.
Utilizaremos un fichero llamado escuela.js para la programación y otro llamado escuela.json
para guardar los datos.

La matriculación se realizará así:
node escuela.js nombre_alumno apellido_alumno edad asignatura

Nota 1: No sabremos por adelantado cuáles son las asignaturas.
Nota 2: Admitiremos nombres compuestos si se escriben 
con un guión en medio, así: Anna-Maria

En cada matriculación los datos del alumno se incorporarán al fichero .json,
donde quedarán registrados en ese formato, obviamente.

Podremos borrar un alumno de la lista así:
node escuela.js nombre_alumno apellido_alumno -1
Si el alumno no está en la lista debe aparecer este mensaje:
"No tenemos matriculado a ese alumno"

Si escribimos:
node escuela.js
Apareceran los datos de todos los alumnos, así:

Alumnos matriculados
====================
nombre_1 apellido_1 edad_1 asignatura_x
nombre_2 apellido_2 edad_2 asignatura_y
...
nombre_n apellido_n edad_n asignatura_z
---------------------------------------
Total: n alumnos matriculados

Ordenados por apellido, nombre, asignatura de forma descendente
(de la A a Z)

Si escribimos:
node escuela.js nombre_alumno apellido_alumno
Deben aparecer las asignaturas en las que está matriculado así:

El alumno nombre_alumno apellido_alumno está matriculado de:
    -- X 
    -- Y

Pero si no estuviera en la lista debe aparecer este mensaje:
"No tenemos matriculado a ese alumno"

Si escribimos:
node escuela.js asignatura (cualquiera que sea)
Aparecerán los datos de los alumnos matriculados en ella, así:

Alumnos matriculados en X (X es la asignatura)
=========================
nombre_1 apellido_1 edad_1
nombre_2 apellido_2 edad_2
...
nombre_n apellido_n edad_n
--------------------------------
Total: n alumnos matriculados

Cualquier otra forma de acceder a los datos debe de considerarse un error
y debe aparecer el correspondiente mensaje

------------------------------------------------------------------------------------

Cuando funcione la versión por terminal prepara otra por servidor web, así:

http://localhost:4000/ <- todos los alumnos
http://localhost:4000/nombre_alumno/apellido_alumno <- datos de un alumno
http://localhost:4000/asignatura <- alumnos de una asignatura
*/

// Requerimos fs
const fs = require("node:fs");

// Creamos una constante donde eliminamos los dos primeros elementos del array, dejando solo los argumentos que el usuario ha introducido.
// Así será más sencillo manejarse a traves de los indices.
const args = process.argv.slice(2);

// Variable para almacenar en un objeto con una clave llamada alumnos, cuyo valor inicial es un array vacío.
let datos = { alumnos: [] };

// if para leer el archivo escuela.json si existe
if (fs.existsSync("escuela.json")) {
  const contenido = fs.readFileSync("escuela.json", "utf8");
  datos = JSON.parse(contenido);
}

// Creamos una función para guardar datos en el archivo JSON
function guardarDatos() {
  // COMPOSICION DE STRINGIFY =>
  // JSON.stringify(valor //qué se toma como valor//, replacer //filtra o transforma propiedades de la conversión. "null" incluye todas//, space //indentacion//)
  // Aqui indicamos que convertimos 'datos' a una cadena en formato JSON, con todas sus propiedades (null) y una indentación de 2 espacios para que sea legible.
  const datosString = JSON.stringify(datos, null, 2);
  // Aqui escribimos la cadena JSON (datosString) en 'escuela.json', en codificacion UTF-8.
  fs.writeFileSync("escuela.json", datosString, "utf8");
}

// Creamos otra funcion para que si en el terminal se escribe alguna opcion como --help o --menu, se muestre un menu explicativo.
function mostrarAyuda() {
  //COLORES
  const verde = "\x1b[32m"
  const azul = "\x1b[34m"
  const amarillo = "\x1b[33m"
  const reset = "\x1b[0m"
  //MENSAJE
  const ayuda = `
${verde}ESCUELA - Sistema de Gestión de Alumnos
=======================================${reset}

${amarillo}Comandos disponibles:

1. Matricular alumno:${reset}
   node escuela.js nombre apellido edad asignatura
   ${verde}Ejemplo: node escuela.js Anna-Maria Garcia 20 Matematicas${reset}

${amarillo}2. Borrar alumno:${reset}
   node escuela.js nombre apellido -1
   ${verde}Ejemplo: node escuela.js Anna-Maria Garcia -1${reset}

${amarillo}3. Buscar alumno:${reset}
   node escuela.js nombre apellido
   ${verde}Ejemplo: node escuela.js Anna-Maria Garcia${reset}

${amarillo}4. Ver alumnos por asignatura:${reset}
   node escuela.js asignatura
   ${verde}Ejemplo: node escuela.js Matematicas${reset}

${amarillo}5. Ver todos los alumnos:${reset}
   node escuela.js

${amarillo}6. Mostrar esta ayuda:${reset}
   node escuela.js --help
   node escuela.js --menu

${azul}Nota: Los nombres compuestos deben escribirse con guión (Anna-Maria)${reset}
`;

  console.log(ayuda);
}


// CONDICIONES 

// Antes de nada, la primera opción se va a dar cuando se pida el menu de ayuda
if (args[0] === "--help" || args[0] === "--menu") {
  mostrarAyuda();
}


// CASO 1 (4 argumentos)
// Matricular alumno
// Si el usuario introduce 4 argumentos, creamos un objeto con los datos del alumno.
else if (args.length === 4) {
  let alumno = {
    nombre: args[0],
    apellido: args[1],
    edad: Number(args[2]),
    asignatura: args[3],
  };
  // Agregamos el nuevo alumno al array 'alumnos' dentro del objeto 'datos'
  datos.alumnos.push(alumno)
  // Llamamos a la funcion guardarDatos para que se guarden los cambios en el archivo JSON.
  guardarDatos()
  // Mostramos por terminal la confirmación.
  console.log(`Alumno ${alumno.nombre} ${alumno.apellido} matriculado`)
}

// CASO 2 (3 argumentos, el último es "-1")
// Borrar alumno
else if (args.length === 3 && args[2] === "-1") {
  let encontrado = false
  // Recorremos la lista buscando el índice del alumno
  for (let i = 0; i < datos.alumnos.length; i++) {
    let alumno = datos.alumnos[i]
    // Si encontramos al alumno lo borramos directamente usando splice
    if (alumno.nombre === args[0] && alumno.apellido === args[1]) {
      datos.alumnos.splice(i, 1)
      encontrado = true
      break; // Salimos del bucle porque ya lo encontramos
    }
  }
  // Si se ha encontrado al alumno, guardamos los cambios en el archivo JSON y mostramos confirmación por teminal.
  if (encontrado) {
    guardarDatos();
    console.log(`Alumno ${args[0]} ${args[1]} eliminado`)
    // Si no, mostramos un mensaje de error.
  } else {
    console.log("No tenemos matriculado a ese alumno")
  }
}

// CASO 3 (2 argumentos)
// Buscar alumno
else if (args.length === 2) {
  let encontrado = false
  // Recorremos el array buscando la coincidencia del alumno (nombre y apellido)
  for (let alumno of datos.alumnos) {
    // Si se encuentra, mostramos los datos en terminal (nombre, apellido y asignatura)
    if (alumno.nombre === args[0] && alumno.apellido === args[1]) {
      encontrado = true
      console.log(`El alumno ${args[0]} ${args[1]} está matriculado de:`);
      console.log(`    -- ${alumno.asignatura}`)
    }
  }
  // Si no se encuentra, mostramos mensaje de error.
  if (!encontrado) {
    console.log("No tenemos matriculado a ese alumno")
  }
}

// CASO 4 (1 argumento)
// Buscar por asignatura
else if (args.length === 1) {
  // Designamos una variable al argumento escrito por el usuario con indice 0
  let asignatura = args[0]
  // Designamos otra variable que es un array vacío para almacenar los alumnos coincidentes con la asignatura
  let encontrados = []
  // Recorremos el array buscando la coincidencia de la variable asignatura con la asignatura del alumno
  for (let alumno of datos.alumnos) {
    // Si se encuentra coincidencia, se añade al array encontrados.
    if (alumno.asignatura === asignatura) {
      encontrados.push(alumno)
    }
  }
  // Si el array encontrados tiene una longitud mayor que 0 (es decir, no está vacio) mostramos en consola los datos de los alumnos encontrados.
  if (encontrados.length > 0) {
    console.log(`Alumnos matriculados en ${asignatura}`)
    console.log("=========================")
    for (let alumno of encontrados) {
      console.log(`${alumno.nombre} ${alumno.apellido} ${alumno.edad}`)
    }
    console.log("--------------------------------")
    console.log(`Total: ${encontrados.length} alumnos matriculados`)
    // En caso contrario, informamos con un mensaje que no hay alumnos en esa asignatura.
  } else {
    console.log(`No hay alumnos en ${asignatura}`)
  }
}

// Mostrar todos los alumnos (sin argumentos)
else if (args.length === 0) {
  console.log("Alumnos matriculados")
  console.log("====================")

  // Creamos en una variable una copia con [...] -es similar al .slice() pero con menos codigo- para no modificar directamente los datos originales.
  // Luego, sobre esa copia, aplicamos .sort((a,b) => {}), que ordena los alumnos según la lógica que pongamos dentro.
  let listaOrdenada = [...datos.alumnos].sort((a, b) => {
    // LOS ORDENO DE FORMA ASCENDENTE PORQUE AUNQUE EN EL EJERCICIO PONGA DESCENDIENTE, SE PIDE QUE SEAN DE LA A A LA Z EN REALIDAD.
    // Ordenar por apellido ascendente
    if (a.apellido > b.apellido) return 1
    if (a.apellido < b.apellido) return -1
    // Si los apellidos son iguales, ordenar por nombre ascendente
    if (a.nombre > b.nombre) return 1
    if (a.nombre < b.nombre) return -1
    // Si nombre y apellido son iguales, ordenar por asignatura ascendente
    if (a.asignatura > b.asignatura) return 1
    if (a.asignatura < b.asignatura) return -1

    return 0 // Son iguales en los tres criterios
  });
  // Recorremos la lista ordenada y mostramos en consola los datos de los alumnos ya ordenados anteriormente.
  for (let alumno of listaOrdenada) {
    console.log(
      `${alumno.nombre} ${alumno.apellido} ${alumno.edad} ${alumno.asignatura}`
    );
  }
  console.log("---------------------------------------")
  console.log(`Total: ${datos.alumnos.length} alumnos matriculados`)

// Si hubiese cualquier otro error, mostraremos que el comando no es válido y a continuación mostramos tambien el menu de ayuda.
} else {
  console.log("Error: Comando no valido")
  mostrarAyuda();
}
