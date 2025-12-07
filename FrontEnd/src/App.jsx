
import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ChatBotButton from "./components/ChatBotButton";

function App() {
  const location=useLocation();
  const flag=location.pathname.includes("/chatbot");
  return (
    <>
      <Toaster />
      <Outlet />
      {flag===false && <ChatBotButton/>}
    </>
  );
}

export default App;
