import React from 'react';
import styles from './Historique.module.scss';

function Historique({ data, onSelectPosition }) {
    const handleClick = (position) => {
        onSelectPosition(position);
    };

    return (
        <div className={`${styles.historique}`}>
            <h1 className={`${styles.historique_title}`} >Historique Intervention</h1>
            <table className={`${styles.table}`}>
                <thead>
                    <tr>
                        <th>timestamp</th>
                        <th>Login</th>
                        <th>Motif Intervention</th>
                        <th>Numéro de Trappe</th>
                        <th>Position</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} onClick={() => handleClick(item.position)}>
                            <td>{item.timestamp}</td>
                            <td>{item.login}</td>
                            <td>{item.motifIntervention}</td>
                            <td>{item.numeroTrappe}</td>
                            <td>{item.position}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Historique;
