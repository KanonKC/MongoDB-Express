const bodyParser = require("body-parser")
const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://admin:admin@127.0.0.1:27017/dxh?authSource=dxh&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false'
const express = require("express")
const router = express.Router()
const { ObjectId } = require("mongodb")
const app = express()
const mongoose = require('mongoose')
const Test = require('./models/test')
const test = require('./routers/test')

app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/dxh', { useNewUrlParser: true })

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

app.use('/test',test)

// app.get('/test', async(req,res) => {
//     Test.find().then((data)=>{
//         res.json(data)
//     }).catch((err)=>{res.json([])})
// })

// app.get('/test/:id',async(req,res)=>{
//     const { id } = req.params
//     Test.findOne({"_id": ObjectId(id)}).then((data)=>{
//         res.json(data)
//     }).catch((err)=>{res.json([])})
// })

// app.get('/test/search/:name',async(req,res)=>{
//     const { name } = req.params
//     Test.find({"name": name}).then((data)=>{
//         res.json(data)
//     }).catch((err)=>{res.json([])})
// })

// app.post('/test', async(req,res) => {
//     const payload = req.body
//     const result = new Test(payload)
//     res.json({
//         status: 201,
//         result: "Posted!",
//         data: result
//     })
//     await result.save()
//     res.status(201).end()
// })

// app.put("/test/:id", async(req,res)=>{
//     const payload = req.body
//     const { id } = req.params
//     const result = await Test.findByIdAndUpdate(id,{$set: payload})
//     res.json(result)
// })

// app.delete("/test/:id",async(req,res)=>{
//     const { id } = req.params
//     const result = await Test.findByIdAndDelete(id)
//     res.json(result)
// })