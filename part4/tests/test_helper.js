const Blog=require('../model/blog')
const User=require('../model/users')
const initialBlogs=[
    {
        title:'Titanic',
        author:'James Cameroon',
        url:'www.titanic.com',
        likes:23
    },
    {
        title:'Pirates of The caribbean',
        author:'Rob Marshall',
        url:'www.piratesofthecaribbean.com',
        likes:18
    }
]  


const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
  }

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
  }
  
module.exports={initialBlogs,blogsInDb,usersInDb}