import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
//For nice debug - import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('<Blog/>', () => {
  const blog = {
    url: 'www.gary.com',
    likes: 7,
    title: 'Test title',
    author: 'Sam',
    user: {
      username: 'Sam123',
      name: 'Sam',
    }
  }
  const user = {
    username: 'Sam123',
    name: 'Sam',
    token: 'testtoken'
  }
  const handleLike = jest.fn()
  const handleDelete = jest.fn()
  let component

  beforeEach(() => {
    component = render(
      <Blog
        blog={blog}
        handleLike={handleLike}
        handleDelete={handleDelete}
        user={user} />
    )
  })

  test('content renders', () => {
    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.author)
    expect(component.container).not.toHaveTextContent(blog.url)
    expect(component.container).not.toHaveTextContent(blog.likes)
  })

  test('show hide works', () => {
    const showToggle = component.getByText('View')
    fireEvent.click(showToggle)
    expect(component.container).toHaveTextContent(blog.url)
    expect(component.container).toHaveTextContent(blog.likes)

    const hideToggle = component.getByText('Cancel')
    fireEvent.click(hideToggle)
    expect(component.container).not.toHaveTextContent(blog.url)
    expect(component.container).not.toHaveTextContent(blog.likes)
  })

  test('clicking like triggers likes', () => {
    const showToggle = component.getByText('View')
    fireEvent.click(showToggle)
    const like = component.getByText('Like')
    fireEvent.click(like)
    fireEvent.click(like)
    expect(handleLike.mock.calls).toHaveLength(2)
  })
})
