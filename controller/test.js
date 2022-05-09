const express = require('express')
const router = express.Router()
const Test = require('../models/test')
const { ObjectId } = require("mongodb")

exports.get = async(req,res) => {
        console.log("AAAAAAAA")
        Test.find().then((data)=>{
            res.json(data)
        }).catch((err)=>{res.json([])})
}

exports.create = async(req,res) => {
        const payload = req.body
        const result = new Test(payload)
        res.json({
            status: 201,
            result: "Posted!",
            data: result
        })
        await result.save()
        res.status(201).end()
}

exports.get_by_name = async(req,res)=>{
        const { name } = req.params
        Test.find({"name": name}).then((data)=>{
            res.json(data)
        }).catch((err)=>{res.json([])})
}

exports.get_by_id = async(req,res)=>{
        const { id } = req.params
        Test.findOne({"_id": ObjectId(id)}).then((data)=>{
            res.json(data)
        }).catch((err)=>{res.json([])})
}

exports.update = async(req,res)=>{
        const payload = req.body
        const { id } = req.params
        const result = await Test.findByIdAndUpdate(id,{$set: payload})
        res.json(result)
}

exports.delete = async(req,res)=>{
        const { id } = req.params
        const result = await Test.findByIdAndDelete(id)
        res.json(result)
}