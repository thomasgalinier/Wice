import CardMyEvenements from "../../components/Card/CardMyEvenements";
import CardProfil from "../../components/Card/CardProfil";
import { useAuth } from "../../context/AuthContext";
import './user.css'
function User() {
    const {user} = useAuth()
    
    return (
        <section className="user-container">
            <CardProfil iconSrc={user?.iconurl} email={user?.email} firstName={user?.firstname} lastName={user?.lastname}/>
            <CardMyEvenements />
        </section>
    );
}

export default User;