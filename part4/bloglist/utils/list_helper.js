const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((prev, cur) => prev + cur.likes, 0)
}

const favoriteBlog = (blogs) => {
  const result = blogs.reduce((prev, cur) => (
    cur.likes > prev.likes) ? cur : prev, 
    blogs[0])
  return (({ title, author, likes }) => ({ title, author, likes }))(result);
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}