import React,{useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './Package.css';
import axios from 'axios';

function Package() {
    const navigate = useNavigate();
    const [pkg ,setpkg]= useState([]);
    const url = process.env.REACT_APP_SERVER_URL;
    useEffect(() => {
        async function fetchingPackages() {
          try {
            const response = await axios.get(`${url}/get-package`);
            setpkg(response.data);
          } catch (error) {
            console.error('Error fetching packages:', error);
          }
        }
      
        fetchingPackages(); // call the async function
      }, [url]); // empty array = run once on mount
    
    
  return (
    <div className='package'>
        <div className='package-header' >
            Packages
        </div>
        <div className='package-create' onClick={()=>navigate('/create-package')} >
            <button>Create Package</button>
        </div>
        <div className='package-list' >
            {pkg.map((item)=>{
                return (
                    <div key={item._id} className='package-item' onClick={()=>navigate(`/package/${item._id}`,{state:item})} >
                        <img src={item.image} alt={item.name} />
                        <div>{item.name}</div>
                        <div>{item.price}</div>
                        <div>{item.days}</div>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default Package;