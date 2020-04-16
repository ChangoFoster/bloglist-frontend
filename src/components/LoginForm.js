import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  handleLogin,
  username,
  handleUsernameChange,
  password,
  handlePasswordChange
}) => (
  <div>
    <h2>Login</h2>
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor='username'>
          Username:
          <input
            id='username'
            name='Username'
            onChange={handleUsernameChange}
            type='text'
            value={username} />
        </label>
      </div>
      <div>
        <label htmlFor='password'>
          Password:
          <input
            id='password'
            name='Password'
            onChange={handlePasswordChange}
            type='password'
            value={password} />
        </label>
      </div>
      <div>Debug: {username} {password}</div>
      <button id="login-button" type='submit'>Login</button>
    </form>
  </div>
)

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
}

export default LoginForm
