import React, { useState } from "react";
import "./dashb.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Main from "./Main";
import Klienti from "./Klienti";
import Libri from "./Libri";
import Autori from "./Autori";
import Staf from "./Staf";
import Qyteti from "./Qyteti";
import zhanri from "./zhanri";
import ShtepiaBotuese from "./ShtepiaBotuese";


function Dashboard() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [showKlienti, setShowKlienti] = useState(false);
  const [showLibri, setShowLibri] = useState(false); 
  const [showAutori, setShowAutori] = useState(false); 
  const [showStafi, setShowStafi] = useState(false); 
  const [showQyteti, setShowQyteti] = useState(false); 
  const [showZhanri, setShowZhanri] = useState(false); 
  const [showShtepia, setShowShtepia] = useState(false); 
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  const handleCustomersClick = () => {
    setShowKlienti(true);
    setShowLibri(false); 
  };

  const handleLibriClick = () => {
    setShowLibri(true);
    setShowKlienti(false);
  };
  const handleAutoriClick = () => {
    setShowLibri(false);
    setShowKlienti(false); 
    setShowAutori(true);
    
  };
  const handleStafiClick = () => {
    setShowLibri(false);
    setShowKlienti(false); 
    setShowAutori(false);
    setShowStafi(true);
    
  };
  const handleQytetiClick = () => {
    setShowLibri(false);
    setShowKlienti(false); 
    setShowAutori(false);
    setShowStafi(false);
    setShowQyteti(true);
    
  };
  const handleZhanriClick = () => {
    setShowLibri(false);
    setShowKlienti(false); 
    setShowAutori(false);
    setShowStafi(false);
    setShowQyteti(false);
    setShowZhanri(true);
    
  };
  const handleShtepiaClick = () => {
    setShowLibri(false);
    setShowKlienti(false); 
    setShowAutori(false);
    setShowStafi(false);
    setShowQyteti(false);
    setShowZhanri(false);
    setShowShtepia(true);
    
  };
  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
        handleCustomersClick={handleCustomersClick} 
        handleLibriClick={handleLibriClick} 
        handleAutoriClick={handleAutoriClick}
        handleStafiClick={handleStafiClick}
        handleQytetiClick={handleQytetiClick}
        handleZhanriClick={handleZhanriClick}
        handleShtepiaClick={handleShtepiaClick}
      />
      <Main />
     
      {showKlienti && <Klienti />}
      
      {showLibri && <Libri />}
      {showAutori && <Autori />}
      {showStafi && <Staf/>}
      {showQyteti && <Qyteti/>}
      {showZhanri && <zhanri/>}
      {showShtepia && <Shtepia/>}
    </div>
  );
}

export default Dashboard;
