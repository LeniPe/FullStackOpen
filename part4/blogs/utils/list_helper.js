const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.map(blog => blog.likes)

  const totalLikes = likes.reduce(
    (totalLikes, likes) => totalLikes + likes, 0)

  return totalLikes
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return {}
  const likes = blogs.map(blog => blog.likes)
  const getMaxIndex = (maxIndex, currentValue, index) => {
    if (currentValue > likes[maxIndex]) {
      return index
    } else {
      return maxIndex
    }
  }
  const mostLikedIndex = likes.reduce(getMaxIndex, 0)
  return blogs[mostLikedIndex]
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {}

  const x = Object.groupBy(blogs, ({ author }) => author)
  const [author, authorBlogs] = Object.entries(x).reduce(
    (max, current) =>
      current[1].length > max[1].length ? current : max
  )

  return {
    author,
    blogs: authorBlogs.length
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return {}

  const counts = {}

  blogs.forEach(blog => {
    counts[blog.author] = (counts[blog.author] || 0) + blog.likes
  })

  const [author, likes] = Object.entries(counts).reduce(
    (max, current) =>
      current[1] > max[1] ? current : max
  )

  return {
    author: author,
    likes: likes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}