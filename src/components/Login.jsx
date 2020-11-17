import React from 'react'
import AuthForm from './AuthForm'


const Login = ({handleLogin}) => {
  return (
      <div className="popup__container_auth">
        <AuthForm handleLogin={handleLogin} />
      </div>
  )
}

export default Login
