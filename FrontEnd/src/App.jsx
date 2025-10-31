import React from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
    <Toaster position="top-center" reverseOrder={false} />
    <Outlet/>
    </>
  )
}

export default App;
