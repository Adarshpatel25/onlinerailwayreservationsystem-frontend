import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from "axios";
import styles from './NavbarAfterLogin.module.css';

const NavbarAfterLogin = () => {

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

    /*  try
  {
    const response = await axios.post("http://localhost:8000/logout", {},
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: "Bearer " + localStorage.getItem("user") }
    });
    
  }
  catch(err)
  {
      alert(err);
  } */
    
    localStorage.clear();
    
    navigate("/home");

  }

  return (
    <nav className={`container ${styles.nav_bar}`}>
      <ul className={styles.nav_items}>
        <li className={styles.nav_item}>
          <NavLink to='/' style={navLinkStyles}>
            Home
          </NavLink>
        </li>
        <li className={styles.nav_item}>
          <NavLink to='/searchTrain' style={navLinkStyles}>
            Book Tickets
          </NavLink>
        </li>
        <li className={styles.nav_item}>
          <NavLink to='/viewBookings' style={navLinkStyles}>
            View Bookings
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

export default NavbarAfterLogin;
