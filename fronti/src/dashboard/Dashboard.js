
import "./dashb.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Main from "./Main";
import Klienti from "./Klienti"; // Import Klienti component here
import Libri from "./Libri";
import Autori from "./Autori";
import Staf from "./Staf";
import Qyteti from "./Qyteti";
import zhanri from "./zhanri";
import ShtepiaBotuese from "./ShtepiaBotuese";
import { useHistory, Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";
function Dashboard() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [showKlienti, setShowKlienti] = useState(false);
  const [showLibri, setShowLibri] = useState(false); // State for Libri
  const [showAutori, setShowAutori] = useState(false); // State for Libri
  const [showStafi, setShowStafi] = useState(false); // State for Libri
  const [showQyteti, setShowQyteti] = useState(false); // State for Libri
  const [showZhanri, setShowZhanri] = useState(false); // State for Libri
  const [showShtepia, setShowShtepia] = useState(false); // State for Libri
  const history = useHistory();
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      history.push('/login');
    }
  }, [history]);
  
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  const handleCustomersClick = () => {
    setShowKlienti(true);
    setShowLibri(false); // Hide Libri when showing Klienti
  };

  const handleLibriClick = () => {
    setShowLibri(true);
    setShowKlienti(false); // Hide Klienti when showing Libri
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
        handleCustomersClick={handleCustomersClick} // Pass the click handler to the sidebar
        handleLibriClick={handleLibriClick} // Pass the click handler for Libri to the sidebar
        handleAutoriClick={handleAutoriClick}
        handleStafiClick={handleStafiClick}
        handleQytetiClick={handleQytetiClick}
        handleZhanriClick={handleZhanriClick}
        handleShtepiaClick={handleShtepiaClick}
      />
      <Main />
      {/* Render Klienti only when showKlienti is true */}
      {showKlienti && <Klienti />}
      {/* Render Libri only when showLibri is true */}
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
