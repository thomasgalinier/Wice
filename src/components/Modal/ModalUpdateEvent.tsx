import './modal.css'
import Cookies from 'js-cookie'
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
}
type Event = {
    idEvent: number;
    title: string;
    description: string;
    date: string;
    duration: string;
    createdAt: string;
    updatedAt: string;
    createdById: number;
    createdBy: User;
    participants: User;
}
type Props = {
    closeModal: () => void
    event: Event
    
}

function ModalUpdateEvent({ closeModal, event }: Props) {
    const jwtToken = Cookies.get('jwt_token');
    
    const handleUpdateEvent = (e) => {
        e.preventDefault()
        const form = e.target;
        const formData = new FormData(form);
        const title = formData.get("title");
        const date = formData.get("date");
        const duration = formData.get("dure");
        const description = formData.get("description")
        
        const requestOptions = {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${jwtToken}`
            },
            body: JSON.stringify({
              title: title,
              description: description,
              dateTime: date,
              duration: duration,
            }),
          };
        fetch(`http://localhost:3000/event/update/${event.idEvent}`, requestOptions)
          .then((response)=>response.json())
          .then((data)=>console.log(data))
          .catch((error)=>console.error(error))
    }
    
    return (
        <div className="modal">
            <form onSubmit={handleUpdateEvent} className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <label htmlFor="title"className='label-title'>Title</label>
                <input name='title' id='title' className="input-title" type="text" placeholder='Titre' defaultValue={event.title} />
                
                <div className='input-modal-container'>
                    <label htmlFor="date">Date:</label>
                    <input name='date' id='date'  type="datetime-local" defaultValue={event.date} />
                </div>
                <div className='input-modal-container'>
                    <label htmlFor="dure">Durée:</label>
                    <input name='dure' id='dure' type="time" defaultValue={event.duration} />
                </div>
                <label htmlFor="description">Description: </label>
                <textarea  name='description' id='description' className='input-description' defaultValue={event.description}></textarea>
                <button type='submit' className='primary'>Modifier l'évenement</button>
            </form>
        </div>
    );
}

export default ModalUpdateEvent;