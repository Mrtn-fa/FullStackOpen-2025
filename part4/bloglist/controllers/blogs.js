const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const user = request.user
  if (!user) {
    response.status(401).end()
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user.id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const user = request.user
  if (!user) {
    response.status(401).end()
  }

  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    response.status(404).end()
  }
  const blogUserId = blog.user.toString()
  if (blogUserId !== user.id) {
    return response.status(401).end()
  }

  blog.likes = body.likes || blog.likes
  const updatedBlog = await blog.save()
  response.json(updatedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const user = request.user
  if (!user) {
    response.status(401).end()
  }

  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    response.status(404).end()
  }
  const blogUserId = blog.user.toString()
  if (blogUserId !== user.id) {
    return response.status(401).end()
  }
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})


module.exports = blogsRouter