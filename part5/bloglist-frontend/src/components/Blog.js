import { useState } from 'react'
import blogService from '../services/blogs'
import Togglable from "./Togglable"

const Blog = ({blog}) => {
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
      likes: blog.likes + 1
    }
    blogService.update(blog.id, newBlog)
    setLikes(likes + 1)
  }

    return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} 
        <Togglable buttonLabel='view' toggleLabel='hide'>
          {blog.url} 
          <br />
          likes {likes} <button onClick={updateLikes}>likes</button> 
          <br />
          {blog.user.name} 
          <br />
        </Togglable>
      </div>  
    </div>
  )
}

export default Blog