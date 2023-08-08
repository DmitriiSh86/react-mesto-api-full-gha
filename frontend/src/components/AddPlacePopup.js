import {useEffect, useState} from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    useEffect(() => {
        setName('');
        setLink('');
      }, [props.isOpen]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        props.onAddPlace({
          name,
          link
        });
    } 
    
    return(
        <PopupWithForm
            title = 'Новое место'
            name = 'add-card'
            buttonText = 'Создать'
            isOpen = {props.isOpen}
            onClose = {props.onClose}
            onSubmit = {handleSubmit}
          >
            <label className="popup__field">
                <input id="form-card-name" value={name} onChange={handleChangeName} type="text" placeholder="Название" className="popup__text popup__text_type_card-name" required minLength="2" maxLength="30"/>
                <span className="popup__input-error form-card-name-error" ></span>
            </label>
            <label className="popup__field">
                <input id="form-card-link" value={link} onChange={handleChangeLink} type="url" placeholder="Ссылка на картинку" className="popup__text popup__text_type_card-link" required/>
                <span className="popup__input-error form-card-link-error" ></span>
            </label>
          </PopupWithForm>
    )
}

export default AddPlacePopup;