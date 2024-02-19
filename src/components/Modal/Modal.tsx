import './modal.css'
type Props = {
    closeModal: () => void
}
const handleCreateEvent = (e) => {
    e.preventDefault()
    const form = e.target;
    const formData = new FormData(form);
    const title = formData.get("title");
    const image = formData.get("image");
    const date = formData.get("date");
    const dure = formData.get("dure");
    const description = formData.get("description")
    console.log(title, date, image, dure, description);
}

function Modal({ closeModal }: Props) {
    return (
        <div className="modal">
            <form onSubmit={handleCreateEvent} className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <label htmlFor="title"className='label-title'>Title</label>
                <input name='title' id='title' className="input-title" type="text" placeholder='Titre' />
                <div className='input-modal-container'>
                    <label htmlFor="image">Image:</label>
                    <input name="image" id='image' type="file" />
                </div>
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