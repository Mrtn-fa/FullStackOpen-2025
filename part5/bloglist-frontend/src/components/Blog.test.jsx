import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

test('renders content', () => {
  const user = {
    'username': 'username'
  }

  const expectedTitle = 'Blog Test'
  const expectedAuthor = 'Author Test'
  const expectedURL = 'https://example.com'
  const expectedLikes = 0

  const blog = {
    user: user,
    title: expectedTitle,
    author: expectedAuthor,
    url: expectedURL,
    likes: expectedLikes
  }

  render(<Blog blog={blog} user={user} />)

  const title = screen.queryByText(expectedTitle)
  const author = screen.queryByText(expectedAuthor)
  const url = screen.queryByText(expectedURL)
  const likes = screen.queryByText(expectedLikes)

  expect(title).toBeDefined()
  expect(author).toBeDefined()
  expect(url).toBeNull()
  expect(likes).toBeNull()
})

test('renders full blog info when show button is clicked', () => {
  const user_data = {
    'username': 'username'
  }

  const expectedTitle = 'Blog Test'
  const expectedAuthor = 'Author Test'
  const expectedURL = 'https://example.com'
  const expectedLikes = 0

  const blog = {
    user: user_data,
    title: expectedTitle,
    author: expectedAuthor,
    url: expectedURL,
    likes: expectedLikes
  }

  render(<Blog blog={blog} user={user_data} />)


  const user = userEvent.setup()
  const button = screen.getByText('show')
  user.click(button)

  const title = screen.queryByText(expectedTitle)
  const author = screen.queryByText(expectedAuthor)
  const url = screen.queryByText(expectedURL)
  const likes = screen.queryByText(expectedLikes)

  expect(title).toBeDefined()
  expect(author).toBeDefined()
  expect(url).toBeDefined()
  expect(likes).toBeDefined()
})

test('check like a blog twice', async () => {
  const user_data = {
    'username': 'username'
  }

  const expectedTitle = 'Blog Test'
  const expectedAuthor = 'Author Test'
  const expectedURL = 'https://example.com'
  const expectedLikes = 0

  const blog = {
    user: user_data,
    title: expectedTitle,
    author: expectedAuthor,
    url: expectedURL,
    likes: expectedLikes
  }

  const onLikeMockHandler = vi.fn()
  render(<Blog blog={blog} user={user_data} onLike={onLikeMockHandler} />)

  const user = userEvent.setup()
  const showButton = screen.getByText('show')
  await user.click(showButton)
  const likeButton = screen.getByText('like')

  await user.click(likeButton)
  await user.click(likeButton)

  expect(onLikeMockHandler.mock.calls).toHaveLength(2)



})