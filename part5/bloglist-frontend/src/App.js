import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const logout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogUser')
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    const response = await blogService.create(blogObject)
    setMessage(`a new blog ${response.title} by ${response.author} added`)
    setTimeout(() => {
      setMessage('')
    }, 5000)
    setBlogs(blogs.concat(response))
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } 
    catch (exception) {
      setIsError(true)
      setMessage('wrong username or password')
      setTimeout(() => {
        setIsError(false)
        setMessage('')
      }, 5000)
    }
  }

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }
  
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification message={message} isError={isError} />
        <form onSubmit={handleLogin}>
          <div>
            username
              <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
              <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }
    
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} isError={isError} />
      <p>{user.name} logged in<button onClick={logout}>logout</button></p>
      <form onSubmit={addBlog}>
        <h2>create new</h2>
        title:<input value={newTitle} onChange={handleTitleChange} />
        <br />
        author:<input value={newAuthor} onChange={handleAuthorChange} />
        <br />
        url:<input value={newUrl} onChange={handleUrlChange} />
        <br />
        <button type="submit">create</button>
      </form>  
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App