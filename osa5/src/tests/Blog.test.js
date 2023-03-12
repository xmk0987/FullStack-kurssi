import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'


test('renders blog title and author', async () => {
  const blog = {
    title: 'test title',
    author: 'test author'
  }

  const { container } = render(<Blog blog={blog} />)

  expect(container).toHaveTextContent('test title')
  expect(container).toHaveTextContent('test author')

})

test('like button pressed twice', async () => {
  const blog = {
    title: 'test title',
    author: 'test author',
    likes: 0,
    url: 'test url',
    user: {
      name: 'test user'
    }
  }

  const mockHandler = jest.fn()

  render(<Blog blog={blog} handleLike={mockHandler}/>)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)
  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})


