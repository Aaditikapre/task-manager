
const{MongoClient, ObjectID}= require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databasename = 'task-manager'
MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client)=>{
    if(error){
       return  console.log('unable to connect to database')
    }
    const db = client.db(databasename)
    /*db.collection('users').insertOne({
        name: 'aaditi',
        age: 18
    },(error,result)=>{
        if(error){
            return console.log('unable to insert user')
        }
          console.log(result.ops)
    })*/
    /*db.collection('tasks').insertMany([{
        description:'log diary',
        status:'incomplete'
    },{
        description:'have dinner',
        status:'incomplete'
    },{description:'do something cool in vacation',
    status:'incomplete'
}],(error,result)=>{
        if(error){
            return console.log('unable to insert user')
        }
          console.log(result.ops)})*/
 db.collection('tasks').deleteOne({
      _id : new ObjectID("61115b54fece14828407147c")
 }).then((result)=>{
     console.log(result)
 }).catch((error)=>{
     console.log(error)
 })
})