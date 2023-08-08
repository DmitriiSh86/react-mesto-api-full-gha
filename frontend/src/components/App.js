import React from "react";
import {useEffect, useState} from 'react';
import {useNavigate, Route, Routes} from 'react-router-dom'
import Header from './Header.js'
import Footer from './Footer.js'
import Main from './Main.js'
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import InfoTooltip from './InfoTooltip.js';
import api from '../utils/Api';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import Register from './Register.js'
import Login from './Login.js'
import { ProtectedRoute } from './ProtectedRoute.js';
import {getContent} from './AuthApi'

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false)
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false)
    const [isOk, setIsOk] = useState(false)

    const [selectedCard, setSelectedCard] = useState({alt: '', src: ''})

    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);

    function handleEditProfileClick(){
    setIsEditProfilePopupOpen(true)
    }

    function handleAddPlaceClick(){
      setIsAddPlacePopupOpen(true)
    }

    function handleEditAvatarClick(){
      setIsEditAvatarPopupOpen(true)
    }

    function handleTooltipClick(){
      setIsInfoTooltipOpen(true)
    }    
    
    function closeAllPopups(){
      setIsEditProfilePopupOpen(false)
      setIsAddPlacePopupOpen(false)
      setIsEditAvatarPopupOpen(false)
      setIsImagePopupOpen(false)
      setSelectedCard({alt: '', src: ''})
    }    
    
    function handleCardClick(evt){
      setSelectedCard({alt: evt.target.alt, src: evt.target.src})
      setIsImagePopupOpen(true)
    }    

    function handleCardLike(card) {
      const isLiked = card.likes.some(i => i === currentUser._id);
      api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => { 
        setCards((state) => state.map((c) => c._id === card._id ? newCard.data : c));
      })
      .catch(err => console.log(`Ошибка.....: ${err}`))
    }

    function handleCardDelete(card) {
      api.deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((elem) => elem._id !== card._id);
        setCards(newCards);
      })
      .catch(err => console.log(`Ошибка.....: ${err}`))
    }

    function handleUpdateUser(name, about) {
      api.editUserProfile(name, about)
      .then((result) => {
        setCurrentUser(result.data);
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка.....: ${err}`))
    }

    function handleUpdateAvatar({link}) {
      api.changeAvatar(link)
      .then((result) => {
        setCurrentUser(result.data);
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка.....: ${err}`))
    }

    function handleAddPlaceSubmit({name, link}) {
      api.addNewCard(name, link)
      .then((newCard) => {
        setCards([newCard.data, ...cards])
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка.....: ${err}`))
    }

    function closeTooltip(){
      setIsInfoTooltipOpen(false)
      if (isOk === true) {
        navigate('/sign-in')
      }
    }

    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const navigate = useNavigate();

    useEffect(() => {
      if (isLoggedIn){
        Promise.all([api.getUserInfo(), api.getCards()])
        .then(([userData, initialCards]) => {
          setCurrentUser(userData.data);
          setCards(initialCards.data);
        })
        .catch(err => console.log(`Ошибка.....: ${err}`))
      }
      
    },[isLoggedIn]);

    const checkToken = () => {
      getContent()
      .then(({data}) => {
        if (!data){
          return
        }        
        setIsLoggedIn(true);
        navigate('/')
      })
      .catch((error) => {
        console.log(error.message);
        setIsLoggedIn(false);
      })
    }

    React.useEffect(() => {
      checkToken();
      // eslint-disable-next-line
    }, [])

    return (
      <div className="app">
        <CurrentUserContext.Provider value={currentUser}>
          <Routes>
            <Route path="/" element={
              <>
                <Header email={email}/>
                <ProtectedRoute element={Main}
                  isLoggedIn = {isLoggedIn}
                  handleEditAvatarClick = {handleEditAvatarClick}
                  handleEditProfileClick = {handleEditProfileClick}
                  handleAddPlaceClick = {handleAddPlaceClick}
                  handleCardClick = {handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
                <Footer />
              </>
            }/>
            <Route path="/sign-up" element={
              <>
                <Header />                
                <Register handleTooltipClick={handleTooltipClick} setIsOk={setIsOk}/>
              </>
            }/>
            <Route path="/sign-in" element={
              <>
                <Header />
                <Login handleLogin={setIsLoggedIn} handleTooltipClick={handleTooltipClick} setIsOk={setIsOk} setCurrentUser={setCurrentUser} setEmail= {setEmail}/>
              </>
            }/>
            
          </Routes>  

            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser = {handleUpdateUser}/>

            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace = {handleAddPlaceSubmit}/>

            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar = {handleUpdateAvatar} />

            <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeTooltip} isOk={isOk} />

            <PopupWithForm
              title = 'Вы уверены?'
              name = 'delete'
              buttonText = 'Да'
              onClose = {closeAllPopups}
              >
            </PopupWithForm>

            <ImagePopup 
              isOpen = {isImagePopupOpen}
              onClose = {closeAllPopups}
              selectedCard = {selectedCard}
            />          
          
        </CurrentUserContext.Provider>
      </div>
    );
}

export default App;
