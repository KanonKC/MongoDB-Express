const bodyParser = require("body-parser")
const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://admin:admin@127.0.0.1:27017/dxh?authSource=dxh&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false'
const express = require("express")
const app = express()

app.use(bodyParser.json());

const dbName = 'dxh'
let db

MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    if (err) return console.log(err)

    // Storing a reference to the database so you can use it later
    db = client.db(dbName)
    console.log(`Connected MongoDB: ${url}`)
    console.log(`Database: ${dbName}`)
})

app.listen(8000, function () {
    console.log("Listening on 8000")
})

app.get('/test', (req, res) => {
    // res.sendFile(__dirname + '/index.html')
    // const user = db.collection('users').find()
    // res.json(user)
    db.collection('test').find().toArray()
    .then(results => {
        if(Object.keys(req.body).length != 0){
            results = results.filter((ins)=>ins._id == Number(req.body.id))
        }
        res.json(results)

    })
    .catch(error => console.error(error))

})

app.post('/test', async(req,res) => {
    try{
        const postData = {
            name: req.body.name,
            number: req.body.number
        }
        db.collection('test').insertOne(postData,function(err){
            if(err){
                res.json({
                    status: 401,
                    data: null
                })
            }
            else{
                res.json({
                    status: 201,
                    data: postData
                })
            }
        })
    }
    catch(err){
        res.json({
            status: 401,
            data: null
        })
    }
})

app.put("/test", async(req,res)=>{
    try{
        db.collection('test').updateOne({'name':req.body.name}, {
            $set:{
                name: req.body.new_name,
                number: req.body.new_number
            }
        })
        res.json({
            status: 201,
            data: "OK!"
        })
    }
    catch(err){}
})

app.delete("/test",async(req,res)=>{
    try{
        db.collection('test').deleteOne({"_id": req.body.id})
        res.json({
            status: 201,
            data: "Deleted"
        })
    }
    catch(err){}
})

app.post("/quotes/", (req, res) => {
    console.log(req.body)
    res.json(req.body)
})