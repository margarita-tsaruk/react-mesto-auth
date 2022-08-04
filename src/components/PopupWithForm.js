function PopupWithForm(props) {

  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_visible'}`}>
      <div className={`popup__content popup__content_${props.type}`}>
        <button 
          className="popup__close-button" 
          type="button"
          onClick={props.onClose}
        >
        </button>
        <h3 className={`popup__title popup__title_${props.type}`}>{props.title}</h3>
        <form  
          className={`popup__form popup__form_${props.type}`}
          name={`${props.name}-form`} 
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button 
            type="submit" 
            className={`popup__button popup__button_${props.type} ${!props.isDisabled ? 'popup__button_disabled' : ''}`}
            disabled={!props.isDisabled}
          >{`${props.button}`}
          </button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;