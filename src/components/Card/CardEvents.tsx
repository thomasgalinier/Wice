

import { useState } from 'react';
import dayjs from 'dayjs';
import './CardEvents.css';
import Cookies from 'js-cookie';

function CardEvents({ events }) {


    const jwtToken = Cookies.get('jwt_token');

    function formatDuration(input: string) {
        const [hours, minutes] = input.split(':');
        const formattedDuration = `${hours}h${minutes}min`;
        return formattedDuration;
    }

    const handleParticipation = (idEvent: number) => {
        const requestOption = {
            method: 'POST',
            headers:{ "Authorization": `Bearer ${jwtToken}`}
        }
        fetch(`http://localhost:3000/event/${idEvent}/register`, requestOption)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error=> console.error(error))
    };

    return (
        <div className="events-card card-contain">
            <h2>Événements: </h2>
            <hr />
            <div className='event-container'>
                {events.map((event) => {
                    const formattedDate = dayjs(event.date).format("DD/MM/YYYY - HH:mm");
                    const formattedDuration = formatDuration(event.duration);
                    return (
                        <div className="event-card" key={event.idEvent}>
                            <h3 className="title-event">{event.title}</h3>
                            <p className="text-event-card">{formattedDate}</p>
                            <div className="create-container-event-card">
                                <p className="text-event-card">Créé par:</p>
                                <img src={event.createdBy.iconurl} alt="User Icon" />
                                <p className="text-event-card">{event.createdBy.lastname}  {event.createdBy.firstname}</p>
                            </div>
                            <div>
                                <p className='text-event-card'>Description:</p>
                                <p className='text-event-card'>{event.description}</p>
                            </div>
                            <p className="text-event-card">Durée: {formattedDuration} </p>
                            <button className='primary' onClick={()=> handleParticipation(event.idEvent)}>Participer</button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default CardEvents;
