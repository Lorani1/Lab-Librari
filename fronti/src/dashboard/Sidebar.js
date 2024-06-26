import React from "react";
import { Link } from "react-router-dom";
import {
  BsCart3,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
  BsMenuButtonWideFill,
  BsFillGearFill,
  BsBookFill,
} from "react-icons/bs";

function Sidebar({ openSidebarToggle, OpenSidebar, handleCustomersClick , handleLibriClick,handleAutoriClick, handleStafiClick,handleQytetiClick, handleZhanriClick,handleShtepiaClick,handleExchangeListClick,handleExchangeApproveClick,handleExchangeFormClick}) {
  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <BsCart3 className="icon_header" /> SHOP
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          x
        </span>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <a href="">
            <BsGrid1X2Fill className="icon" /> Dashboard
          </a>
        </li>
        <li className="sidebar-list-item">
          <Link
            to="/libri"
            className="sidebar-link"
            onClick={handleLibriClick}
          >
            <BsBookFill className="icon" /> Books
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link
            to="/autori"
            className="sidebar-link"
            onClick={handleAutoriClick}
          >
            <BsBookFill className="icon" /> Autori
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link
            to="/klienti"
            className="sidebar-link"
            onClick={handleCustomersClick}
          >
            <BsPeopleFill className="icon" /> Customers
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link
            to="/staf"
            className="sidebar-link"
            onClick={handleStafiClick}
          >
            <BsBookFill className="icon" /> stafi
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link
            to="/qyteti"
            className="sidebar-link"
            onClick={handleQytetiClick}
          >
            <BsBookFill className="icon" /> Qyteti
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link
            to="/zhanri"
            className="sidebar-link"
            onClick={handleZhanriClick}
          >
            <BsBookFill className="icon" /> Zhanri
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link
            to="/ShtepiaBotuese"
            className="sidebar-link"
            onClick={handleShtepiaClick}
          >
            <BsBookFill className="icon" /> Shtepia Botuese
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link
            to="/ExchangeList"
            className="sidebar-link"
            onClick={handleExchangeListClick}
          >
            <BsBookFill className="icon" /> Exchange List
          </Link>
        </li>
       
        <li className="sidebar-list-item">
          <Link
            to="/PendingApproval"
            className="sidebar-link"
            onClick={handleExchangeListClick}
          >
            <BsBookFill className="icon" /> Not Approvad after 24 Hours
          </Link>
        </li>
       
        <li className="sidebar-list-item">
          <Link
            to="/ExchangeApprove"
            className="sidebar-link"
            onClick={handleExchangeApproveClick}
          >
            <BsBookFill className="icon" /> Exchange Approve
          </Link>
        </li>
       
      </ul>
    </aside>
  );
}

export default Sidebar;
