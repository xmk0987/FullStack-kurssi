import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from '../components/Blog'

test('renders blog', async () => {
  const blog = {
    title: 'test title',
    author: 'test author'
  }

  const { container } = render(<Blog blog={blog} />)

  expect(container).toHaveTextContent('test title')
  expect(container).toHaveTextContent('test author')

})