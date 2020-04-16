import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [author, setAuthor] = useState('')
  const [likes, setLikes] = useState(0)
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({ author, likes, title, url })
    setAuthor('')
    setLikes(0)
    setTitle('')
    setUrl('')
  }

  return (
    <div>
      <h2>Add a blog</h2>
      <form onSubmit={addBlog}>
        <div>
          <label htmlFor='author'>
            Author:
            <input
              id='author'
              name='Author'
              onChange={({target}) => setAuthor(target.value)}
              type='text'
              value={author} />
          </label>
        </div>
        <div>
          <label htmlFor='likes'>
            Likes:
            <input
              id='likes'
              name='Likes'
              onChange={({target}) => setLikes(target.value)}
              type='number'
              value={likes} />
          </label>
        </div>
        <div>
          <label htmlFor='title'>
            Title:
            <input
              id='title'
              name='Title'
              onChange={({target}) => setTitle(target.value)}
              type='text'
              value={title} />
          </label>
        </div>
        <div>
          <label htmlFor='url'>
            URL:
            <input
              id='url'
              name='Url'
              onChange={({target}) => setUrl(target.value)}
              type='text'
              value={url} />
          </label>
        </div>
        <button id="new-blog-button" type='submit'>Add blog</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm
