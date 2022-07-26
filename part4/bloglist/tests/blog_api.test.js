const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs').expect(200)
  
  expect(response).toBeDefined()
})

test('a valid blogs can be added', async () => {
  const newBlog = {
    title: 'wubbalubadubdub',
    author: 'rick',
    url: 'https://nevergonnagiveyouup.com',
    likes: 6969
  }
  
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  
  const title = blogsAtEnd.map(n => n.title)
  expect(title).toContain(
    'wubbalubadubdub'
  )
})

afterAll(() => {
  mongoose.connection.close()
})