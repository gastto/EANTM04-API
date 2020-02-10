const express = require("express")
const easyDB = require('easydb-io')

api = express()

//cambio de branch


// #region base de datos
// #region Almacenamiento de Datos...
// let peliculas = JSON.parse('[{"titulo":"El padrino","estreno":"1972","description":"Una adaptación ganadora del Premio de la Academia, de la novela de Mario Puzo acerca de la familia Corleone.","poster":"https://images.app.goo.gl/nyPQJbE3QiEB3jti9","trailer":"https://www.youtube.com/watch?v=gCVj1LeYnsc","id":1580860816108},{"titulo":"El padrino 2","estreno":"1980","description":"Una adaptación ganadora del Premio de la Academia, de la novela de Mario Puzo acerca de la familia Corleone.","poster":"https://images.app.goo.gl/nyPQJbE3QiEB3jti9","trailer":"https://www.youtube.com/watch?v=gCVj1LeYnsc","id":1580860856793},{"titulo":"El padrino 3","estreno":"1983","description":"Una adaptación ganadora del Premio de la Academia, de la novela de Mario Puzo acerca de la familia Corleone.","poster":"https://images.app.goo.gl/nyPQJbE3QiEB3jti9","trailer":"https://www.youtube.com/watch?v=gCVj1LeYnsc","id":1580860873865}]')
// #endregion

const peliculas = easyDB({
    database: '5379e850-124f-4052-a116-fb10f996916c',
    token: '1ca090b7-1b57-437f-afab-77e8fdd79941'
  })

// #endregion base de datos

// settings
api.set('port', process.env.PORT || 3000);

// statics
const public = express.static("public")
api.use( public )

// middlewares


// Starting de server
api.listen(api.get('port'), function(){
    console.log(`listening to port ${api.get('port')}`)
})

api.use(express.urlencoded({ extended:true }))
api.use( express.json() )

api.get('/api/peliculas/:id?', function(req,res){

    let elID = req.params.id 

    if( !elID ){ // <-- si no especificó un ID 

        peliculas.list(function(error, listado){
            let rta = error ? { rta: "error", error } : listado
            res.json( rta )
        })


    } else { // <-- si efectivamente especificó un ID

        peliculas.get(elID, function(error, pelicula){
            let rta = error ? {rta: "error", error} : pelicula
            res.json( rta )
        })

    }

})

// Mostrar listado completo


api.post('/api/peliculas', function(req,res){

    let pelicula = req.body
    id = new Date().valueOf()

    peliculas.put(id, pelicula, function(error){
        res.json({ rta: "error", message: error })
    })

    res.json({ rta: "ok", message: "Pelicula creada", id })
})

api.put('/api/peliculas/:id', function(req,res){
    let elID = req.params.id

    if( !elID ){
        res.json({ rta: "error", message: "Id no especidicado" })
    } else {
        let datos = req.body
        
        peliculas.put(elID, datos, function(error, value){
            let rta = error ? { rta: "error", error } : { rta : "ok" , message: "Pelicula actualizada", id: elID }
            res.json( rta )
        })

    }
})

api.delete('/api/peliculas/:id', function(req,res){

    let elID = req.params.id

    peliculas.delete(elID, function(error){
        res.json({ rta: "error", error })
    })

    res.json({ rta: "ok", message: "Pelicula borrada", id: elID })
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