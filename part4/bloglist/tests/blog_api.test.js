const { describe, test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

let userData

const getUserData = async () => {
  const user = await helper.setInitialData()

  const loginResponse = await api
    .post('/api/login')
    .send({ username: helper.userCredentials.username, password: helper.userCredentials.password })

  return { token: loginResponse.body.token, id: user.id }
}

beforeEach(async () => {
  userData = await getUserData()
})

describe('Test initial data', () => {
  test('Get initial test data', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('Check for id key, not _id', async () => {
    const blogs = await api.get('/api/blogs')
    assert('id' in blogs.body[0])
  })
})

describe('Test CRUD', () => {
  test('Test create blog with user token', async () => {
    const newBlog = {
      author: 'Mrtn-fa',
      title: 'Test Blog',
      url: 'https://example.com',
      likes: 2
    }
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${userData.token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    delete response.body.id
    const expected = { ...newBlog, user: userData.id }
    assert.deepStrictEqual(response.body, expected)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
  })

  test('Test create blog with invalid user token', async () => {
    const newBlog = {
      author: 'Mrtn-fa',
      title: 'Test Blog',
      url: 'https://example.com',
      likes: 2
    }
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', 'Bearer INVALID_TOKEN')
      .expect(401)
      .expect('Content-Type', /application\/json/)
    assert.strictEqual(response.body.error, 'invalid token')

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })

  test('Test create blog with no authorization header', async () => {
    const newBlog = {
      author: 'Mrtn-fa',
      title: 'Test Blog',
      url: 'https://example.com',
      likes: 2
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })

  test('Test retrieve blog', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]
    blogToView.user = blogToView.user.toString()

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.deepStrictEqual(resultBlog.body, blogToView)
  })

  test('Test retrieve unexistent blog', async () => {
    const invalidBlogId = await helper.nonExistingBlogId()
    await api
      .get(`/api/blogs/${invalidBlogId}`)
      .expect(404)
  })

  test('Test update blog with creators token', async () => {
    const initialBlogs = await helper.blogsInDb()
    const blog = initialBlogs[0]
    const newLikes = 100
    const token = userData.token

    const updatedBlog = await api
      .put(`/api/blogs/${blog.id}`)
      .send({ likes: newLikes })
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.deepEqual(updatedBlog.body.likes, newLikes)
  })

  test('Test update blog with another user token', async () => {
    const initialBlogs = await helper.blogsInDb()
    const blog = initialBlogs[0]
    const newLikes = 100

    await api
      .put(`/api/blogs/${blog.id}`)
      .send({ likes: newLikes })
      .set('Authorization', 'Bearer INVALID_TOKEN')
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })

  test('Test update blog with no authorization token', async () => {
    const initialBlogs = await helper.blogsInDb()
    const blog = initialBlogs[0]
    const newLikes = 100

    await api
      .put(`/api/blogs/${blog.id}`)
      .send({ likes: newLikes })
      .expect(401)
  })

  test('Test update inexistent blog', async () => {
    const invalidBlogId = await helper.nonExistingBlogId()
    const newLikes = 100

    await api
      .put(`/api/blogs/${invalidBlogId}`)
      .send({ likes: newLikes })
      .set('Authorization', `Bearer ${userData.token}`)
      .expect(404)
  })

  test('Test delete blog with creators token', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    const token = userData.token

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)
  })

  test('Test delete blog with invalid token', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', 'Bearer INVALID_TOKEN')
      .expect(401)
  })

  test('Test delete blog with no authorization token', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(401)
  })

  test('Test delete inexistent blog', async () => {
    const invalidBlogId = await helper.nonExistingBlogId()
    await api
      .delete(`/api/blogs/${invalidBlogId}`)
      .set('Authorization', `Bearer ${userData.token}`)
      .expect(404)
  })

})

describe('Test validation', () => {
  test('blog with no likes is added with default value 0', async () => {
    const newBlog = {
      author: 'Mrtn-fa',
      title: 'Test Blog',
      url: 'https://example.com',
    }
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${userData.token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.likes, 0)
  })

  test('blog with no title is not added', async () => {
    const newBlog = {
      author: 'Mrtn-fa',
      url: 'https://example.com',
      likes: 2
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${userData.token}`)
      .expect(400)

    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('blog with no url is not added', async () => {
    const newBlog = {
      title: 'Test Blog',
      author: 'Mrtn-fa',
      likes: 2
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${userData.token}`)
      .expect(400)

    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})

after(async () => {
  await mongoose.connection.close()
})