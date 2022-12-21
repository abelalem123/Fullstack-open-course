/* eslint-disable no-restricted-globals */
import { useRef } from 'react'
import Toggleable from './Toggleable'
import blogService from '../services/blogs'
const Blog = ({ blog,user,updateBlog,updateLikes }) => {

  const toggleRef=useRef()
  const blogStyle={
    paddingTop:10,
    paddingLeft:2,
    border:'solid',
    borderWidth:1,
    marginBottom:5
  }
  const newBlog={
    title:blog.title,
    author:blog.author,
    url:blog.url,
    likes:blog.likes+1
  }
  const handleLike=async() => {
    await blogService.update(blog.id,newBlog)
    updateLikes(blog.id)

  }
  // const handleRemove=async() => {
  //   const response= await blogService.remove(blog.id)
  //   updateBlog(blog.id)
  //   console.log(response)
  // }
  // const alertDialog=() => {
  //   if(confirm(`Remove a blog ${blog.title} by ${blog.author}`)===true){
  //     handleRemove()
  //   }
  // }
  return((
    <div style={blogStyle} className='blog'>
      {blog.title}
      <Toggleable buttonLabel='view' ref={toggleRef}>
        <div>{blog.author}</div>
        <div>{blog.url}</div>
        <div>{blog.likes} <button onClick={handleLike}>like </button></div>
        {/* <div  style={{ display:user.name===blog.user.name?'':'none', }}>
          <button onClick={alertDialog}>remove</button>
        </div> */}
      </Toggleable>
    </div>
  )
  )
}
export default Blog