import { useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { Route, Switch, useHistory } from 'react-router-dom';

import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ConfirmationPopup from './ConfirmationPopup.js';
import api from '../utils/api.js';
import Register from './Register.js';
import Login from './Login.js';
import ProtectedRoute from './ProtectedRoute.js';
import InfoTooltip from './InfoTooltip.js';
import auth from '../utils/auth.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isСonfirmationPopupOpen, setIsСonfirmationPopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isImagePopupOpen || isСonfirmationPopupOpen

  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const history = useHistory();
  
  useEffect(() => {
    api.getData()
      .then(([userData, cardsData]) => {
        setCurrentUser(userData)
        setCards(cardsData)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleTrashButtonClick(card) {
    setSelectedCard(card);
    setIsСonfirmationPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleInfoTooltip() {
    setIsInfoTooltipPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsСonfirmationPopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
  }

  useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if(isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen]) 

  function handleUpdateUser(value) {
    api.setUserInfo(value.name, value.about)
      .then((res) => {
        setCurrentUser(prevState => {
          return {
            ...prevState,
            name: res.name,
            about: res.about,
          }
        })
        
        closeAllPopups();

      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleUpdateAvatar(inputValue) {
    api.setUserAvatar(inputValue.avatar)
      .then((res) => {
        setCurrentUser(prevState => {
          return {
            ...prevState,
            avatar: res.avatar
          }
        })
        
        closeAllPopups();

      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    api.changeLikeCardStatus(card, !isLiked) 
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleCardDelete(card) {
    api.deleteCard(card)
      .then(() => {
        closeAllPopups()
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleAddPlace(card) {
    api.addCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }
  
  function handleRegistration(userData) {
    auth.register(userData)
      .then((userData) => {
        setIsSignedUp(true);
        handleInfoTooltip();
        history.push('/sign-in');
      },
        (err) => {
          console.log(err);
          setIsSignedUp(false);
          handleInfoTooltip();
        }
      )
  }

  function handleCheckToken() {
    const jwt = localStorage.getItem('jwt');
    auth.getToken(jwt)
      .then((data) => {
          setUserEmail(data.data.email);
          setIsSignedIn(true);
          history.push('/');
      })
      .catch((err) => {
        console.log(err);
      })
  } 

  function handleAuthorization(userData) {
    auth.authorize(userData)
      .then((userData) => {
        localStorage.setItem('jwt', userData.token);
        setIsSignedIn(true);
        handleCheckToken();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleSignOut() {
    setIsSignedIn(false);
    localStorage.removeItem('jwt');
    history.push('/sign-in');
  }
  
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header 
         isSignedIn={isSignedIn}
         userEmail={userEmail}
         onSignOut={handleSignOut}
        />
        <Switch>  
          <Route path="/sign-up">
            <div className="auth">
              <Register 
                onSignedUp={handleRegistration}
              />
            </div>
          </Route>
          <Route path="/sign-in">
            <div className="auth">
              <Login 
                onSignedIn={handleAuthorization}
              />
            </div>
          </Route>
          <ProtectedRoute
            exact path="/"
            isSignedIn={isSignedIn}
            component={Main} 
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onConfirmation={handleTrashButtonClick}
            cards={cards}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          /> 
        </Switch> 
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup 
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar} 
        />
        <ImagePopup 
          isOpen={isImagePopupOpen}
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <ConfirmationPopup 
          isOpen={isСonfirmationPopupOpen}
          onClose={closeAllPopups}
          card={selectedCard}
          setSelectedCard={setSelectedCard}
          onDeleteCard={handleCardDelete} 
        />
        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          isSignedUp={isSignedUp}
        />
       </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
