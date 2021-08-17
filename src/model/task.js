const mongoose = require('mongoose')
const validator = require('validator')
const moment = require('moment-timezone')
const { Timestamp } = require('mongodb')
const dateIndia = moment.tz(Date.now(), "Asia/Kolkata")
//moment().tz("Asia/Kolkata").format()
console.log(dateIndia)

const taskschema = new mongoose.Schema({
    description:{
        type: String,
        required : true, 
        trim: true
    },
    status:{
        type: String,
        default: 'incomplete'
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
},{timestamps: { currentTime: () => dateIndia }})


const Task = mongoose.model('Task',taskschema)
module.exports = Task