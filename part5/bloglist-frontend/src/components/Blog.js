import Togglable from "./Togglable"

const Blog = ({blog}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

    return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} 
        <Togglable buttonLabel='view' toggleLabel='hide'>
          {blog.url} 
          <br />
          likes {blog.likes} <button>likes</button> 
          <br />
          {blog.user.name} 
          <br />
        </Togglable>
      </div>  
    </div>
  )
}

export default Blog