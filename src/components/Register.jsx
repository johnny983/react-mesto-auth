import React from 'react'
import AuthForm from './AuthForm'

const Register = (props) => {
  return (
      <div className="popup__container_auth">
        <AuthForm onClose={props.onClose} />
      </div>
  )
}

export default Register
