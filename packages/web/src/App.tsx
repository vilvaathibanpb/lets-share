import React, { useState, useEffect } from "react";
import SideBar from "./components/SideBar/SideBar";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {IntlProvider} from 'react-intl';

function App() {
  const [language, setLanguage] = useState("en");
  const [messages, setMessages] = useState({});
  const [updated, setUpdateStatus] = useState(false);
  const [dataUpdated, setDataStatus] = useState(false);

  useEffect(() => {
    import(`./translations/${language}.json`).then((res) => setMessages(res));
  }, [language]);

  return (
    <IntlProvider locale={language} messages={messages}>
    <div className="lg:w-full">
      <Header language={language} setLanguage={setLanguage} />
      <div className="flex flex-col lg:flex-row xl:flex-row">
        <SideBar setUpdateStatus={setUpdateStatus} setDataStatus={setDataStatus} dataUpdated={dataUpdated}/>
        <MainContent updated={updated} setUpdateStatus={setUpdateStatus} setDataStatus={setDataStatus} dataUpdated={dataUpdated}/>
      </div>
      <ToastContainer />
    </div>
    </IntlProvider>
  );
}

export default App;
