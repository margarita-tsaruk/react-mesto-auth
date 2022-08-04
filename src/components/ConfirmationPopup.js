import { useEffect } from 'react';

import PopupWithForm from './PopupWithForm';

function ConfirmationPopup( {isOpen, onClose, card, setSelectedCard, onDeleteCard} ) {

    useEffect(() => {
        if(isOpen) {
            setSelectedCard(card)
        }
      }, [card, isOpen, setSelectedCard]);
    
    function handleSubmit(event) {
      event.preventDefault();

      onDeleteCard(card)
    }

  return (
    <PopupWithForm
      name="confirmation"
      title="Вы уверены?" 
      type="updated"
      button="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isDisabled={true}
    >
    </PopupWithForm>
  )
}

export default ConfirmationPopup;