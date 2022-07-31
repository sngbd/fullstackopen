import { useState } from 'react'
import blogService from '../services/blogs'
import Togglable from "./Togglable"

const Blog = ({blog, user, setBlogs}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  const [likes, setLikes] = useState(blog.likes)
  
  const updateLikes = () => {
    const newBlog = {
      ...blog,
      likes: likes + 1
    }
    blogService.update(blog.id, newBlog)
    setLikes(likes + 1)
  }
  
  const deleteBlog = () => {
    const msg = `Remove blog ${blog.title} by ${blog.author}`
    if (window.confirm(msg)) {
      const config = {
        headers: { Authorization: `bearer ${user.token}` }
      }
      blogService.remove(blog.id, config)
      blogService.getAll().then(blogs =>
        setBlogs(blogs.sort((a, b) => b.likes - a.likes))
    )
    }
  }

    return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} 
        <Togglable buttonLabel='view' toggleLabel='hide'>
          {blog.url} 
          <br />
          likes {likes} <button onClick={updateLikes}>like</button> 
          <br />
          {blog.user.name} 
          <br />
          {blog.user.name === user.name &&
          <button onClick={deleteBlog}>remove</button>}
        </Togglable>
      </div>  
    </div>
  )
}

export default Blog