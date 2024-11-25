import { useEffect, useState } from 'react'
import { Pagination, Switch } from '@mui/material'
import './App.css'

function App() {
  const [data, setData] = useState([])
  useEffect(() => {
    fetch('https://651fa4bb906e276284c34894.mockapi.io/usercomments')
      .then((response) => response.json())
      .then((data) => setData(data))
  },[])
 
console.log(data)
  return (

    <>
    {data && data.map((item) => (
      <div key={item.id}>
        <h2>{item.name}</h2>
        <p>{item.comment}</p>
      </div>
    ))}
     <Pagination count={10} />
     <Switch />
    </>
  )
}

export default App
