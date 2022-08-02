import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
          title:<input id='title-input' value={newTitle} onChange={handleTitleChange} />
        <br />
          author:<input id='author-input' value={newAuthor} onChange={handleAuthorChange} />
        <br />
          url:<input id='url-input' value={newUrl} onChange={handleUrlChange} />
        <br />
        <button id='create-button' type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm