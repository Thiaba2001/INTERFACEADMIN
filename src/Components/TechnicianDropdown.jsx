import { useState } from 'react';
import styles from './Technician.module.scss';

const TechnicianDropdown = ({ onOptionSelect, onCreateTechnician, onReadTechnician, technicianDetails, onDeleteTechnician, onUpdateTechnician, }) => {

    const [technician, setTechnician] = useState({});
    const [isFlipped, setIsFlipped] = useState(false);
    const [activeForm, setACtiveForm] = useState('');


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
                onDeleteTechnician(technician)
                break;
            default:
                console.log('No action');
        }
        setIsFlipped(false);

    };
    const handleCreateClick = () => {
        setACtiveForm('create');
        setIsFlipped(true);
    };
    const handleReadClick = () => {
        setACtiveForm('read');
        setIsFlipped(true);
    };
    const handleUpdateClick = () => {
        setACtiveForm('update');
        setIsFlipped(true);
    };
    const handleDeleteClick = () => {
        setACtiveForm('delete');
        setIsFlipped(true);
    }


    return (

        <div className={`${styles.flip_card}`} >
            <div className={`${styles.flip_card_inner} ${isFlipped ? styles.flipped : ''}`}>
                <div className={`${styles.flip_card_front}`}>
                    <div className={styles.ellipse}>
                        <h3> Selectionnez une action</h3>

                    </div>

                    <button className={`${styles.rect1} ${styles.btn}`} value="create" onClick={(e) => {
                        handleCreateClick();
                        if (typeof onOptionSelect === 'function') {
                            onOptionSelect(e);
                        }

                    }} >Créer Technicien</button>
                    <button className={`${styles.rect2} ${styles.btn}`} value="read" onClick={(e) => {
                        handleReadClick();
                        if (typeof onOptionSelect === 'function') {
                            onOptionSelect(e);
                        }
                    }}>Afficher Technicien</button>
                    <button className={`${styles.rect3} ${styles.btn}`} value="update" onClick={(e) => {
                        handleUpdateClick();
                        if (typeof onOptionSelect === 'function') {
                            onOptionSelect(e);
                        }
                    }}>Modifier Technicien</button>
                    <button className={`${styles.rect4} ${styles.btn} `} value="delete" onClick={(e) => {
                        handleDeleteClick();
                        if (typeof onOptionSelect === 'function') {
                            onOptionSelect(e);
                        }
                    }}>Supprimer Technicien</button>
                </div>
                <div className={`${styles.flip_card_back}`}>
                    <h3> Enter les information du technicien</h3>
                    {activeForm === 'create' && (
                        <form onSubmit={handleSubmit}>
                            {/* les champs du formulaire*/}
                            <input className={`${styles.inp}`} name="identifiant" onChange={handleChange} placeholder="Identifiant" />
                            <br />
                            <input className={`${styles.inp}`} name="prenom" onChange={handleChange} placeholder="Prenom" />
                            <br />
                            <input className={`${styles.inp}`} name="nom" onChange={handleChange} placeholder="Nom" />
                            <br />
                            <input className={`${styles.inp}`} name="email" onChange={handleChange} placeholder="Email" />
                            <br />
                            <button type="submit" > Creer Technicien</button>
                            <br />
                        </form>
                    )}
                    {activeForm === 'read' && (
                        <form onSubmit={handleSubmit} >
                            <input className={`${styles.inp}`} name="login" placeholder="Loging" onChange={handleChange} />
                            <br />
                            <button>Afficher Technicien</button>
                            <div>
                                <p>Identifiant: {technicianDetails?.identifiant}</p>
                                <p>Prenom: {technicianDetails?.prenom}</p>
                                <p>Nom: {technicianDetails?.nom}</p>
                                <p>Email: {technicianDetails?.email}</p>
                                {/* ... plus de détails si nécessaire ... */}
                            </div>
                        </form>

                    )}


                    {
                        activeForm === 'update' && (
                            <form onSubmit={handleSubmit}>
                                <input className={`${styles.inp}`}
                                    name="_id" placeholder="Id technicien" onChange={handleChange} />
                                <input className={`${styles.inp}`}
                                    name="identifiant" placeholder="Identifiant" onChange={handleChange} />
                                <input className={`${styles.inp}`}
                                    name="prenom" placeholder="Prenom" onChange={handleChange} />
                                <input className={`${styles.inp}`}
                                    name="nom" placeholder="Nom" onChange={handleChange} />
                                <input className={`${styles.inp}`}
                                    name="email" placeholder="Email" onChange={handleChange} />

                                <button className={`${styles.inp}`} >UpdateTechnicien</button>
                            </form>
                        )
                    }
                    {
                        activeForm === 'delete' && (
                            <form onSubmit={handleSubmit} >
                                <input
                                    className={styles.inp}
                                    name="_id"
                                    placeholder="Id"// Ajoutez la valeur ici pour un contrôle complet de l'input
                                    onChange={handleChange}
                                />
                                <button type="submit" className={styles.inp}>Supprimer Technicien</button>
                            </form>
                        )
                    }
                </div>
            </div>
        </div>

    )

};

export default TechnicianDropdown;
