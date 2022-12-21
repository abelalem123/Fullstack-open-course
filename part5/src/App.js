import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Toggleable from './components/Toggleable'
import NoteForm from './components/NoteForm'

const Notification=({ message }) => {
  if(message==null){
    return null
  }
  return (
    <div className='notification'>
      {message}
    </div>
  )
}


const Error=({ message }) => {
  if(message==null){
    return null
  }
  return (
    <div className='error'>
      {message}
    </div>
  )
}


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')
  const [user,setUser]=useState(null)

  const [notification,setNotification]=useState(null)
  const [error, setError]=useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedinuser=window.localStorage.getItem('loggedUser')
    if(loggedinuser){
      const user=JSON.parse(loggedinuser)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])
  const updateBlog=(id) => {
    const newBlogs= blogs.filter((blog) => blog.id!==id)
    setBlogs(newBlogs)
  }


  const handlelogout=() => {
    setUser(null)
    window.localStorage.removeItem('loggedUser')
  }

  const addBlogForm=() => (
    <Toggleable  buttonLabel='create new blog'>
      <NoteForm createBlog={addBlog}/>
    </Toggleable>
  )

  const updateLikes=(id) => {
    const newLike=blogs.map((blog) => {
      if(blog.id===id){
        return { ...blog,'likes':blog.likes+1 }
      }
      else return blog
    })
    setBlogs(newLike)
  }


  const addBlog=async(blogObject) => {
    const blog= await blogService.create(blogObject)
    setNotification(`a new blog ${blog.title} by ${blog.author}`)
    setTimeout(() => setNotification(null),5000)
    setBlogs(blogs.concat(blog))
  }

  const handlelogin=async(event) => {
    event.preventDefault()
    try {
      const user=await loginService.login({ username,password })
      window.localStorage.setItem('loggedUser',JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setError('wrong username or password')
      setTimeout(() => setError(null),5000)
    }

  }
  const sortBlog=() => {
    {blogs.sort(function(a, b){return b.likes - a.likes})}
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        {error&& <Error message={error}/>}
        <form onSubmit={handlelogin}>
          <div>
      username
            <input type={'text'} value={username} name={'username'} onChange={({ target }) => setUsername(target.value)}/>
          </div>
          <div>
      password
            <input type={'password'} value={password} name={'password'} onChange={({ target }) => setPassword(target.value)}/>
          </div>
          <button id='login-button' type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      {notification && <Notification message={notification}/>}
      <h4>{user.name } logged in <button onClick={handlelogout}>logout</button></h4>
      {addBlogForm()}
      {sortBlog()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} updateBlog={updateBlog} updateLikes={updateLikes}/>
      )}
    </div>
  )
}

export default App
