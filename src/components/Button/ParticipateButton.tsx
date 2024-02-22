import React, { useState } from 'react';
import './participateButton.css'; // Assurez-vous d'importer votre fichier CSS

const ParticipateButton = () => {
    const [isSuccess, setIsSuccess] = useState(false);

    const handleClick = () => {
        setIsSuccess(true);
        // Ici, vous pouvez ajouter la logique que vous avez dans votre gestionnaire d'événement click JavaScript
    };

    return (
        <button className={`button grey ${isSuccess ? 'success' : ''}`} onClick={handleClick}>
            <div className="icon">
                <div className="cannon"></div>
                <div className="confetti">
                    <svg viewBox="0 0 18 16">
                        <polyline points="1 10 4 7 4 5 6 1" />
                        <path d="M4,13 C5.33333333,9 7,7 9,7 C11,7 12.3340042,6 13.0020125,4" />
                        <path d="M6,15 C7.83362334,13.6666667 9.83362334,12.6666667 12,12 C14.1663767,11.3333333 15.8330433,9.66666667 17,7" />
                    </svg>
                    <i></i><i></i><i></i><i></i><i></i><i></i>
                    <div className="emitter"></div>
                </div>
            </div>
            <span>Confirm</span>
        </button>
    );
};

export default ParticipateButton;
