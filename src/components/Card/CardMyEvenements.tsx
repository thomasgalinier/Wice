import { useState } from "react";
import './cardMyEvenements.css'
import Modal from "../Modal/Modal";
import dayjs from 'dayjs';
import Cookies from "js-cookie";

type Event = {
    idEvent: number;
    title: string;
    description: string;
    date: string;
    duration: string;
    createdAt: string;
    updatedAt: string;
    createdById: number;
}
type User = {
    userId: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    accesstype: string;
    iconurl: string;
    createdAt: string;
    updatedAt: string;
    eventsCreatedByUser: Event[];
}
type Props = {
    events: User
}

function formatDuration(input: string) {
    const [hours, minutes] = input.split(':');
    const formattedDuration = `${hours}h${minutes}min`;
    return formattedDuration;
}

function CardMyEvenements({ events }: Props) {
    const [showModal, setShowModal] = useState(false);
    const [startIndex, setStartIndex] = useState(0); // Indice de la première carte dans le carrousel
    const totalEvents = events.length === 0 ? null : events.eventsCreatedByUser.length;
    const jwtToken = Cookies.get('jwt_token');


    const openModal = () => {
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    const nextSlide = () => {
        setStartIndex(prevIndex => Math.min(prevIndex + 1, totalEvents - 3)); // Limitation pour éviter de dépasser le nombre total d'événements
    }

    const prevSlide = () => {
        setStartIndex(prevIndex => Math.max(prevIndex - 1, 0)); // Limitation pour éviter d'avoir un indice négatif
    }
    const onDelete = (eventId: number) => {
        const requestOptions = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwtToken}`
            },
        };
        fetch(`http://localhost:3000/event/delete/${eventId}`, requestOptions)
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error(error));

        fetch('http://localhost:3000/event', requestOptions)
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error(error))
    }
    return (
        <section className="card-contain card-myevents">
            <h2>Mes événements organisés</h2>
            <hr />
            <button className="primary" onClick={openModal}>Créer un événement</button>
            {events.length !== 0 ? (
                <div className="event-created-container">
                    {events.eventsCreatedByUser.slice(startIndex, startIndex + 3).map((event, index) => {
                        const formattedDate = dayjs(event.date).format("DD/MM/YYYY - HH:mm")
                        const formattedDuration = formatDuration(event.duration)
                        return (
                            <div className="event-created-card" key={event.idEvent}>
                                <h3 className="title-event">{event.title}</h3>
                                <p className="text-event-card">{formattedDate}</p>
                                <div className="create-container-event-card">
                                    <p className="text-event-card">Créé par:</p>
                                    <img src={events.iconurl} alt="User Icon" />
                                    <p className="text-event-card">{events.lastname}  {events.firstname}</p>
                                </div>
                                <p className="text-event-card">Durée: {formattedDuration} </p>
                                <div className="button-event-card-container">
                                    <button className="secondary">Voir en détail</button>
                                    <button className="third">Modifier</button>
                                    <button onClick={() => onDelete(event.idEvent)} className="destructive">Supprimer</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            ) : null}
            {showModal && (
                <Modal closeModal={closeModal} />
            )}
            <button onClick={prevSlide} disabled={startIndex === 0}>precedent</button>
            <button onClick={nextSlide} disabled={startIndex === totalEvents - 3}>Suivant</button>
        </section>
    );
}

export default CardMyEvenements;
