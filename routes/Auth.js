
const express = require('express');
const Router = express.Router();
const User=require ("../schemas/UsersSchema")
const { body, validationResult } = require('express-validator');
Router.route("/createUser")
// checking the values are correct or not
 .post(body('email').isEmail(), body('password').isLength({ min: 6 }) ,body("name").isLength({ min: 6 }),
 async (req,res)=>{
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let user = await User.findOne({email:req.body.email})
    if (user){ return res.status(400).json({"error":"provide some unique value"})}
     
      
    
     user =  User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })
    res.json(user)
    
    

   
    
   

    
    

})
   
module.exports=Router