import {useEffect, useState, useContext} from 'react';
import PopupWithForm from './PopupWithForm';

import {CurrentUserContext} from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        if (currentUser.name !== undefined){
            setName(currentUser.name);
        }
        if (currentUser.about !== undefined){
            setDescription(currentUser.about);
        }        
    }, [currentUser, props.isOpen]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
          name,
          about: description,
        });
    }
    
    return(        
        <PopupWithForm 
            isOpen={props.isOpen}
            onClose={props.onClose}
            title = 'Редактировать профиль'
            name = 'editor'
            buttonText = 'Сохранить'
            onSubmit = {handleSubmit}
        >
            <label className="popup__field">
                <input id="form-editor-name" value={name} onChange={handleChangeName} type="text" placeholder="Имя" className="popup__text popup__text_type_name" required minLength="2" maxLength="40"/>
                <span className="popup__input-error form-editor-name-error" ></span>
            </label>
            <label className="popup__field">
              <input id="form-editor-about" value={description} onChange={handleChangeDescription} type="text" placeholder="Работа" className="popup__text popup__text_type_job" required minLength="2" maxLength="40"/>
              <span className="popup__input-error form-editor-about-error" ></span>
            </label>
        </PopupWithForm>
    )
}

export default EditProfilePopup;