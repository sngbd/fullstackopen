const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'How I do my computing',
    author: 'Richard Stallman',
    url: 'https://stallman.org/stallman-computing.html',
    likes: 87
  },
  {
    title: 'The Roots of Lisp',
    author: 'Paul Graham',
    url: 'http://www.paulgraham.com/rootsoflisp.html',
    likes: 100
  }
]

const newBlog = {
  title: 'wubbalubadubdub',
  author: 'rick',
  url: 'https://nevergonnagiveyouup.com'
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, newBlog, blogsInDb
}