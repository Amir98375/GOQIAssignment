const mongoose = require("mongoose")

const todoSchema= new mongoose.Schema({
    

    name:{type:String,required:true},
    password:{type:String,required:true},
    email:{type:String,required:true},
    dob:{type:String,required:true}
    

},
{
    timestamps:true,
    versionKey:false
}
)


const Todo = new mongoose.model("todos",todoSchema)

module.exports=Todo;