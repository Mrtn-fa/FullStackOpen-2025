import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'


test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const mockOnSubmit = vi.fn()
  const user = userEvent.setup()

  const expectedTitle = 'Title'
  const expectedAuthor = 'Author'
  const expectedURL = 'URL'

  const { container } = render(<BlogForm onSubmit={mockOnSubmit} />)

  const titleInput = container.querySelector('input[name=title]')
  const authorInput = container.querySelector('input[name=author]')
  const urlInput = container.querySelector('input[name=url]')

  const submitButton = container.querySelector('button[type=submit]')

  await user.type(titleInput, expectedTitle)
  await user.type(authorInput, expectedAuthor)
  await user.type(urlInput, expectedURL)

  await user.click(submitButton)

  expect(mockOnSubmit.mock.calls).toHaveLength(1)
  expect(mockOnSubmit.mock.calls[0][0].title).toBe(expectedTitle)
  expect(mockOnSubmit.mock.calls[0][0].author).toBe(expectedAuthor)
  expect(mockOnSubmit.mock.calls[0][0].url).toBe(expectedURL)
})