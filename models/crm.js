const mongoose = require('mongoose')

const crmSchema = new mongoose.Schema({
    name:String,
    age:Number
})

const Crm = mongoose.model('Crm', crmSchema)

module.exports = Crm