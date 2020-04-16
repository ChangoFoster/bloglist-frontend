import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleDelete, user }) => {

  const [toggle, setToggle] = useState(false)

  const deleteBlog = (event) => {
    event.preventDefault()
    const result = window.confirm(`Are you sure you want to delete ${blog.title}`)
    result && handleDelete(blog)
  }

  const updateBlog = (event) => {
    event.preventDefault()
    const updateBlog = blog
    updateBlog.likes = blog.likes + 1
    handleLike(blog.id, updateBlog)
  }

  const show = () => <button className="blog-show-button" onClick={() => setToggle(true)}>View</button>

  const deleteButton = () => <button className="blog-delete-button" onClick={deleteBlog}>Delete post</button>

  const details = () => {
    return (
      <div className="blog-details">
        <div className="blog-url">URL: {blog.url}</div>
        <div className="blog-likes">
          Likes: <span className="blog-like">{blog.likes}</span>
          <button className="blog-like-button" onClick={updateBlog}>Like</button>
        </div>
        <div className="blog-name">Name: {blog.user.name}</div>
        {user !== null && user.username === blog.user.username && deleteButton() }
        <button className=".blog-hide-button" onClick={() => setToggle(false)}>Cancel</button>
      </div>
    )
  }

  return (
    <div className="blog-wrapper">
      <div className="blog-title-wrapper">
        <h4 className="blog-title">{blog.title} {blog.author}</h4>
        {!toggle && show()}
      </div>
      {toggle && details()}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog
