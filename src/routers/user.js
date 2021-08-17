const express = require('express')
const router = new express.Router()
const User = require('../model/user')
const auth = require('../middleware/auth')
const {sendwelcomeemail}= require('../emails/account')
const {sendcancelemail} = require('../emails/account')

router.post('/users', async (req,res) =>{
    const newuser = new User(req.body)
  try{
     await newuser.save()
     sendwelcomeemail(newuser.email, newuser.name)
     const token = await newuser.generateAuthToken()
     res.status(201).send({newuser, token})
  }catch(e){
    res.status(400).send(e)
    console.log(e)}
   
 })
 router.post('/users/login', async (req,res) =>{
     try{
         const user = await User.findbycredentials(req.body.email, req.body.password)
         const token = await user.generateAuthToken()
         res.send({ user, token})
     }
     catch(e){
         res.status(400).send('Username or password is incorrect    '+ e)
     }
 })
 
 router.post('/users/logout', auth, async(req,res)=>{
   try{
       req.user.tokens = req.user.tokens.filter((token)=>{
           return token.token !== req.token
       })
       await req.user.save()
       res.send('You have successfully logged out!')
   }
   catch(e){
       res.status(500).send(e)
   }
 })
 router.post('/users/logoutAll', auth, async(req, res)=>{
    try{ 
     req.user.tokens= []
     await req.user.save()
     res.send()}
     catch(e){
         res.status(500).send(e)
     }
 })
 router.get('/users/me',auth, async (req, res)=>{
     res.send(req.user)
 })
 
 router.patch('/users/me',auth, async(req,res) =>{
    const updates = Object.keys(req.body)
    const allowedupdates = ['name', 'email', 'password','age']
    const isvalidoperation = updates.every((update)=> allowedupdates.includes(update))
  if(!isvalidoperation){
      return res.status(400).send({error:'invalid updates!'})
  }
     try{const user = req.user 
        updates.forEach((update)=> user[update]= req.body[update])
        
        await  user.save()
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
     
        if(!user){
         return res.status(404).send()}
         res.send(user)}
     catch(e){
         res.status(400).send(e)
     }
 }) 
 router.delete('/users/me',auth, async (req, res)=>{
     try{
         await req.user.remove()
         sendcancelemail(req.user.email, req.user.name)
         res.send(req.user)}
     catch(e){
         res.status(500).send()
         console.log(e)
     }
 }) 
module.exports = router