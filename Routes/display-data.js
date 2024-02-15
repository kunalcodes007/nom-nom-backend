const express=require('express');
const router=express.Router();
 
router.post('/food-data',(req,res)=>{
    try{
           res.send([global.food_category_item,global.food_category]);
    }
    catch(err){
        console.log(err);
        res.send("server error")
    }
})

module.exports=router;