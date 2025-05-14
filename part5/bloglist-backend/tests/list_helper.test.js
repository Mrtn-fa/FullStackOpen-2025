const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('List Helper', () => {
  test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
  })
})
describe('total likes', () => {


  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listHelper.listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('test many blogs', () => {
    const result = listHelper.totalLikes(listHelper.listWithManyBlogs)
    assert.strictEqual(result, 36)
  })
})

describe('Test favorite blog', () => {
  test('test no blogs', () => {
    const result = listHelper.mostBlogs([])
    const expected = {}
    assert.deepStrictEqual(result, expected)
  })

  test('test single blog', () => {
    const result = listHelper.mostBlogs(listHelper.listWithOneBlog)
    const expected = {
      author: 'Edsger W. Dijkstra',
      blogs: 1
    }
    assert.deepStrictEqual(result, expected)
  })

  test('test many blogs', () => {
    const result = listHelper.mostBlogs(listHelper.listWithManyBlogs)
    const expected = {
      author: 'Robert C. Martin',
      blogs: 3
    }
    assert.deepStrictEqual(result, expected)
  })

})

describe('Test most likes', () => {
  test('Test no blog', () => {
    const result = listHelper.mostLikes([])
    const expected = {}
    assert.deepStrictEqual(result, expected)
  })

  test('Test single blog', () => {
    const result = listHelper.mostLikes(listHelper.listWithOneBlog)
    const expected = {
      author: 'Edsger W. Dijkstra',
      likes: 5
    }
    assert.deepStrictEqual(result, expected)
  })

  test('Test many blogs', () => {
    const result = listHelper.mostLikes(listHelper.listWithManyBlogs)
    const expected = {
      author: 'Edsger W. Dijkstra',
      likes: 17
    }
    assert.deepStrictEqual(result, expected)
  })
})