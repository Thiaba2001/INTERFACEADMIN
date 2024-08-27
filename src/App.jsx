import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Historique from './Components/Historique';
import './App.css';
import SideBar from './Components/Sidebar';
import Header from './Components/header';
import Content from './Components/content';
import TechnicianDropdown from './Components/TechnicianDropdown';
import Authentification from './Components/PageAuthentification';

function App() {
    const [showTechnicianCard, setShowTechnicianCard] = useState(false);
    const [isFlipped, setIsFlipped] = useState(true);
    const [selectedPosition, setSelectedPosition] = useState(null);
    const [technicianDetails, setTechnicianDetails] = useState(null);
    const [data, setData] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://154.124.56.83:5000/api/mqttData');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                setData(result);
            } catch (e) {
                console.error(`Could not fetch data: ${e}`);
            }
        };
        fetchData();
    }, []);

    const handleOptionSelect = (e) => {
        const action = e.target.value;
        console.log(`Option selected: ${action}`);
    };

    const handleCreateTechnician = async (technicianData) => {
        try {
            const response = await fetch('http://154.124.56.83:5000/api/techniciens', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(technicianData),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
            setSuccessMessage('Technicien créé avec succès.');
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        } catch (e) {
            console.error(`Could not create a technician: ${e}`);
        }
    };

    const handleReadTechnicien = async (loginData) => {
        try {
            const response = await fetch(`http://154.124.56.83:5000/api/techniciens/detailsByLogin/${loginData.login}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setTechnicianDetails(data);
        } catch (e) {
            console.error(`Could not read technician data: ${e}`);
            setTechnicianDetails(null);
        }
    };

    const handleUpdateTechnicien = async (updateData) => {
        try {
            const response = await fetch(`http://154.124.56.83:5000/api/techniciens/${updateData._id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(updateData),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
            setSuccessMessage('La mise à jour a été réalisée avec succès.');
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        } catch (e) {
            console.error(`Could not update technician: ${e}`);
        }
    };

    const handleDeleteTechnicien = async (idData) => {
        try {
            const response = await fetch(`http://154.124.56.83:5000/api/techniciens/${idData._id}`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
            setSuccessMessage('Technicien supprimé avec succès.');
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        } catch (e) {
            console.error(`Could not delete technician: ${e}`);
        }
    };

    const handleFlipped = () => {
        setIsFlipped(false);
    };

    const handleSelectPosition = (position) => {
        setSelectedPosition(position);
    };

    return (
        <Router>
            <div className="grid-container">
                <Header />
                <SideBar onTechnicianClick={() => setShowTechnicianCard((prev) => !prev)} />
                <Routes>
                    <Route path="/" element={<SideBar />} />
                    <Route path="/dashboard" element={<Content />} />
                    <Route path="/historique" element={<Historique data={data} onSelectPosition={handleSelectPosition} />} />
                    <Route path="/techniciandropdown" element={
                        <TechnicianDropdown
                            onOptionSelect={handleOptionSelect}
                            onCreateTechnician={handleCreateTechnician}
                            onReadTechnician={handleReadTechnicien}
                            onUpdateTechnician={handleUpdateTechnicien}
                            onDeleteTechnician={handleDeleteTechnicien}
                            technicianDetails={technicianDetails}
                            onFlipBack={handleFlipped}
                        />
                    } />
                    <Route path="evenement" element={<></>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
