import { useEffect, useState } from 'react'
import { Pagination, Switch } from '@mui/material'
import '../App.css'



function ListingPage() {

    const [data, setData] = useState([])
    useEffect(() => {
      fetch('https://651fa4bb906e276284c34894.mockapi.io/usercomments')
        .then((response) => response.json())
        .then((data) => setData(data))
    },[])
    {/*count = 0*/}
   
  console.log(data)


  return (
    <>
    <div>
    <ul>
      {data && data.map((item) => (
          <li>{item.name}</li>
          
        ))}
      </ul>
       {/* <Pagination count={10} itemScope /> */}
  
      </div>
        </>
  );
} 

export default ListingPage