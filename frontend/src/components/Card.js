import {useContext} from 'react';

import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Card(props) {
    const currentUser = useContext(CurrentUserContext);
    const isOwn = props.card.owner === currentUser._id;
    const isLiked = props.card.likes.some(i => i === currentUser._id);
    const cardLikeButtonClassName = ( 
        `elements__like ${isLiked && 'elements__like_type_activ'}`
    );

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }
    
    return(
        <li className="elements__element">
            <img className="elements__photo"
            alt={props.card.name} 
            src={props.card.link}
            onClick={props.handleCardClick}
            />
            <div className="elements__bar">
                <h2 className="elements__title">{props.card.name}</h2>
                <div className="elements__like-box">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                    <span className="elements__like-number">{props.card.likes.length}</span>
                </div>          
            </div>
            {isOwn && <button type="button" className="elements__trash" onClick={handleDeleteClick} />}
        </li>
    )
}

export default Card;