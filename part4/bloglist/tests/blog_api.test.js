const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const blogsRouter = require('../controllers/blogs')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)

  test('unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs').expect(200)
    
    response.body.forEach(res => expect(res.id).toBeDefined())
  })
})

describe('addition of a new blog', () => {
  test('a valid blogs can be added', async () => {
    await api
      .post('/api/blogs')
      .send(helper.newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    
    const title = blogsAtEnd.map(n => n.title)
    expect(title).toContain(
      'wubbalubadubdub'
    )
  })

  test('likes property default to 0 if it is missing.', async () => {
    await api
      .post('/api/blogs')
      .send(helper.newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const response = await api.get('/api/blogs').expect(200)
    expect(response.body[2].likes).toBe(0)
  })

  test('400 bad request if title and url properties missing', async () => {
    await api
      .post('/api/blogs')
      .send(helper.missingTitleUrl)
      .expect(400)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogtoDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogtoDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(b => b.title)

    expect(titles).not.toContain(blogtoDelete.title)
   })
})

afterAll(() => {
  mongoose.connection.close()
})