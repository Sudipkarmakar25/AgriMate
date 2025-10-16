import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState('Loading...');

  useEffect(() => {
    fetch('http://localhost:3693/hello')
      .then((res) => res.text()) 
      .then((value) => setData(value))
      .catch((err) => setData('Error fetching data: ' + err.message));
  }, []); 

  return (
    <>
      <h1>{data}</h1>
    </>
  )
}

export default App;
