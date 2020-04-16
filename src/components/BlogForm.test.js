import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
//For nice debug - import { prettyDOM } from '@testing-library/dom'
import BlogForm from './BlogForm'

describe('<BlogForm/>', () => {

  const createBlog = jest.fn()
  let component

  beforeEach(() => {
    component = render(<BlogForm createBlog={createBlog} />)
  })

  test('content renders', () => {
    expect(component.container).toHaveTextContent('Add a blog')
  })

  test('inputs update', () => {
    const testAuthor = 'Sam'
    const author = component.container.querySelector('#author')
    const form = component.container.querySelector('form')

    fireEvent.change(author, {
      target: { value: testAuthor }
    })
    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].author).toBe(testAuthor)
  })
})
