import union_ok from '../images/Union_ok.png';
import union_no from '../images/Union_no.png';

function InfoTooltip({isOpen, onClose, isOk}) {
    
    return(
        <div className={`popup ${isOpen ? 'popup-open' : ''}`}>
            <div className="popup__container">
                <div className='infoTooltip'>
                <img src ={isOk ? union_ok : union_no} alt="union" className="infoTooltip__union"/>
                <h3 className="infoTooltip__title">{isOk ?
                    'Вы успешно зарегистрировались!' : 
                    'Что-то пошло не так! Попробуйте ещё раз.'
                }
                </h3>
                </div>
                <button 
                    type="button" 
                    className="popup-close"
                    onClick={onClose}
                />
            </div>
        </div>
    )
}

export default InfoTooltip;