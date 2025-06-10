const http = require ("node:http")
// console.log(http)


// petición = request -> req
// respuesta = response -> res

// php -S localhost:3000

// Asignamos el puerto de conexión
const PUERTO = 8000
const css = `
<style>
h1 {
    color: red;
    font-family: Arial, sans-serif;
}
</style>
`

// Creamos el servidor HTTP
const server = http.createServer((req, res) => { 
    // console.log(res.statusCode)
    if(req.url === '/') {
        console.log("Estamos en la ruta raíz")
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.write(`${css} <h1>Todo OK, estamos en la raíz del proyecto</h1>`)
        res.write("<a href='/contacto'>Contacto</a>")
        res.end()
    } else if(req.url === '/contacto') {
        console.log("Estamos en la ruta de contacto")
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.write(`${css} <h1>Todo OK, estamos en la ruta de contacto</h1>`)
        res.write("<a href='/'>Volver a la raíz</a>")
        res.end()
    } else {
        console.log(res.statusCode)
     
            console.log("Ruta no encontrada")
            res.writeHead(404, { 'Content-Type': 'text/html' })
            res.write(`${css} <h1>404 - Página no encontrada</h1>`)
            res.write("<a href='/'>Volver a la raíz</a>")
            res.end()
            return
     
    }

    

})

server.listen(PUERTO, () => {
    console.log(`Servidor escuchando en http://localhost:${PUERTO}`)
})

