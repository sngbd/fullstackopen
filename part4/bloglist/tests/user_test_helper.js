const User = require('../models/user')

const initialUsers = [
  {
    username: 'mluukkai',
    name: 'Matti Luukkainen',
    password: 'salainen'
  }
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const notUnique = {
  username: 'mluukkai',
  name: 'Luukkainen Matti',
  password: 'nensalai'
}

const missingFields = {
  name: 'Gilberdi',
}

const invalidLength = {
  username: 'ab',
  name: 'xyz',
  password: '12'
}

module.exports = {
  initialUsers, usersInDb, notUnique, missingFields, invalidLength
}