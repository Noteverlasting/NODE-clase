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
const http = require('node:http');

const datos = JSON.parse(fs.readFileSync('./escuela.json', 'utf8'));


// Creamos otra funcion para que si en el terminal se escribe alguna opcion como --help o --menu, se muestre un menu explicativo.
function mostrarAyuda() {
  const ayuda = {
    rutas: {
      "/": "Muestra esta ayuda y lista todos los alumnos",
      "/asignatura": "Filtra alumnos por asignatura (ej: /matematicas)",
      "/nombre/apellido": "Busca un alumno específico (ej: /Juan/Perez)"
    },
    ejemplos: {
      "Lista completa": "http://localhost:4000/",
      "Filtrar por asignatura": "http://localhost:4000/matematicas",
      "Buscar alumno": "http://localhost:4000/Juan/Perez"
    }
  };
  return ayuda;
}

// Iniciar servidor web
const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const path = req.url.substring(1).split('/');

  try {
    // Ruta principal
    if (req.url === '/') {
      const ayuda = mostrarAyuda();
      res.end(JSON.stringify({ayuda: ayuda, datos: datos.alumnos}, null, 2));
      return;
    }

    // Ruta para buscar por asignatura
    if (path.length === 1) {
      const asignatura = decodeURIComponent(path[0]);
      const alumnosAsignatura = datos.alumnos.filter(a => 
        a.asignatura === asignatura
      );
      res.end(JSON.stringify(alumnosAsignatura, null, 2));
      return;
    }

    // Ruta para buscar alumno específico
    if (path.length === 2) {
      const nombre = decodeURIComponent(path[0]);
      const apellido = decodeURIComponent(path[1]);
      const alumno = datos.alumnos.find(a => 
        a.nombre === nombre && 
        a.apellido === apellido
      );

      if (alumno) {
        res.end(JSON.stringify(alumno, null, 2));
      } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ mensaje: "No tenemos matriculado a ese alumno" }));
      }
      return;
    }

    res.statusCode = 404;
    res.end(JSON.stringify({ mensaje: "Ruta no válida" }));

  } catch (error) {
    res.statusCode = 500;
    res.end(JSON.stringify({ mensaje: "Error interno del servidor" }));
  }
});

// Iniciar el servidor en el puerto 4000
server.listen(4000, () => {
  console.log('\x1b[42m\x1b[1;30m Servidor web disponible en http://localhost:4000 \x1b[0m');
});

