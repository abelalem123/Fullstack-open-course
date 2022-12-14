const blogRouters =require('express').Router()
const Blog=require('../model/blog')
const User = require('../model/users')
const jwt=require('jsonwebtoken')

const getTokenFrom=request => {
  const authorization=request.get('authorization')
  if(authorization&&authorization.toLowerCase().startsWith('bearer')){
    return authorization.substring(7)
  }
  return null
}

blogRouters.get('/',async(request,response)=>{
   const blogs=await Blog.find({}).populate('user',{username:1,name:1})
   response.json(blogs)
})   

blogRouters.post('/',async (request,response)=>{
   
  const token=getTokenFrom(request)
   const decodeToken=jwt.verify(token,process.env.SECRET)
   if(!decodeToken.id){
    return response.status(401).json({ error:'token missing or invalid' })
  }
    const body=request.body
    console.log(decodeToken.id);
    const user= await User.findById(decodeToken.id)
    const blog=Blog({
        title:body.title,
        author:body.author,
        url:body.url,
        likes:body.likes,
        user:user._id
    })
    if(blog.title||blog.url){
        const result= await blog.save()
        user.blogs=user.blogs.concat(result._id)
        await user.save()
            response.status(201).json(result)
    }
    else {
        response.status(400).end()
    }
   
})

blogRouters.delete('/:id',async(request,response)=>{
  const token=getTokenFrom(request)
  const decodeToken=jwt.verify(token,process.env.SECRET)
  if(!decodeToken.id){
   return response.status(401).json({ error:'token missing or invalid' })
 }
  const blog=await Blog.findById(request.params.id)
  if(blog.user._id.toString()===decodeToken.id.toString()){

    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }

})

blogRouters.put('/:id',async(request,response)=>{
    const body=request.body
    const blog={
        title:body.title,
        author:body.author,
        url:body.url,
        likes:body.likes
    }
    const updatedBlog=await Blog.findByIdAndUpdate(request.params.id,blog,{new:true})
    response.json(updatedBlog)
})
module.exports=blogRouters