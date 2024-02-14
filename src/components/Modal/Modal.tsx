
type Props = {
    closeModal: ()=> void
}
function Modal({closeModal}: Props) {
    return ( 
        <div className="modal">
                <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                    <h2>Titre de votre modal</h2>
                    <p>Contenu de votre modal...</p>
                </div>
            </div>
     );
}

export default Modal;