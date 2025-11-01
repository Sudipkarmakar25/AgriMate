import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import {Provider} from 'react-redux';
// import store from './store/store.js';
import {FarmerRegistration, Home,AddPlot, PlotDetails} from './pages/index.js';
import store from './store/store.js';

const router = createBrowserRouter([{
  path:'/',
  element:<App/>,
  children:[
    {
      path:'/',
      element:<Home/>
    },
    {
      path:'/farmer-registration',
      element:<FarmerRegistration/>
    },
    {
      path:'/add-plot',
      element:<AddPlot/>
    },
    {
      path:'/get-all-plots',
      element:<PlotDetails/>
    }
  ]
}])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
