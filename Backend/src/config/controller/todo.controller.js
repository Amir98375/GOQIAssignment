const  express =  require("express")
const Todo=require('../models/todo.model')

const router =express.Router()

router.get("",async(req,res)=>{
    const batch = await Todo.find().lean().exec()
    return res.status(200).send(batch)
   
  })


router.post("",async(req,res)=>{
    debugger
    try {
      const todo = await Todo.create(req.body);
       
      return res.status(200).send({ message: 'Data Added Successfully', flag: 1 });
    } catch (error) {

      console.error(error);
      return res.status(500).send({ message: 'Internal Server Error', flag: 0 });
    }
})


router.patch("/:id",async(req,res)=>{
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!todo) {
     
      return res.status(404).send({ message: 'Todo not found', flag: 0 });
    }

    return res.status(200).send({ message: 'Data Modified Successfully', flag: 1 });
  } catch (error) {
    
    console.error(error);
    return res.status(500).send({ message: 'Internal Server Error', flag: 0 });
  }
  })


  router.delete("/:id",async(req,res)=>{
    try {
      const todo = await Todo.findByIdAndDelete(req.params.id);
      if (!todo) {
       
        return res.status(404).send({ message: 'Todo not found', flag: 0 });
      }
  
      return res.status(200).send({ message: 'Data Deleted Successfully', flag: 1 });
    } catch (error) {
   
      return res.status(500).send({ message: 'Internal Server Error', flag: 0 });
    }
  })


module.exports=router;