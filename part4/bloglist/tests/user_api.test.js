const mongoose = require('mongoose')
const helper = require('./user_test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})

  const userObjects = helper.initialUsers
    .map(user => new User(user))
  const promiseArray = userObjects.map(user => user.save())
  await Promise.all(promiseArray)
})

describe('invalid users are not created', () => {
  test('username is not unique', async () => {
    const response = await api
      .post('/api/users')
      .send(helper.notUnique)
      .expect(400)

    expect(response.body.error).toBe('username must be unique')
  })

  test('username and password are missing', async () => {
    await api
      .post('/api/users')
      .send(helper.missingFields)
      .expect(400)
  })

  test('username and password are less than 3 characters long', async () => {
    await api
      .post('/api/users')
      .send(helper.invalidLength)
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})