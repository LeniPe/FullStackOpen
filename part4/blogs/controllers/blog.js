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

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  try {
    await Blog.findByIdAndDelete(id)
    response.status(204).end()
  } catch (error) {
    logger.error(error.message)
    response.status(400).json({ error: error.message })
  }
})

blogsRouter.patch('/:id', async (request, response) => {
  const { title, url, likes, author } = request.body
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).end()
  }

  if (title !== undefined) blog.title = title
  if (url !== undefined) blog.url = url
  if (likes !== undefined) blog.likes = likes
  if (author !== undefined) blog.author = author

  try {
    const updatedBlog = await blog.save()
    response.json(updatedBlog)
  } catch (error) {
    logger.error(error.message)
    response.status(400).json( { error: error.message })
  }
})

module.exports = blogsRouter