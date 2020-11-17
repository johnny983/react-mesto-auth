import React from 'react'
import Logo from './../images/logo-mesto.svg'
import { useLocation, Link, useHistory } from "react-router-dom"
import { removeToken } from './../utils/token'

function Header(props) {

  const history = useHistory();
  const location = useLocation();

  function signOut(){
    removeToken()
    props.setLoggedIn(false)
    history.push('/signin');
  }

  return (
    <header className="header">
      <img src={Logo} alt="текстовый логотип &laquo;Mesto Russia&raquo;" className="header__logo" />
      <div className="header__auth">
        <span className="header__email">{ props.loggedIn && props.userData ? props.userData.email : null }</span>
          { props.loggedIn ?

            <Link className="header__link" onMouseDown={ signOut } to='/'>
            Выйти
            </Link> :

            <Link
              className="header__link"
              to={ location.pathname === '/signin' ? '/signup' : '/signin' }
            >{ location.pathname === '/signin' ? 'Регистрация' : 'Вход' }</Link>
          }
      </div>
    </header>
  )
}

export default Header
