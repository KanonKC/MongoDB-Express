const bodyParser = require("body-parser")
const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://admin:admin@127.0.0.1:27017/dxh?authSource=dxh&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false'
const express = require("express")
const { ObjectId } = require("mongodb")
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

// app.get('/test', (req, res) => {
//     // console.log(req.body)
//     console.log(req.query)
//     if(!req.body.id && !req.body.name){
//         // console.log("No")
//         db.collection('test').find().toArray()
//         .then(results => {
//             res.json(results)
//         })
//         .catch(error => console.error(error))
//     }
//     else{
//         // console.log("Yes")
//         db.collection('test').find({$or: [{"_id": ObjectId(req.body.id)},{"name":req.body.name}]}).toArray()
//         .then(results => {
//             res.json(results)
//         })
//         .catch(error => console.error(error))
//     }
// })

// app.post('/test', async(req,res) => {
//     try{
//         const postData = {
//             name: req.body.name,
//             number: req.body.number
//         }
//         db.collection('test').insertOne(postData,function(err){
//             if(err){
//                 res.json({
//                     status: 401,
//                     data: null
//                 })
//             }
//             else{
//                 res.json({
//                     status: 201,
//                     data: postData
//                 })
//             }
//         })
//     }
//     catch(err){
//         res.json({
//             status: 401,
//             data: null
//         })
//     }
// })

// app.put("/test", async(req,res)=>{
//     try{
//         db.collection('test').updateOne({'_id': ObjectId(req.body.id)}/* ,{'name': req.body.name}} */, {
//             $set:{
//                 name: req.body.new_name,
//                 number: req.body.new_number
//             }
//         }).then((data)=>{
//             console.log(data)
//         })
//         res.json({
//             status: 201,
//             data: "Updated!"
//         })
//         console.log(res.statusCode)
//     }
//     catch(err){}
// })

// app.delete("/test",async(req,res)=>{
//     try{
//         db.collection('test').deleteOne({"_id": ObjectId(req.body.id)})
//         res.json({
//             status: 201,
//             data: "Deleted"
//         })
//         console.log(res.statusCode)
//     }
//     catch(err){}
// })

app.post("/quotes/", (req, res) => {
    console.log(req.body)
    res.json(req.body)
})

/////////////////////////////////////

app.get('/test', (req, res) => {
    try{
        // if(req.query.id && req.query.name){
        //     db.collection('test').find({$and: [{"_id": ObjectId(req.query.id)},{"name":req.query.name}]}).toArray()
        //     .then(results => {
        //         res.json(results)
        //     })
        //     .catch(error => console.error(error))
        // }
        if(req.query.id){
            db.collection('test').find({"_id": ObjectId(req.query.id)}).toArray()
            .then(results => {
                res.json(results)
            })
            .catch(error => console.error(error))
        }
        else if(req.query.name){
            db.collection('test').find({"name": req.query.name}).toArray()
            .then(results => {
                res.json(results)
            })
            .catch(error => console.error(error))
        }
        else{
            db.collection('test').find({"_id": ObjectId(req.body.id)}).toArray()
            .then(results => {
                res.json(results)
            })
            .catch(error => console.error(error))
        }
    }
    catch(err){
        res.json([])
    }
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
                    result: "Posted!",
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
        if(res.query.id){
            db.collection('test').updateOne({'_id': ObjectId(req.body.id)}/* ,{'name': req.body.name}} */, {
                $set:{
                    name: req.body.name,
                    number: req.body.number
                }
            }).then((data)=>{
                res.json({
                    status: 201,
                    data: "Updated!"
                })
            })
        }
    }
    catch(err){}
})

app.delete("/test",async(req,res)=>{
    try{
        db.collection('test').deleteOne({"_id": ObjectId(req.query.id)})
        res.json({
            status: 201,
            data: "Deleted"
        })
        console.log(res.statusCode)
    }
    catch(err){}
})