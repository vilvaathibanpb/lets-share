import React, { useState } from "react";
import SideBar from "./components/SideBar/SideBar";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [language, setLanguage] = useState("en");
  const [updated, setUpdateStatus] = useState(false);
  
  return (
    <div className="lg:w-full">
      <Header language={language} setLanguage={setLanguage} />
      <div className="flex flex-col lg:flex-row xl:flex-row">
        <SideBar setUpdateStatus={setUpdateStatus} />
        <MainContent updated={updated} setUpdateStatus={setUpdateStatus} />
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
