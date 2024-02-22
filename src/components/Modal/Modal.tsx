import './modal.css'
import Cookies from 'js-cookie'
type Props = {
    closeModal: () => void
}

function Modal({ closeModal }: Props) {
    const jwtToken = Cookies.get('jwt_token');
    const handleCreateEvent = (e) => {
        e.preventDefault()
        const form = e.target;
        const formData = new FormData(form);
        const title = formData.get("title");
        const date = formData.get("date");
        const duration = formData.get("dure");
        const description = formData.get("description")
        
        const requestOptions = {
            method: "POST",
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
    
        fetch('http://localhost:3000/event/create', requestOptions)
          .then((response)=>response.json())
          .then((data)=>console.log(data))
          .catch((error)=>console.error(error))
    }
    
    return (
        <div className="modal">
            <form onSubmit={handleCreateEvent} className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <label htmlFor="title"className='label-title'>Title</label>
                <input name='title' id='title' className="input-title" type="text" placeholder='Titre' />
                
                <div className='input-modal-container'>
                    <label htmlFor="date">Date:</label>
                    <input name='date' id='date' type="datetime-local" />
                </div>
                <div className='input-modal-container'>
                    <label htmlFor="dure">Durée:</label>
                    <input name='dure' id='dure' type="time" />
                </div>
                <label htmlFor="description">Description: </label>
                <textarea  name='description' id='description' className='input-description' ></textarea>
                <button type='submit' className='primary'>Créez l'évenements</button>
            </form>
        </div>
    );
}

export default Modal;