import {useContext} from 'react';
import edit from '../images/edit.svg';
import plus from '../images/plus.svg';
import Card from './Card.js'

import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Main(props) {
    const currentUser = useContext(CurrentUserContext);
    return(
        <main>
            <section className="profile">
                <button className="profile__avatar-box"
                type="button"
                onClick={props.handleEditAvatarClick}>
                    <img src={currentUser.avatar} alt="Пользователь" className="profile__avatar"/>
                </button>        
                <div className="profile__info">
                    <div className="profile__title-edit">
                        <h1 className="profile__title">{currentUser.name}</h1>
                        <button className="profile__edit-button" type="button" onClick={props.handleEditProfileClick}>
                            <img src={edit} alt="Редактирование" className="profile__edit"/>
                        </button>
                    </div>
                    <p className="profile__subtitle">{currentUser.about}</p>
                </div>
                <button className="profile__add-button" type="button"  onClick={props.handleAddPlaceClick}>
                    <img src={plus} alt="Плюс" className="profile__plus"/>
                </button>
            </section>
            <ul className="elements" aria-label="photo">
                {props.cards.map((card) => <Card key={card._id} card = {card} handleCardClick={props.handleCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete}/>)}
            </ul>
        </main>
    )
}

export default Main;