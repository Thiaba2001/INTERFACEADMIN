import { useState, useEffect, useRef, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Autocomplete, Marker } from '@react-google-maps/api';
import { Skeleton } from '@chakra-ui/react';


const center = {
    lat: -3.745,
    lng: -38.523
};

function Content({ selectedTechnicianPosition }) {
    const [imageName, setImageName] = useState([]);
    const [imageName1, setImageName1] = useState([]);
    const [markerPosition, setMarkerPosition] = useState(null);
    const [isVisible, setIsVisible] = useState(true);
    const locationRef = useRef(null);
    const mapRef = useRef(null);

    useEffect(() => {
        fetchImages('images', setImageName);
        fetchImages('images_1', setImageName1);

        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const fetchImages = (endpoint, setImage) => {
        fetch(`http://192.168.1.4:5000/api/${endpoint}`)
            .then(response => response.json())
            .then(data => setImage(data))
            .catch(error => console.error(`Error fetching ${endpoint}:`, error));
    };
    useEffect(() => {
        if (selectedTechnicianPosition) {
            const [lat, lng] = selectedTechnicianPosition.split(',').map(Number);
            const position = { lat, lng };
            setMarkerPosition(position);
            if (mapRef.current) {
                mapRef.current.panTo(position);
            }
        }
    }, [selectedTechnicianPosition]);


    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY || '',
        libraries: ['places'],
    });


    const handleSearch = useCallback(() => {
        if (locationRef.current) {
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ address: locationRef.current.value }, (results, status) => {
                if (status === 'OK') {
                    setMarkerPosition(results[0].geometry.location);
                    if (mapRef.current) {
                        mapRef.current.panTo(results[0].geometry.location);
                    }
                } else {
                    console.error('Geocode was not successful for the following reason: ' + status);
                }
            });
        }
    }, []);

    if (!isLoaded) {
        return <Skeleton />;
    }

    return (
        <main className="Main-content">
            <div className="main-card">
                <div className="card">
                    <div className="card-inner">
                        <h3>Techniciens</h3>
                        <i className="fa-solid fa-helmet-safety"></i>
                    </div>
                    <h1>1</h1>
                </div>
                <div className="card">
                    <div className="card-inner">
                        <h3>Devices</h3>
                        <i className="fa-solid fa-microchip"></i>
                    </div>
                    <h1>1</h1>
                </div>
                <div className="card">
                    <div className="card-inner">
                        <h3>Intervention</h3>
                        <i className="fa-solid fa-business-time"></i>
                    </div>
                    <h1>0</h1>
                </div>
                <div className="card">
                    <div className="card-inner">
                        <h3>Notification</h3>
                        <i className="fa-regular fa-bell"></i>
                    </div>
                    <h1>0</h1>
                </div>
            </div>

            <div className="charts">
                {/* <div className={`charts_maps_cotain ${isVisible ? '' : 'hidden'}`}>
                    <div className="loc">
                        <Autocomplete>
                            <input type="text" className="inp" placeholder="Rechercher la localisation" ref={locationRef} />
                        </Autocomplete>
                        <button className="btntext1" onClick={handleSearch}><i className="fa-solid fa-location-dot"></i></button>
                    </div>
                </div>
 */}
                <GoogleMap
                    center={center}
                    zoom={10}
                    mapContainerStyle={{ width: '100%', height: '400px' }}
                    onLoad={(map) => mapRef.current = map}
                    onUnmount={() => mapRef.current = null}
                >
                    {markerPosition && <Marker position={markerPosition} />}
                </GoogleMap>
            </div>

            <div className="Text">
                <h1>État Chambre Avant/Après Intervention</h1>
            </div>

            <div className="maDiv">
                <div className="gallery scrollView">
                    {imageName.map((name, index) => (
                        <div key={index} className="image-container">
                            <div className="image-name">{name}</div>
                            <img src={`http://192.168.1.4:5000/upload_AvInt/${name}`} alt={name} />
                        </div>
                    ))}
                </div>
                <div className="gallery1 scrollView">
                    {imageName1.map((name, index) => (
                        <div key={index} className="image-container">
                            <div className="image-name">{name}</div>
                            <img src={`http://192.168.1.4:5000/upload_ApInt/${name}`} alt={name} />
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}

export default Content;
