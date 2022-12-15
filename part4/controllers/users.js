const usersRouter=require('express').Router();
const User=require('../model/users')
const bycrypt=require('bcrypt');

usersRouter.get('/',async(request,response)=>{
    const users=await User.find({}).populate('blogs',{url:1,title:1,author:1})
    response.json(users)
})

usersRouter.post('/',async(request,response)=>{

const {username,name,password}=request.body

const existingUser= await User.findOne({username})
if(password.length<3){
    return response.status(400).json({
        error:'password too small'
    })
}
if(existingUser){
    return response.status(400).json({
        error:'username must be unique '
    })
}
const saltRound=10
const passwordHash=await bycrypt.hash(password,saltRound)
const user=User({
    username,name,passwordHash
})
const savedUser=await user.save()
response.status(201).json(savedUser)
})
module.exports=usersRouter