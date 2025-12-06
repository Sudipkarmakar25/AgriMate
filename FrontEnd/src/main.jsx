<<<<<<< Updated upstream
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import {
  FarmerRegistration,
  Home,
  AddPlot,
  PlotDetails,
  Weather,
  CropAdvisory
} from "./pages/index.js";
import store from "./store/store.js";
import Navbar from "./components/Navbar.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/farmer-registration",
        element: <FarmerRegistration />,
      },
      {
        path: "/add-plot",
        element: <AddPlot />,
      },
      {
        path: "/get-all-plots",
        element: <PlotDetails />,
      },
      {
        path: "/weather",
        element: (
          <>
            <Navbar />
            <Weather />
          </>
        ),
      },
      {
        path:"/advisory",
        element:<CropAdvisory/>
      }
    ],
  },
]);
=======
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
// import store from './store/store.js';
import { FarmerRegistration, Home } from './pages/index.js';
import store from './store/store.js';
import ChatBot from './pages/ChatBot.jsx';

const router = createBrowserRouter([{
  path: '/',
  element: <App />,
  children: [
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/farmer-registration',
      element: <FarmerRegistration />
    },
    {
      path: '/chatBot',
      element: <ChatBot />
    },
  ]
}])
>>>>>>> Stashed changes

createRoot(document.getElementById("root")).render(
  <StrictMode>
<<<<<<< Updated upstream
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
=======
  <Provider store={store}>
      <RouterProvider router={router} />
  </Provider>
  </StrictMode>,
)
>>>>>>> Stashed changes
