import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from "axios";
import styles from './AdminNavbar.module.css';

const AdminNavbar = () => {

  const navLinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? 'bold' : 'normal',
      textDecoration: isActive ? 'underline' : 'none',
    };
  };
  
  const navigate = useNavigate();


  function logout(event)
  {
    
    event.preventDefault();
    
    localStorage.clear();
    
    navigate("/home");

  }

  return (
    <nav className={`container ${styles.nav_bar}`}>
      <ul className={styles.nav_items}>
        <li className={styles.nav_item}>
          <NavLink to='/adminHomePage' style={navLinkStyles}>
            Home
          </NavLink>
        </li>
        <li className={styles.nav_item}>
          <NavLink to='/manageTrain' style={navLinkStyles}>
            Manage Trains
          </NavLink>
        </li>
        
        {/* <li className={styles.nav_item}>
          <NavLink to='/contact' style={navLinkStyles}>
            Contact Us
          </NavLink>
        </li> */}
      </ul>

      <div>
        <button onClick={logout}>Logout</button>
      </div>
      
      
    </nav>
  );
};

export default AdminNavbar;
