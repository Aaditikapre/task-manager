const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')
const userschema = new mongoose.Schema( {
    name:{
        type: String,
        required : true
    },email:{
        type: String,
        required: true,
        lowercase: true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('email invalid')
            }
        }
    },password:{
        type: String,
        trim: true,
        required: true,
        minLength: 7,
        validate(value){
            if(value =='password'){
                throw new Error('password cannot be "password"')
            }
        }

    },tokens:[{
        token:{
            type: String,
            required:true
        }
    }],
    age:{
        type: Number,
        required: true,
        validate(value){
            if(value<0){
                throw new Error('age must be positive')
            }
        }
    }
})
userschema.virtual('tasks', {
    ref: 'Task',
    localField:'_id',
    foreignField: 'owner'
})
userschema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    
    return userObject

}

userschema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_key)
    user.tokens = user.tokens.concat({token})
    await user.save()
    
    return token
}

userschema.statics.findbycredentials = async (email, password)=>{
    const user = await User.findOne({email})
    if(!user){
        throw new Error("This email doesn't exist")
    }
    const ismatch = await bcrypt.compare(password, user.password)
    if(!ismatch){
        throw new Error('Username or password is incorrect')
    }
    return user
}
//hashing plain text password before saving
userschema.pre('save',async function(next){
  const user = this
  if(user.isModified('password')){
      user.password = await bcrypt.hash(user.password,8)
      
  }

  next()
})
//delete user tasks when user is removed
userschema.pre('remove', async function(next){
    const user = this 
    Task.deleteMany({owner: user._id})
    next()
})
const User = mongoose.model('User',userschema)

module.exports = User