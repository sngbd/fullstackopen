const jwt = require('jsonwebtoken')

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }
  next()
}

const userExtractor = (request, response, next) => {
  try {
    request.user = jwt.verify(request.token, process.env.SECRET)
  }
  catch {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  next()
}

module.exports = {
  tokenExtractor, userExtractor
}