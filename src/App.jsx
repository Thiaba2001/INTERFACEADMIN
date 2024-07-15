import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Historique from './Components/Historique';
import './App.css';
import SideBar from './Components/Sidebar';
import Header from './Components/header'
import Content from './Components/content';
import TechnicianDropdown from './Components/TechnicianDropdown';
import Authentification from './Components/PageAuthentification';



function App() {
    const [showTechnicianCard, setShowTechnicianCard] = useState(false);
    const [isFlipped, setIsFlipped] = useState(true);
    const [selectedPosition, setSelectedPosition] = useState(null);
    const [technicianDetails, setTechnicianDetails] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://192.168.1.4:5000/api/mqttData');
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
        // Handle the action here, for example:
        console.log(`Option selected: ${action}`);
        // You might want to call different functions based on the action
    };
    const handleCreateTechnician = async (technicianData) => {
        try {
            const response = await fetch('http://192.168.1.4:5000/api/techniciens', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(technicianData),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            // Handle the response from the server
            const data = await response.json();
            console.log(data);
            setSuccessMessage('Techncien creer avec succes.');
            // Réinitialiser le message après 3 secondes
            setTimeout(() => {
                setSuccessMessage('');

            }, 3000);
        } catch (e) {
            console.error(`Could not create a technician: ${e}`);
        }

    }


    const handleReadTechnicien = async (loginData) => {

        try {
            const response = await fetch(`http://192.168.1.4:5000/api/techniciens/detailsByLogin/${loginData.login}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! satust: ${response.status}`)
            }
            const data = await response.json();
            setTechnicianDetails(data); // Set the technician details into the state
        } catch (e) {
            console.error(`Could not read technician data: ${e}`);
            setTechnicianDetails(null); // Reset the technician details on error
        }

    }

    const handleUpdateTechcien = async (updateData) => {
        try {
            const response = await fetch(`http://192.168.1.4:5000/api/techniciens/${updateData._id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(updateData),
            })
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            // Handle the response from the server
            const data = await response.json();
            console.log(data);
            setSuccessMessage('La mise à jour a été réalisée avec succès.');
            // Réinitialiser le message après 3 secondes
            setTimeout(() => {
                setSuccessMessage('');

            },
                3000);
        } catch (e) {
            console.error(`Could not Update Technicien: ${e}`);
        }
    }
    const handleDeleteTechnicien = async (idData) => {
        try {
            const response = await fetch(`http://192.168.1.4:5000/api/techniciens/${idData._id}`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json'
                }
            })
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
            setSuccessMessage(' Technicien supprimé avec Succes.');
            // Réinitialiser le message après 3 secondes
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        } catch (e) {
            console.error(`Could not Update Technicien: ${e}`);
        }
    }

    const handleFlipped = () => {
        setIsFlipped(false);

    }
    const handleSelectPosition = (position) => {
        setSelectedPosition(position);
    };



    return (
        <Router>
            <Routes>
                <Route path="/" element={<Authentification />} />
                <Route
                    path="/sidebar"
                    element={
                        <div className="grid-container">
                            <Header />
                            <SideBar onTechnicianClick={() => setShowTechnicianCard((prev) => !prev)} />
                            <Routes>
                                <Route
                                    path="/historique"
                                    element={<Historique data={data} onSelectPosition={handleSelectPosition} />}
                                />
                                <Route
                                    path="/techniciandropdown"
                                    element={
                                        <TechnicianDropdown
                                            onOptionSelect={handleOptionSelect}
                                            onCreateTechnician={handleCreateTechnician}
                                            onReadTechnician={handleReadTechnicien}
                                            onUpdateTechnician={handleUpdateTechcien}
                                            onDeleteTechnician={handleDeleteTechnicien}
                                            technicianDetails={technicianDetails}
                                            onFlipBack={handleFlipped}
                                        />
                                    }
                                />
                                <Route path="/dashboard" element={<Content />} />
                                <Route path="/evenement" element={<></>} />
                            </Routes>
                        </div>
                    }
                />
            </Routes>
        </Router>

    )
}

export default App;


