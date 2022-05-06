const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TestSchema = new Schema({
    name: String,
    number: Number,
})

const TestModel = mongoose.model("test",TestSchema)

module.exports = TestModel