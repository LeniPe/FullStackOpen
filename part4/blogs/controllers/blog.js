const blogsRouter = require('express').Router()
const logger = require('../utils/logger')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  logger.info(body)
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })

  try {
    const result = await blog.save()
    response.status(201).json(result)
  } catch (error) {
    logger.error(error.message)
    response.status(400).json({ error: error.message })
  }


})

module.exports = blogsRouter