const express = require("express")
const bodyParser = require("body-parser")


app = express()

const public = express.static("public")


app.use(bodyParser.urlencoded({extended:true}))
app.use( public )

app.listen(8080, function(){
    console.log('listening to port 8080')
})

app.get('/api/peliculas/', function(req,res){
    console.log('obtengo respuesta')
    res.end('Obtengo peliculas')
})

app.post('/api/peliculas/', function(req,res){
    console.log(req.body)
    res.end('agrego peliculas')
})

app.put('/api/peliculas/', function(req,res){
    console.log(req.body)
})

app.delete('/api/peliculas/', function(req,res){
    console.log(req.body)
})
