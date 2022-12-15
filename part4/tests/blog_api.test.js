const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const Blog = require('../model/blog')
const api = supertest(app)
const helper = require('./test_helper')

jest.setTimeout(800000);

beforeEach(async () => {
   await Blog.deleteMany({})
   const blogObjects=helper.initialBlogs.map((blog)=>new Blog(blog))
   const promiseArray=blogObjects.map((blog)=>blog.save())
 await  Promise.all(promiseArray)
})

test('blogs as a result of Json', async () => {
   await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
}, 200000)

test('check id exist', async () => {
   const response = await api.get('/api/blogs')
   response.body.forEach((blog) => expect(blog.id).toBeDefined())
}, 200000)
test('create new blog', async () => {
   const newBlog = {
      title: 'new title',
      author: 'Abel Alem',
      url: 'abelalem.com',

      likes: '5'
   }
   await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/)
   const totalBlogs = await helper.blogsInDb()
   const titles=totalBlogs.map((blog)=>blog.title)
   expect(totalBlogs).toHaveLength(helper.initialBlogs.length + 1)
   expect(titles).toContain('new title')
  
})
test('check if likes property is missing',async()=>{
   const newBlog = {
      title: 'new title2',
      author: 'Abel Aldem',
      url: 'abelaldem.com'
   }
  const blog= await api.post('/api/blogs').send(newBlog)
  expect(blog.body.likes).not.toBeDefined()
})
test('check if title or url is not defined',async()=>{
   const newBlog={
      author:'It is me',
      likes:6
   }
   const blog=await api.post('/api/blogs').send(newBlog).expect(400)
   const blogsAtEnd=await helper.blogsInDb()
   expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
 } )
test('delete a post', async()=>{
   const blogs=await helper.blogsInDb()
   const blogToDelete=blogs[0]
   console.log(blogs[0].id);
   await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)
  const blogss=await helper.blogsInDb()
   //expect(blogss).toHaveLength(helper.initialBlogs.length-1)
},100000)

test('update a post', async()=>{
   const blogs=await helper.blogsInDb()
   const blogToupdate=blogs[0]
   const blog={
      title:blogToupdate.title,
      author:blogToupdate.author,
      url:blogToupdate.url,
      likes:88
   }
   await api.put(`/api/blogs/${blogToupdate.id}`).send(blog).expect(200)
})

test.only('check adding blog without token',async()=>{
   const users=await helper.usersInDb()
   const user=users[0]
   const newBlog={
      "title":"fullstacsdasdfasfdfk",
      "author":"haile",
      "url":"namalesdfmyahu.com",
      "likes":3464,
      "userId":user.id.toString()
   }
   await api.post('/api/blogs').send(newBlog).expect(500)
})

afterAll(() => {
   mongoose.connection.close()
})