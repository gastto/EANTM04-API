const express = require("express")
const bodyParser = require('body-parser')
// const easyDB = require('easydb-io')
const MongoClient = require('mongodb').MongoClient
const assert = require('assert');


  
        
        
api = express()
const public = express.static("public")

api.use( public )

api.listen(8080, function(){
    console.log('listening to port 8080')
})

api.use(bodyParser.urlencoded({ extended: false }))
api.use(bodyParser.json())
// api.use(express.urlencoded({ extended:true }))
// api.use( express.json() )

const url = "mongodb://localhost:27017"
const dbName = "test"
const collectionName = "mongoTest"

const config = {}

const client = MongoClient(url, config)

MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db(dbName);
});

api.get('/api/peliculas/', function(req,res){

    client.connect(err => {
        if(err) throw err;
        
        const db = client.db(dbName)
        const collection = db.collection(collectionName)
        
        collection.find().toArray((err,result) => {
            if(err) throw err;
            res.json({result});
            client.close();
        })

    })

})

api.post('/api/peliculas', function(req,res){

    client.connect(err => {

        if(err) throw err;
        
        const db = client.db(dbName)
        const collection = db.collection(collectionName)

        const obj = { 
            Nombre: req.body.nombre,
            Titulo: req.body.titulo,
            Descripcion: req.body.descripcion,
            Año: req.body.year,
            Mensaje: req.body.mensaje
        }

        collection.insertOne(obj, (err, result) => {
            if(err) throw err;
            console.log({ result });
            res.send( result.ops )
            res.
            client.close();
        })

    })

})
    
    
// const rpa = client.connect(err => {
//     if(err) throw err;
    
//     const findDocuments = function(db, callback){
//     const db = client.db(dbName)
//     const collection = db.collection(collectionName)

//     collection.find({}).toArray((err,result) => {
//         if(err) throw err;
//         console.log({result}, result.length);

//         callback(result)
//         client.close();
//     })
// }
    
// })

// let elID = req.params.id 

// if( !elID ){ // <-- si no especificó un ID 

//     peliculas.find(function(error, listado){
//         let rta = error ? { rta: "error", error } : listado
//         res.json( rta )
//     })


// } else { // <-- si efectivamente especificó un ID

//     peliculas.get(elID, function(error, pelicula){
//         let rta = error ? {rta: "error", error} : pelicula
//         res.json( rta )
//     })

// }

// Mostrar listado completo

// api.post('/api/peliculas', function(req,res){

//     client.connect(url, function(err, client) {
//         if(err) throw err;
        
//         const db = client.db(dbName)
//         const collection = db.collection(collectionName)

//         collection.insertOne(id, pelicula, (error, result) => {
//             console.log({ result });
//             // res.json({ rta: "error", message: error })
//             client.close();
//         })
    
//     });

//     let pelicula = req.body
//     // id = new Date().valueOf()

//     // res.json({ rta: "ok", message: "Pelicula creada", id })
// })

// api.put('/api/peliculas/:id', function(req,res){
//     let elID = req.params.id

//     if( !elID ){
//         res.json({ rta: "error", message: "Id no especidicado" })
//     } else {
//         let datos = req.body
        
//         peliculas.put(elID, datos, function(error, value){
//             let rta = error ? { rta: "error", error } : { rta : "ok" , message: "Pelicula actualizada", id: elID}
//             res.json( rta )
//         })

//     }
// })

// api.delete('/api/peliculas/:id', function(req,res){

//     let elID = req.params.id

//     peliculas.delete(elID, function(error){
//         res.json({ rta: "error", error })
//     })
 
//     res.json({ rta: "ok", message: "Pelicula borrada", id: elID })
// })



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