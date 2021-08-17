const mongoose = require('mongoose')
const validator = require('validator')
const { db } = require('../model/task')
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser:true,
    useCreateIndex: true

})



