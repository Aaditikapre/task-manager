const express = require('express')
auth = require('../middleware/auth')
const Task = require('../model/task')
const router = new express.Router()



router.post('/tasks',auth, async (req,res) =>{
    const newtask = new Task({
        ...req.body,
        owner: req.user._id
    })
    
    try{
     await newtask.save()
    res.status(201).send(newtask)
    }catch(e){
      res.status(400).send()
    }
 })
 router.get('/tasks',auth, async (req, res)=>{
     const match = {}
     const sort ={}

     if(req.query.status){
         if(match.status = req.query.status === 'complete'){
             match.status='complete'
         }else{
            match.status ='incomplete'
         }
     }
     if(req.query.sortBy){
         const parts = req.query.sortBy.split(':')
         sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
     }

    try{
        await req.user.populate({
           path: 'tasks',
           match, 
           options:{
               limit:parseInt(req.query.limit),
               skip: parseInt(req.query.skip),
               sort
               
           }

        }).execPopulate()
        res.send(req.user.tasks)
    }catch(e){
        res.status(500).send()
    }
  })
 router.get('/tasks/:id',auth,async (req, res)=>{
    const _id= req.params.id 
    try{const task = await Task.findOne({_id, owner: req.user._id})
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(500).send(e)
        console.log(e)
    }
  })
router.patch('/tasks/:id', auth,async(req,res)=>{
    const updates = Object.keys(req.body)
   const allowedupdates = ['description', 'status']
   const isvalidoperation = updates.every((update)=> allowedupdates.includes(update))
 if(!isvalidoperation){
     return res.status(400).send({error:'invalid updates!'})
 }
    try{
        const task = await Task.findOne({_id:req.params.id,owner:req.user._id})
        
        //const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
    if(!task){
        return res.status(404).send()}
        updates.forEach((update)=> task[update]= req.body[update])
        await  task.save()
        res.send(task)}
    catch(e){
        res.status(400).send(e+'   No task by this id!')
    }
})  
router.delete('/tasks/:id', auth,async (req, res)=>{
    try{
        const user = await Task.findOneAndDelete({_id:req.params.id,owner:req.user._id})
        if(!user){
            return res.status(404).send('Task not found!')
        }
        res.send(user)}
    catch(e){
        res.status(500).send()
    }
}) 
module.exports = router
