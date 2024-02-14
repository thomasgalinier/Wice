import { useState } from "react";
import './cardMyEvenements.css'
import Modal from "../Modal/Modal";
function CardMyEvenements() {
    const  [showModal, setShowModal] = useState(false);
    const openModal = () => {
        setShowModal(true) 
    }
    const closeModal = () =>{
        setShowModal(false)
    }
    return ( 
        <>
        <section className="card-container">
            <button className="primary" onClick={openModal}>Créez un évenements </button>
            
        </section>
        {showModal && (
            <Modal closeModal={closeModal}/>
        )}
        </>
     );
}

export default CardMyEvenements;