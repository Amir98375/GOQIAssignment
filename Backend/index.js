const  express =  require("express")
const { status } = require("express/lib/response")
const mongoose = require("mongoose")
const connect= require('./src/config/db')
const cors = require('cors');
const Todo=require('./src/config/models/todo.model')

const todoController=require('./src/config/controller/todo.controller')

// const usersController = require('./controllers/user.controller')
// const studentsController= require('./controllers/students.controller')
// const evaluationController=require('./controllers/evaluation.controller')
// const submissionController=require('./controllers/submission.controller')
// const batchController=require('./controllers/batch.controller')

const app = express()

app.use(cors())
app.use(express.json())

app.use("/todos",todoController)
// app.use("/users",usersController)
// app.use("/evaluations",evaluationController)
// app.use("/students",studentsController)
// app.use("/submissions",submissionController)


 
app.listen(5000,()=>{
    connect()
    console.log("port listening 5000")
})