import { useContext, useEffect } from 'react';
import { useForm } from '../hooks/useForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

import PopupWithForm from './PopupWithForm.js';

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const { values, setValues, handleChange, errors, isValid, resetErrors } = useForm({});

  function handleSubmit(event) {
    event.preventDefault();
    
    props.onUpdateUser({
      name: values.name,
      about: values.about,
    });
  }

  useEffect(() => {
    if(props.isOpen) {
      resetErrors();
      setValues({ name: currentUser.name, about: currentUser.about });
    }
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль" 
      button="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isDisabled={isValid}
    >
      <input
        id="name-input"
        type="text"
        name="name"
        className={`popup__input popup__input_type_name ${errors.name ? 'popup__input_type_invalid' : ''}`}
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
        value={values.name || ''}
        onChange={handleChange}
      />
      <span 
        className="popup__error popup__error_top" 
        id="name-input-error">
          {isValid ? '' : errors.name}
      </span>
      <input
        id="job-input"
        type="text"
        name="about"
        className={`popup__input popup__input_type_job ${errors.about ? 'popup__input_type_invalid' : ''}`}
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        required
        value={values.about || ''}
        onChange={handleChange}
      />
      <span 
        className="popup__error popup__error_bottom" 
        id="job-input-error">
          {isValid ? '' : errors.about}
      </span> 
    </PopupWithForm>
  )
}

export default EditProfilePopup;
