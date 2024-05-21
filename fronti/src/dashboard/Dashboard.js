import React, { useState } from "react";
import "./dashb.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Main from "./Main";
import Klienti from "./Klienti"; // Import Klienti component here
import Libri from "./Libri";
import Autori from "./Autori";
import Staf from "./Staf";




function Dashboard() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [showKlienti, setShowKlienti] = useState(false);
  const [showLibri, setShowLibri] = useState(false); // State for Libri
  const [showAutori, setShowAutori] = useState(false); // State for Libri
  const [showStafi, setShowStafi] = useState(false); // State for Libri
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
      />
      <Main />
      {/* Render Klienti only when showKlienti is true */}
      {showKlienti && <Klienti />}
      {/* Render Libri only when showLibri is true */}
      {showLibri && <Libri />}
      {showAutori && <Autori />}
      {showStafi && <Staf/>}
    </div>
  );
}

export default Dashboard;
