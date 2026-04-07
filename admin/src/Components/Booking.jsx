import React, { useEffect, useState } from 'react'
import Datagrid from './Datagrid';
import axios from 'axios';

function Booking() {
  const [row ,setRow] = useState([]);
  useEffect(()=>{
    async function GetOrders() {
      const url = process.env.REACT_APP_SERVER_URL;
      try{
        const response= await axios.get(`${url}/get-orders`);
        let data = response.data;
        console.log(data.success);
        if(data.success){
          let result= data.data;
          console.log("lala /n",result)

          // setRow(Object.keys(result[0]));
          setRow(result)
        }
      }catch(err){
        console.log(err)
      }
      
    }
    GetOrders();
    
  },[])
  
  console.log('row data ',row) 
  
  return (
    <div>
      <Datagrid row={row} />
    </div>
  )
}

export default Booking
