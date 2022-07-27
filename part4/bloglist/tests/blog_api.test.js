const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

let authorization
beforeEach(async () => {
  const newUser = {
    username: 'anon',
    name: 'anon',
    password: 'anon'
  }

  await api
    .post('/api/users')
    .send(newUser)
  
  const result = await api
    .post('/api/login')
    .send(newUser)
  
  authorization = { Authorization: `bearer ${result.body.token}` }

  await Blog.deleteMany({})
  for (i in helper.initialBlogs) {
    await api
      .post('/api/blogs')
      .send(helper.initialBlogs[i])
      .set(authorization)
  }
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
      .set(authorization)
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
      .set(authorization)
      .send(helper.newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const response = await api.get('/api/blogs').expect(200)
    expect(response.body[2].likes).toBe(0)
  })

  test('400 bad request if title and url properties missing', async () => {
    await api
      .post('/api/blogs')
      .set(authorization)
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
      .set(authorization)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(b => b.title)

    expect(titles).not.toContain(blogtoDelete.title)
   })
})

describe('update of a blog', () => {
  test('succeeds with status code 200 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogtoUpdate = blogsAtStart[0]

    await api
      .put(`/api/blogs/${blogtoUpdate.id}`)
      .send(helper.blogUpdate)
      .expect(200)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length
    )
    
    expect(blogsAtEnd[0].likes).toBe(helper.blogUpdate.likes)
   })
})

describe('unauthorized request', () => {
  test('adding a blog fails with status code 401 when a token is not provided', async () => {
    await api
      .post('/api/blogs')
      .send(helper.newBlog)
      .expect(401)
  })
})

afterAll(() => {
  mongoose.connection.close()
})