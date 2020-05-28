import React from 'react'

const Notification = ({ message }) => {
  const success = { borderColor: 'green', color: 'green' }

  if(message === null) {
    return null
  }

  const { text, type } = message

  return (
    <div className='error' style={type === 'error' ? undefined : success}>
      {text}
    </div>
  )
}

export default Notification
