import React from "react";

function PopupWithForm({isOpen, onClose, name, title, buttonText, children, onSubmit}) {
    return(
        <div className={`popup popup_type_${name} ${isOpen ? 'popup-open' : ''}`}>
            <div className="popup__container">
                <form name={`form_${name}`} className="popup__form" onSubmit={onSubmit}>
                    <h3 className="popup__title">{title}</h3>
                    <div className="popup__input">
                        {children}
                        <button className="popup__button" type="submit">{buttonText}</button>
                    </div>
                </form>
                <button 
                    type="button" 
                    className="popup-close"
                    onClick={onClose}
                />
            </div>
        </div>
    )
}

export default PopupWithForm;