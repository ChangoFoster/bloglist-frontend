import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const getBlogs = async () => {
      let blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    getBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async blogObject => {
    try {
      blogFormRef.current.toggleVisibility()
      const blog = await blogService.create(blogObject)
      setMessage({
        text: `a new blog ${blog.title} was added`,
        type: 'success'
      })
      setTimeout(() => { setMessage(null) }, 5000)
      setBlogs(blogs.concat(blog))
    } catch (exception) {
      setMessage({ text: 'Something wrong with your blog', type: 'error' })
      setTimeout(() => { setMessage(null) }, 5000)
    }
  }

  const updateBlog = async (id, blogObject) => {
    try {
      const updateBlog = await blogService.update(id, blogObject)
      setMessage({
        text: `${user.name} liked ${updateBlog.title}`,
        type: 'success'
      })
      setTimeout(() => { setMessage(null) }, 5000)
      setBlogs(blogs.map(blog => blog.id === updateBlog.id ? updateBlog : blog))
    } catch (error) {
      console.log(error)
      setMessage({ text: 'Something wrong with your blog', type: 'error' })
      setTimeout(() => { setMessage(null) }, 5000)
    }
  }

  const deleteBlog = async (blogObject) => {
    try {
      await blogService.remove(blogObject.id)
      setMessage({
        text: `${blogObject.title} was successfully removed`,
        type: 'success'
      })
      setTimeout(() => { setMessage(null) }, 5000)
      setBlogs(blogs.filter(blog => blog.id !== blogObject.id))
    } catch (error) {
      setMessage({
        text: 'Something went wrong deleting your blog',
        type: 'error'
      })
      setTimeout(() => { setMessage(null) }, 5000)
    }
  }

  const handleLoginSubmit = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password, })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage({ text: `${user.name} logged in`, type: 'success' })
      setTimeout(() => { setMessage(null) }, 5000)
    } catch (exception) {
      setMessage({ text: 'Wrong username or password', type: 'error' })
      setTimeout(() => { setMessage(null) }, 5000)
    }
  }

  const logout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const loginForm = () =>
    <Togglable buttonLabel='Login'>
      <LoginForm
        handleLogin={handleLoginSubmit}
        username={username}
        handleUsernameChange={({target}) => setUsername(target.value)}
        password={password}
        handlePasswordChange={({target}) => setPassword(target.value)} />
    </Togglable>

  const blogFormRef = React.createRef()

  const blogForm = () =>
    <Togglable buttonLabel='New blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>

  const userInfo = () => (
    <div>
      <p>
        {user.name} logged in
        <button className="logout-button" onClick={event => logout(event)}>
          Log out
        </button>
      </p>
    </div>
  )

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={message} />
      { user !== null && userInfo() }
      { user === null ? loginForm() : blogForm() }
      <h2>blogs</h2>
      <div className="blog-list">
        { blogs
          .sort((prev, curr) => curr.likes - prev.likes)
          .map(blog => <Blog
            key={blog.id}
            blog={blog}
            handleLike={updateBlog}
            handleDelete={deleteBlog}
            user={user} />)}
        </div>
    </div>
  )
}

export default App
