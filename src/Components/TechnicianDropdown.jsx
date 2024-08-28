import { useState } from 'react';
import styles from './Technician.module.scss';

const TechnicianDropdown = ({ onOptionSelect, onCreateTechnician, onReadTechnician, technicianDetails, onDeleteTechnician, onUpdateTechnician, }) => {

    const [technician, setTechnician] = useState({});
    const [isFlipped, setIsFlipped] = useState(false);
    const [activeForm, setActiveForm] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTechnician(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        switch (activeForm) {
            case 'create':
                onCreateTechnician(technician);
                break;
            case 'read':
                onReadTechnician(technician);
                break;
            case 'update':
                onUpdateTechnician(technician);
                break;
            case 'delete':
                onDeleteTechnician(technician);
                break;
            default:
                console.log('No action');
        }
        setIsFlipped(false);
    };

    const handleCreateClick = () => {
        setActiveForm('create');
        setIsFlipped(true);
    };
    const handleReadClick = () => {
        setActiveForm('read');
        setIsFlipped(true);
    };
    const handleUpdateClick = () => {
        setActiveForm('update');
        setIsFlipped(true);
    };
    const handleDeleteClick = () => {
        setActiveForm('delete');
        setIsFlipped(true);
    }

    return (
        <div className={`${styles.flip_card}`}>
            <div className={`${styles.flip_card_inner} ${isFlipped ? styles.flipped : ''}`}>
                <div className={`${styles.flip_card_front}`}>
                    <div className={styles.ellipse}>
                        <h3>Sélectionnez une action</h3>
                    </div>

                    <button className={`${styles.rect1} ${styles.btn}`} onClick={(e) => {
                        handleCreateClick();
                        if (typeof onOptionSelect === 'function') {
                            onOptionSelect(e);
                        }
                    }}>Créer Technicien</button>

                    <button className={`${styles.rect2} ${styles.btn}`} onClick={(e) => {
                        handleReadClick();
                        if (typeof onOptionSelect === 'function') {
                            onOptionSelect(e);
                        }
                    }}>Afficher Technicien</button>

                    <button className={`${styles.rect3} ${styles.btn}`} onClick={(e) => {
                        handleUpdateClick();
                        if (typeof onOptionSelect === 'function') {
                            onOptionSelect(e);
                        }
                    }}>Modifier Technicien</button>

                    <button className={`${styles.rect4} ${styles.btn}`} onClick={(e) => {
                        handleDeleteClick();
                        if (typeof onOptionSelect === 'function') {
                            onOptionSelect(e);
                        }
                    }}>Supprimer Technicien</button>
                </div>

                <div className={`${styles.flip_card_back}`}>
                    <h3>Entrez les informations du technicien</h3>
                    {activeForm === 'create' && (
                        <form onSubmit={handleSubmit}>
                            <input className={`${styles.inp}`} name="identifiant" onChange={handleChange} placeholder="Identifiant" />
                            <br />
                            <input className={`${styles.inp}`} name="prenom" onChange={handleChange} placeholder="Prénom" />
                            <br />
                            <input className={`${styles.inp}`} name="nom" onChange={handleChange} placeholder="Nom" />
                            <br />
                            <input className={`${styles.inp}`} name="email" onChange={handleChange} placeholder="Email" />
                            <br />
                            <button type="submit">Créer Technicien</button>
                            <br />
                        </form>
                    )}
                    {activeForm === 'read' && (
                        <form onSubmit={handleSubmit}>
                            <input className={`${styles.inp}`} name="login" placeholder="Login" onChange={handleChange} />
                            <br />
                            <button>Afficher Technicien</button>
                            <div>
                                <p>Identifiant: {technicianDetails?.identifiant}</p>
                                <p>Prénom: {technicianDetails?.prenom}</p>
                                <p>Nom: {technicianDetails?.nom}</p>
                                <p>Email: {technicianDetails?.email}</p>
                            </div>
                        </form>
                    )}
                    {activeForm === 'update' && (
                        <form onSubmit={handleSubmit}>
                            <input className={`${styles.inp}`} name="_id" placeholder="Id technicien" onChange={handleChange} />
                            <input className={`${styles.inp}`} name="identifiant" placeholder="Identifiant" onChange={handleChange} />
                            <input className={`${styles.inp}`} name="prenom" placeholder="Prénom" onChange={handleChange} />
                            <input className={`${styles.inp}`} name="nom" placeholder="Nom" onChange={handleChange} />
                            <input className={`${styles.inp}`} name="email" placeholder="Email" onChange={handleChange} />
                            <button type="submit" className={`${styles.inp}`}>Update Technicien</button>
                        </form>
                    )}
                    {activeForm === 'delete' && (
                        <form onSubmit={handleSubmit}>
                            <input className={`${styles.inp}`} name="_id" placeholder="Id" onChange={handleChange} />
                            <button type="submit" className={`${styles.inp}`}>Supprimer Technicien</button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
};

export default TechnicianDropdown;
