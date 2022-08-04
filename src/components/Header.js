import { useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import headerLogo from '../images/logo.svg'

function Header(props) {
  const [isLogged, setIsLogged] = useState(false);

  function showMenu() {
    setIsLogged(!isLogged);
  }
  
  function signOut() {
    setIsLogged(false);
    props.onSignOut();
  }
  
  return (
    <header className={!isLogged ? 'header' : 'header header__menu'}>
      <div className="header__container">
        <img className="header__logo" src={headerLogo} alt="Лого" /> 
        <button 
          className={`${!isLogged ? 'header__menu-button' : `header__menu-button header__menu-button_close`}
          ${!props.isSignedIn ? 'header__menu-button_signedout' : ''}`}
          onClick={showMenu}
        >
        </button>
      </div>
      <Switch>
        <Route path="/sign-in">
          <div className={`${props.isSignedIn ? '' : 'header__link header__link_hover'}`}>
            <nav>
              <Link
                className='header__link'
                to="/sign-up"
              >
                Регистрация
              </Link>
            </nav>
          </div>
        </Route>
        <Route path="/sign-up">
          <div className={`${props.isSignedIn ? '' : 'header__link header__link_hover'}`}>
            <nav>
              <Link
                className='header__link'
                to="/sign-in"
              >
                Войти
              </Link>
            </nav>
          </div>
        </Route>
        <Route exact path="/">
          <div className={!isLogged ? 'header__signedIn-details' : 'header__signedIn-details header__signedIn-details_show'}>
            <p className='header__email'>{props.userEmail}</p>
            <button
              className='header__sign-out-button'
              onClick={signOut}
            >
              Выйти
            </button>
          </div>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;