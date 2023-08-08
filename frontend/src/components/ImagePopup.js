import React from "react";

function ImagePopup({isOpen, selectedCard, onClose}) {
    return(
        <div className={`popup ${isOpen && selectedCard.src !== undefined ? 'popup-open' : ''}`}>
            <div className="popup__container-photo">
                <figure className="popup__figure">
                    <img src={selectedCard.src} alt={selectedCard.alt} className="popup__photo"/>
                    <figcaption className="popup__photo-text">{selectedCard.alt}</figcaption>
                </figure>
                <button type="button" className="popup-close" onClick={onClose}/>
            </div>
        </div>
    )
}

export default ImagePopup;