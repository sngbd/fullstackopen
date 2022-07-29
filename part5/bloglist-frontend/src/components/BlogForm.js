const BlogForm = ({ 
  onSubmit, 
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  newTitle,
  newAuthor,
  newUrl
}) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <h2>create new</h2>
        title:<input value={newTitle} onChange={handleTitleChange} />
        <br />
        author:<input value={newAuthor} onChange={handleAuthorChange} />
        <br />
        url:<input value={newUrl} onChange={handleUrlChange} />
        <br />
        <button type="submit">create</button>
      </form>  
    </div>
  )
}

export default BlogForm