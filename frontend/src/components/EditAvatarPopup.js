import {useEffect, useRef} from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {

    const avatarRef = useRef();

    useEffect(() => {
        avatarRef.current.value = '';
    }, [props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();    
        props.onUpdateAvatar({
            link: avatarRef.current.value
        });
    }
    
    return(
        <PopupWithForm
            title = 'Обновить аватар'
            name = 'edit-avatar'
            buttonText = 'Сохранить'
            isOpen = {props.isOpen}
            onClose = {props.onClose}
            onSubmit={handleSubmit}
          >
            <label className="popup__field">
                <input ref={avatarRef} id="form-new-avatar" type="url" placeholder="Ссылка на картинку" className="popup__text popup__text_type_new-avatar" required/>
                <span className="popup__input-error form-new-avatar-error" ></span>
            </label>
          </PopupWithForm>
    )
}

export default EditAvatarPopup;