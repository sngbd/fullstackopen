const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((prev, cur) => prev + cur.likes, 0)
}

const favoriteBlog = (blogs) => {
  const result = blogs.reduce((prev, cur) => 
    (cur.likes > prev.likes) ? cur : prev, blogs[0])
  return (({ title, author, likes }) => ({ title, author, likes }))(result);
}

const mostBlogs = (blogs) => {
  const authors = _.countBy(blogs, (o => o.author))
  const values = Object.values(authors)
  const max = Math.max(...values)
  const topAuthor = Object.keys(authors).find(author => authors[author] === max);
  return { author: topAuthor, blogs: max}
}

const mostLikes = (blogs) => {
  const authors = _.countBy(blogs, (o => o.author))
  const keys = Object.keys(authors)
  const byAuthor = keys.map(key => blogs.filter(blog => blog.author === key))
  const likes = byAuthor.map(author => author.reduce((prev, cur) => prev + cur.likes, 0))
  const max = Math.max(...likes)
  const index = likes.indexOf(max)
  return { author: byAuthor[index][0].author, blogs: max }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}