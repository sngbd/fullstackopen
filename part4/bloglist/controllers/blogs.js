const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findById('62e0a0c48b1da968407ca091')

  if (!body.title || !body.url) {
    return response.status(400).json({
      error: 'title or url is missing'
    })
  }
  
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id
  })
  
  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()
  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findByIdAndDelete(request.params.id)
  if (blog) {
    response.status(204).end()
  }
  else {
    response.status(404).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body

  const blog = await Blog.findByIdAndUpdate(request.params.id,
     { title, author, url, likes },
     { new: true, runValidators: true, context: 'query' })

  response.json(blog)
})

module.exports = blogsRouter