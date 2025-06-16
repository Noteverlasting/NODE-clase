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

// Creamos una variable para almacenar los datos leidos desde escuela.json
const datos = JSON.parse(fs.readFileSync('./escuela.json', 'utf8'));

function generarHTML(titulo, contenido) {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${titulo}</title>
        <style>
          .alumno { 
            margin: 10px 0;
            padding: 10px;
            border-bottom: 1px solid #ccc;
            list-style: none;
          }
        </style>
    </head>
    <body>
        <h1>${titulo}</h1>
        <nav>
          <a href="/">Inicio</a>
        </nav>
        ${contenido}
    </body>
    </html>
  `;
}

function renderizarListaAlumnos(alumnos) {
    if (!alumnos || alumnos.length === 0) return '<p>No se encontraron alumnos</p>' 

    let html = '<ul>';
    let alumnosUnicos = {};

    // Agrupar por nombre y apellido
    for(let alumno of alumnos) {
        let id = alumno.nombre + alumno.apellido;
        if (!alumnosUnicos[id]) {
            alumnosUnicos[id] = {
                nombre: alumno.nombre,
                apellido: alumno.apellido,
                edad: alumno.edad,
                asignaturas: [alumno.asignatura]
            };
        } else {
            // Solo añadir asignatura si no está ya incluida
            if (!alumnosUnicos[id].asignaturas.includes(alumno.asignatura)) {
                alumnosUnicos[id].asignaturas.push(alumno.asignatura);
            }
        }
    }

    // Crear entrada HTML para cada alumno único
    for(let id in alumnosUnicos) {
        let alumno = alumnosUnicos[id];
        html += `
            <li class="alumno">
                <strong>Nombre:</strong> ${alumno.nombre}<br>
                <strong>Apellido:</strong> ${alumno.apellido}<br>
                <strong>Edad:</strong> ${alumno.edad}<br>
                <strong>Asignaturas:</strong> ${alumno.asignaturas.toString()}
            </li>
        `;
    }
    
    html += '</ul>';
    return html;
}

// Creamos otra funcion para que si en el navegador no se escribe nada, se muestre un menu explicativo.
function mostrarAyuda() {
  const ayuda = `
    <h2>Rutas disponibles:</h2>
    <ul> 
      <li>"/": "Muestra esta ayuda y lista todos los alumnos"</li>
      <li>"/asignatura": "Filtra alumnos por asignatura (ej: /matematicas)"</li>
      <li>"/nombre/apellido": "Busca un alumno específico (ej: /Juan/Perez)"</li>
    </ul>
    <h2>ejemplos:</h2>
    <ul> 
      <li>"Lista completa": "http://localhost:4000/"</li>
      <li>"Filtrar por asignatura": "http://localhost:4000/matematicas"</li>
      <li>"Buscar alumno": "http://localhost:4000/Juan/Perez"</li>
    </ul>
  `;
  return ayuda;
}

// Iniciar servidor web
const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');
  const path = req.url.substring(1).split('/');

    try {
        if (req.url === '/') {
            const alumnosOrdenados = [...datos.alumnos].sort((a, b) => 
                a.apellido.localeCompare(b.apellido, 'es')
            );
            
            const contenido = `
                ${mostrarAyuda()}
                <h2>Lista de Alumnos</h2>
                ${renderizarListaAlumnos(alumnosOrdenados)}
            `;
            
            res.end(generarHTML('Escuela - Inicio', contenido));
            return;
        }

        if (path.length === 1) {
            const asignatura = decodeURIComponent(path[0]);
            const alumnosAsignatura = datos.alumnos.filter(a => 
                a.asignatura === asignatura
            );
            
            const contenido = `
                <h2>Alumnos de ${asignatura}</h2>
                ${renderizarListaAlumnos(alumnosAsignatura)}
            `;
            
            res.end(generarHTML(`Escuela - ${asignatura}`, contenido));
            return;
        }

        if (path.length === 2) {
            const nombre = decodeURIComponent(path[0]);
            const apellido = decodeURIComponent(path[1]);
            // Usamos filter para obtener todas las coincidencias
            const alumnosEncontrados = datos.alumnos.filter(a => 
                a.nombre === nombre && 
                a.apellido === apellido
            );

            if (alumnosEncontrados.length > 0) {
                const contenido = `
                    <h2>Detalles del Alumno <br>${nombre} ${apellido}</h2>
                    ${renderizarListaAlumnos(alumnosEncontrados)}
                `;
                res.end(generarHTML(`Alumno - ${nombre} ${apellido}`, contenido));
            } else {
                res.statusCode = 404;
                res.end(generarHTML('Error 404', '<h2>No tenemos matriculado a ese alumno</h2>'));
            }
            return;
        }

        res.statusCode = 404;
        res.end(generarHTML('Error 404', '<h2>Ruta no válida</h2>'));

    } catch (error) {
        console.error('Error:', error);
        res.statusCode = 500;
        res.end(generarHTML('Error 500', '<h2>Error interno del servidor</h2>'));
    }
});

// Iniciar el servidor en el puerto 4000
server.listen(4000, () => {
  console.log('\x1b[42m\x1b[1;30m Servidor web disponible en http://localhost:4000 \x1b[0m');
});

