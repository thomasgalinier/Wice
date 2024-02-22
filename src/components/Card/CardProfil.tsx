import { useNavigate } from 'react-router-dom';
import './Card.css'
import Cookies from 'js-cookie';
type Props = {
    iconSrc: string | undefined
    email: string | undefined
    firstName: string | undefined
    lastName: string | undefined
}
function CardProfil({ iconSrc, email, firstName, lastName }: Props) {
    const navigate = useNavigate()
    const handleDisconnected = () => {
        Cookies.remove('jwt_token')
        navigate('/')
    }
    return (
        <div className="cardprofil-container card-contain">
            <img src={iconSrc} alt="icon-logo" />
            <p><strong>{firstName} {lastName}</strong></p>
            <p>{email}</p>
            <div className='button-card-container'>
            <button className='primary'>Changer de mot de passe</button>
            <button className='third' onClick={handleDisconnected}>Se déconnectez</button>
            </div>
        </div>
    );
}

export default CardProfil;