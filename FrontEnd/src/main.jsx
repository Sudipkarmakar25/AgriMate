import { StrictMode, useEffect, useState } from "react";
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
  CropAdvisory,
  PestDetection,
  BlogHomePage,
} from "./pages/index.js";

import Navbar from "./components/Navbar.jsx";
import ChatBot from "./pages/ChatBot.jsx";
import store from "./store/store.js";
import { login, logout } from "./store/authSlice.js";

function AuthInitializer({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkLogin() {
      try {
        const res = await fetch(
          "http://localhost:3693/api/v1/farmer/isFarmerloggedIn",
          { credentials: "include" }
        );

        const data = await res.json();

        if (data.isLoggedIn) {
          store.dispatch(login(data.user));
        } else {
          store.dispatch(logout());
        }
      } catch (error) {
        store.dispatch(logout());
      }

      setLoading(false);
    }

    checkLogin();
  }, []);

  if (loading) {
    return <div className="text-center p-10 text-xl">Loading...</div>;
  }

  return children;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/farmer-registration", element: <FarmerRegistration /> },
      { path: "/add-plot", element: <AddPlot /> },
      { path: "/get-all-plots", element: <PlotDetails /> },

      {
        path: "/weather",
        element: (
          <>
            <Navbar />
            <Weather />
          </>
        ),
      },

      // Merged routes
      { path: "/advisory", element: <CropAdvisory /> },
      { path: "/pest-detection", element: <PestDetection /> },
      { path: "/chatbot", element: <ChatBot /> },
      { path: "/blog-home", element: <BlogHomePage /> },
    ],
  },
]);

// Render App AFTER Auth Check
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <AuthInitializer>
        <RouterProvider router={router} />
      </AuthInitializer>
    </Provider>
  </StrictMode>
);
