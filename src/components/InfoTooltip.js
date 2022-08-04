import LoggedIn from '../images/LoggedIn.svg';
import NotLoggedIn from '../images/NotLoggedIn.svg';

function InfoTooltip(props) {
    
  return (
		<div className={`popup popup_type_info ${props.isOpen && 'popup_visible'}`}>
      <div className={`popup__content popup__content_info`}>
        <button 
          className="popup__close-button" 
          type="button"
          onClick={props.onClose}
        >
        </button>
        <img
          className="popup__registration-image"
          src={props.isSignedUp ? LoggedIn : NotLoggedIn}
          alt={props.isSignedUp ? 'Registration success' : 'Registration fail'}
        />
        <h3 
				  className="popup__title popup__title_info">
						{props.isSignedUp ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
				</h3>
			</div>
    </div>
  )
}
  
export default InfoTooltip;
  