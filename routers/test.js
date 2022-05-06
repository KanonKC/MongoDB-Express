const express = require('express')
const router = express.Router()
const Test = require('../models/test')

router.route('/')
    .get(async(req,res) => {
        console.log("AAAAAAAA")
        Test.find().then((data)=>{
            res.json(data)
        }).catch((err)=>{res.json([])})
    })
    .post(async(req,res) => {
        const payload = req.body
        const result = new Test(payload)
        res.json({
            status: 201,
            result: "Posted!",
            data: result
        })
        await result.save()
        res.status(201).end()
    })

router.route('/:id')
    .get(async(req,res)=>{
        const { id } = req.params
        Test.findOne({"_id": ObjectId(id)}).then((data)=>{
            res.json(data)
        }).catch((err)=>{res.json([])})
    })
    .put(async(req,res)=>{
        const payload = req.body
        const { id } = req.params
        const result = await Test.findByIdAndUpdate(id,{$set: payload})
        res.json(result)
    })
    .delete(async(req,res)=>{
        const { id } = req.params
        const result = await Test.findByIdAndDelete(id)
        res.json(result)
    })

router.route('/search/:name')
    .get(async(req,res)=>{
        const { name } = req.params
        Test.find({"name": name}).then((data)=>{
            res.json(data)
        }).catch((err)=>{res.json([])})
    })

module.exports = router
/////////////////////////////////////////

// router.get('/test', async(req,res) => {
//     console.log("AAAAAAAA")
//     Test.find().then((data)=>{
//         res.json(data)
//     }).catch((err)=>{res.json([])})
// })

// router.get('/test/:id',async(req,res)=>{
//     const { id } = req.params
//     Test.findOne({"_id": ObjectId(id)}).then((data)=>{
//         res.json(data)
//     }).catch((err)=>{res.json([])})
// })

// router.get('/test/search/:name',async(req,res)=>{
//     const { name } = req.params
//     Test.find({"name": name}).then((data)=>{
//         res.json(data)
//     }).catch((err)=>{res.json([])})
// })

// router.post('/test', async(req,res) => {
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

// router.put("/test/:id", async(req,res)=>{
//     const payload = req.body
//     const { id } = req.params
//     const result = await Test.findByIdAndUpdate(id,{$set: payload})
//     res.json(result)
// })

// router.delete("/test/:id",async(req,res)=>{
//     const { id } = req.params
//     const result = await Test.findByIdAndDelete(id)
//     res.json(result)
// })