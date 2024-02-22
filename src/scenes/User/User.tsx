import { useEffect, useState } from "react";
import CardMyEvenements from "../../components/Card/CardMyEvenements";
import CardProfil from "../../components/Card/CardProfil";
import { useAuth } from "../../context/AuthContext";
import './user.css'
import Cookies from "js-cookie";
import CardEvents from "../../components/Card/CardEvents";

function User() {
    const [eventCreated, setEventCreated] = useState([])
    const [allEvent, setAllEvent] = useState([])
    const { user } = useAuth()
    const jwtToken = Cookies.get('jwt_token');
    console.log(eventCreated);

    useEffect(() => {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwtToken}`
            },
        };
        fetch('http://localhost:3000/event/created', requestOptions)
            .then((response) => response.json())
            .then((data) => setEventCreated(data))
            .catch((error) => console.error(error))

        fetch('http://localhost:3000/event', requestOptions)
            .then((response) => response.json())
            .then((data) => setAllEvent(data))
            .catch((error) => console.error(error))
    }, [])
    

    return (
        <>
            <section className="user-container">
                <div className="card-container card-profil">
                    <CardProfil iconSrc={user?.iconurl} email={user?.email} firstName={user?.firstname} lastName={user?.lastname} />
                </div>
                <div className="card-container card-my-evenements">
                    <CardMyEvenements events={eventCreated} />
                </div>
            </section>
            <section className="user-container">
                <div className="card-container card-all-evenements">
                    <CardEvents events={allEvent} />
                </div>
            </section>
        </>
    );
}

export default User;
