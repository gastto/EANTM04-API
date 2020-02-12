const MongoClient = require("mongodb").MongoClient
const uri = "mongodb://localhost:27017"
const dbName = "test"
const collectionName = "mongoTest"

const config = {}

const client = MongoClient(uri, config)

client.connect(err => {
    if(err) throw err;
    
    const db = client.db(dbName)
    const collection = db.collection(collectionName)
    
    collection.find().toArray((err,result) => {
        if(err) throw err;
        console.log({result}, result.length);
        client.close();
    })

    const obj = { name: 'Carlitos', apellido: 'Gonzales', address: 'Corrientes', edad: '22' }
    collection.insertOne(obj, (err, result) => {
        console.log({ result });
        client.close();
    })
})
