const express = require('express')
require('./db/mongoose')
const userrouter = require('./routers/user')
const taskrouter = require('./routers/task')

//const { findByIdAndDelete } = require('./model/user')


const app = express()
const port = process.env.PORT 

/*app.use((req, res, next)=>{
      if(req.method){
         res.status(503).send('maintenance')
      }else{
          next()
      }
})*/
app.use(express.json())
app.use(userrouter)
app.use(taskrouter)

app.listen(port, ()=>{
    console.log('server is up on port'+ port)
})
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

/*const myFunction =  async() =>{
   const token =  jwt.sign({ _id:'abc123' }, 'iloveice-cream')
   console.log(token)
   const data = jwt.verify(token, 'iloveice-cream')
   console.log(data)
}

myFunction()*/
const Task = require('./model/task')
const User = require('./model/user')
/*const main = async()=>{
    /*const task = await Task.findById('6117dc9df9c3db34581d58d2')
    await task.populate('owner').execPopulate()
    console.log(task.owner)

    const user = await User.findById('6117d3851fa282636c6036c3')
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)
}
main()*/