const express = require("express")
const easyDB = require('easydb-io')

api = express()


// #region base de datos

// Almacenamiento de Datos...
// let peliculas = JSON.parse('[{"titulo":"El padrino","estreno":"1972","description":"Una adaptación ganadora del Premio de la Academia, de la novela de Mario Puzo acerca de la familia Corleone.","poster":"https://images.app.goo.gl/nyPQJbE3QiEB3jti9","trailer":"https://www.youtube.com/watch?v=gCVj1LeYnsc","id":1580860816108},{"titulo":"El padrino 2","estreno":"1980","description":"Una adaptación ganadora del Premio de la Academia, de la novela de Mario Puzo acerca de la familia Corleone.","poster":"https://images.app.goo.gl/nyPQJbE3QiEB3jti9","trailer":"https://www.youtube.com/watch?v=gCVj1LeYnsc","id":1580860856793},{"titulo":"El padrino 3","estreno":"1983","description":"Una adaptación ganadora del Premio de la Academia, de la novela de Mario Puzo acerca de la familia Corleone.","poster":"https://images.app.goo.gl/nyPQJbE3QiEB3jti9","trailer":"https://www.youtube.com/watch?v=gCVj1LeYnsc","id":1580860873865}]')

const peliculas = easyDB({
    database: '5379e850-124f-4052-a116-fb10f996916c',
    token: '1ca090b7-1b57-437f-afab-77e8fdd79941'
  })

// #endregion base de datos

const public = express.static("public")

api.use( public )

api.listen(8080, function(){
    console.log('listening to port 8080')
})

api.use(express.urlencoded({extended:false}))
api.use( express.json() )

api.get('/api/peliculas/', function(req,res){

    let listado = peliculas.get("pelicula", function(error, pelicula){
        let rta = error ? {rta: "error", message: error} : pelicula
        res.json( rta )
    })

})

// Mostrar listado completo


api.post('/api/peliculas', function(req,res){

    let pelicula = req.body
    pelicula.id = new Date().valueOf()

    peliculas.put('pelicula', pelicula, function(error){
        res.json({ rta: "error", message: error })
    })

    res.json({ rta: "ok", message: "Pelicula creada" })
})

api.put('/api/peliculas/:id', function(req,res){
    let elID = req.params.id

    let datos = req.body

    let laPelicula = peliculas.find(function(pelicula){
        return pelicula.id == elID
    })
    laPelicula.titulo = datos.titulo || laPelicula.titulo
    laPelicula.estreno = datos.estreno || laPelicula.estreno
    laPelicula.descripcion = datos.descripcion || laPelicula.descripcion
    laPelicula.poster = datos.poster || laPelicula.poster
    laPelicula.trailer = datos.trailer || laPelicula.trailer

    res.json({ rta: "ok", pelicula : laPelicula })
})

api.delete('/api/peliculas/:id', function(req,res){
    res.end("Aca voy a borrar la pelicula" + req.params.id)
})



/*

-API RESTFULL: PELICULAS

http://localhost/api/peliculas

- GET: (/ o /14) Obtener todas o una pelicula puntual
- POST: (/) Recibe y genera una nueva pelicula
- PUT: (/14) Recibe y actualiza una pelicula puntual
- DELETE: (/14) Recibe y borra una pelicula puntual


const express = require("express")
const bodyParser = require("body-parser")

const api = express()

api.listen(80)

//Endpoints

api.get("/api/peliculas", function(req,res){
    res.end("Aca voy a mostrar peliculas")
})

api.post("/api/peliculas", function(req,res){
    res.end("Aca voy a crear peliculas")
})

api.put("/api/peliculas", function(req,res){
    res.end("Aca voy a actualizar peliculas")
})

api.delete("/api/peliculas", function(req,res){
    res.end("Aca voy a eliminar peliculas")
})


//armar formulario que pida titulo, año de estreno, el poster, descripcion, un trailer

*/