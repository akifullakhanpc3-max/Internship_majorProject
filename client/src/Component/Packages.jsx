import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Style/Packages.css'
//instll madidini server side nin laptop alli maadu
//access madooko varible allilink save madi haku 
//eetr const url= 'https://localhot,...
//axios.get(`${url}/get-package`)  
function Packages() { 

    const navigate = useNavigate();
    const [pkg, setPkg] = useState([]);
    const [loading, setLoading] = useState(true);

    const url = process.env.REACT_APP_SERVER_URL;

    useEffect(() => {
        async function fetchPackages() {
            try {
                const response = await axios.get(`${url}/get-package`);
                setPkg(response.data);
            } catch (error) {
                console.error('Error fetching packages:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchPackages();
    }, [url]);

    if (loading) return <h2>Loading packages...</h2>;

    return (
        <div className='package'>
            <div className='package-header'>
                Explore Travel Packages 🌍
            </div>

            <div className='package-list'>
                {pkg.length === 0 ? (
                    <h3>No packages available</h3>
                ) : (
                    pkg.map((item) => (
                        <div key={item._id} className='package-item'>
                            
                            <img 
                                src={`${url}/${item.image}`} 
                                alt={item.name} 
                            />

                            <h3>{item.name}</h3>
                            <p>₹ {item.price}</p>
                            <p>{item.days} days</p>

                            <button 
                                onClick={() => navigate(`/package/${item._id}`)}
                            >
                                View Details
                            </button>

                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default Packages;