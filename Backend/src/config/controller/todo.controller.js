const  express =  require("express")
const Todo=require('../models/todo.model')

const router =express.Router()

router.get("",async(req,res)=>{
    const batch = await Todo.find().lean().exec()
    return res.status(200).send(batch)
   
  })


router.post("",async(req,res)=>{
    debugger
    console.log(req,'request my')
  const todo=await Todo.create(req.body)
  return res.status(200).send({message:'Data Added Successfully'
,flag:1})
})


router.patch("/:id",async(req,res)=>{
     const batch= await Todo.findByIdAndUpdate(req.params.id,req.body,{new:true})
     return res.status(200).send(batch)
  })


  router.delete("/:id",async(req,res)=>{
      const batch = await Todo.findByIdAndDelete(req.params.id)
      return res.status(200).send(batch)
  })


module.exports=router;