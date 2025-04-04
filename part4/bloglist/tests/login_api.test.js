const { describe, test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})
  await api
    .post('/api/users')
    .send(helper.userCredentials)
    .expect(201)
    .expect('Content-Type', /application\/json/)
})
describe('Login API', () => {
  test('Login with valid credentials', async () => {
    const credentials = {
      username: helper.userCredentials.username,
      password: helper.userCredentials.password,
    }
    const response = await api
      .post('/api/login')
      .send(credentials)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const { name, username, token } = response.body

    assert(token)
    assert(name, helper.userCredentials.name)
    assert.deepEqual(username, helper.userCredentials.username)
  })

  test('Login with invalid credentials', async () => {
    const credentials = {
      username: 'invalidUser',
      password: 'invalidPassword',
    }

    const response = await api
      .post('/api/login')
      .send(credentials)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    assert.deepEqual(response.body, { error: 'invalid username or password' })
  })
})


after(async () => {
  await mongoose.connection.close()
})