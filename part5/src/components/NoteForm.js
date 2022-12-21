/* eslint-disable no-empty */
import { useState } from 'react'

const NoteForm=({ createBlog }) => {
  const [title,setTitle]=useState('')
  const [author,setAuthor]=useState('')
  const [url,setUrl]=useState('')
  const [likes,setLikes]=useState('')


  const handleCreateBlog=async(event) => {
    event.preventDefault()
    const newBlog={
      author:author,
      title:title,
      url:url,
      likes:parseInt(likes)
    }

    try {
      createBlog(newBlog)
      // const response=await blogService.create(newBlog)
      //console.log(response);
      setAuthor('')
      setTitle('')
      setUrl('')
      setLikes('')


    } catch (error) {}
  }
  return(
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreateBlog} >
        <div>title <input id='one' type={'text'} value={title} name={'title'} onChange={({ target }) => setTitle(target.value)} placeholder='title input'/></div>
        <div>author <input id='two' type={'text'} value={author} name={'author'} onChange={({ target }) => setAuthor(target.value)}/></div>
        <div>url <input id='three' type={'text'} value={url} name={'url'} onChange={({ target }) => setUrl(target.value)}/></div>
        <div>likes <input id='four' type={'text'} value={likes} name={'likes'} onChange={({ target }) => setLikes(target.value)}/></div>
        <button id='create-button' type="submit">create</button>
      </form>
    </div>
  )
}
export default NoteForm
