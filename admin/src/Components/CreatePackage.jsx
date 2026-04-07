import React from 'react'
import './CreatePackage.css'
import { useState } from 'react';
import axios from 'axios';

function CreatePackage() {
    const url = process.env.REACT_APP_SERVER_URL;
    const [pkg, setpkg] = useState({
        name: "",
        price: "",
        image: "",
        description: "",
        rating: 4.5,
        days: ""
    })
    function handelchange(e) {
        const { name, value } = e.target;
        setpkg((prev) => ({
            ...prev, [name]: value
        }));
    }
    async function handelsubmit(e) {
        console.log(url);
        console.log(pkg);
        e.preventDefault();
        try {
            const request = await axios.post(`${url}/create-package`,
                pkg
            )
            const data = request.data
            if (data.success) {
                alert(data.message);
            } else {
                alert(data.message)
            }
        } catch (error) {
            alert("Failed to save the package please try again")
        }

        // Here you can add code to send the package data to your backend or perform any other actions needed to create the package. like axios.post('/api/packages', pkg) or something similar depending on your backend setup.
    }
    return (
        <div className='all'>
            <div className='header'>
                <h1>Create Package</h1>
            </div>
            <div className='form-section'>
                <form className="form" action="">
                    <label htmlFor="">Package Name</label>
                    <br />
                    <input onChange={handelchange} name="name" placeholder='Enter the Package Name' type="text" required />
                    <br />
                    <label htmlFor="">Description</label>
                    <br />
                    <textarea onChange={handelchange} placeholder='Enter the description of the package ' name="description" id="" cols="30" rows="10" required></textarea>
                    <br />
                    <label htmlFor="">Price</label>
                    <br />
                    <input onChange={handelchange} placeholder='Enter the price of the Package' type="number" name='price' required />
                    <br />
                    <label htmlFor="">Days</label>
                    <br />
                    <input onChange={handelchange} name='days' type="number" placeholder='Enter the number of days' required />
                    <label htmlFor="">Image</label>
                    <br />

                    <input onChange={handelchange} type="text" name='image' placeholder='please upload url' required />
                    <br />

                    <button onClick={handelsubmit} type='submit'>Create Package</button>
                </form>
            </div>
        </div>
    )
}

export default CreatePackage
