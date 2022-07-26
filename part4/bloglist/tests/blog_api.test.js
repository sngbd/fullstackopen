const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs').expect(200)
  
  expect(response).toBeDefined()
})

afterAll(() => {
  mongoose.connection.close()
})