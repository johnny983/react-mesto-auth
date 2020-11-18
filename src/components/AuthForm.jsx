import React from 'react'
import { useLocation, useHistory, Link } from 'react-router-dom'
import { apiAuth } from './../utils/apiAuth'
import { setToken } from './../utils/token'
import InfoTooltip from './InfoTooltip'


function AuthForm(props) {
  const location = useLocation();
  const history = useHistory();

  const [ regStatus, setRegStatus] = React.useState('')
  const [ errorMessage, setErrorMessage] = React.useState('')
  const [ inputData, setInputData] = React.useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setInputData((prevData) => ({
      ...inputData,
      [name]: value
    }))
  }

  const handleRegisterSubmit = (e) => {
    e.preventDefault()
      apiAuth.auth(location.pathname, 'POST', inputData)
      .then((res) => {
        if (res.statusCode !== 400)
        setErrorMessage('')
        setRegStatus('success')
      })
    .catch((err) => {
      setRegStatus('decline')
      setErrorMessage(err)
    })
  }

const handleLoginSubmit = (e) => {
    e.preventDefault();
    apiAuth.auth(location.pathname, 'POST', inputData)
    .then((data) => {
      if (data) {
        setErrorMessage('Что-то пошло не так!')
      }

      if (data.token) {
        setToken(data.token);
        setInputData({ email: '', password: ''});
        setErrorMessage('');
        props.handleLogin(data.user);
        history.push('/');
      }
    })
    .catch((err) => {
      setErrorMessage(err)
    })
  }

  return (
    <>
      <div className="inverted">
        <h2 className="popup__header">{ location.pathname === '/signup' ? 'Регистрация' : 'Вход' }</h2>
        <form
          onSubmit={ location.pathname === '/signup' ? handleRegisterSubmit : handleLoginSubmit }
          className="popup__form"
          method="post"
          action="#"
          noValidate
        >
          <input
            type="email"
            placeholder="Email"
            onChange={ handleChange }
            className="popup__input"
            minLength="2"
            maxLength="40"
            required
            name="email"
          />

          <div className="popup__input-error_active" id="email-input-error"></div>

          <input
            type="password"
            placeholder="Пароль"
            onChange={ handleChange }
            className="popup__input"
            minLength="2"
            maxLength="200"
            required
            name="password"
          />

          <div className="popup__input-error_active" id="password-input-error"></div>

          <button
            type="submit"
            className="popup__button"
          >{ location.pathname === '/signup' ? 'Регистрация' : 'Вход' }</button>

          { location.pathname === '/signup' &&
            <div className="popup__register_hint">Уже зарегистрированы? <Link className="popup__register_link" to="/signin">Войти</Link></div>
          }
          <div className="popup__input-error_active inverted" id="common-input-error">{ errorMessage }</div>
        </form>
      </div>
      <InfoTooltip
        onClose={props.onClose}
        regStatus={regStatus}
      />
    </>
  )
}

export default AuthForm
