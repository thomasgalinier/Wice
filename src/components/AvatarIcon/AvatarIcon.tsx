import { Link } from "react-router-dom";
import './avatar.css'
type Props = {
    url: string
}
function AvatarIcon({url}: Props) {
    return ( 
        <Link to='/' className="avatar-container">
            <img src={url} alt="" className="avatar-icon" />
        </Link>
     );
}

export default AvatarIcon;