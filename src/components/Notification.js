import React from 'react'

const Notification = ({ message }) => {
  const success = { borderColor: 'green', color: 'green' }

  if(message === null) {
    return null
  } else {
    return <div
      className='error'
      style={message.type === 'error' ? undefined : success} >
        {message.text}
      </div>
  }
}

export default Notification
