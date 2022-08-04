function ImagePopup(props) {
  const cardName = props.card && props.card.name;

  return (
    <div 
      className={`popup popup_open_image ${props.isOpen && 'popup_visible'}`}
    >
      <div className="popup__cover">
        <button 
          className="popup__close-button" 
          type="button"
          onClick={props.onClose}
        >
        </button>
        <figure className="popup__image-container">
        <img 
          className="popup__image"  
          alt={cardName}
          src={props.card && props.card.link}
        />
          <figcaption className="popup__caption">{cardName}</figcaption>
        </figure>
      </div>
    </div>
  )
}
  
export default ImagePopup;