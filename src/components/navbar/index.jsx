import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = (props) => {
  const navLinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? 'bold' : 'normal',
      textDecoration: isActive ? 'underline' : 'none',
    };
  };
  return (
    <nav className={`container ${styles.nav_bar}`}>
      <ul className={styles.nav_items}>
        <li className={styles.nav_item}>
          <NavLink to='/' style={navLinkStyles}>
            Home
          </NavLink>
        </li>
        
        {/*
        <li className={styles.nav_item}>
          <NavLink to='/searchTrain' style={navLinkStyles}>
            Search Trains
          </NavLink>
        </li>

        <li className={styles.nav_item}>
          <NavLink to='/about' style={navLinkStyles}>
            About
          </NavLink>
        </li>
        <li className={styles.nav_item}>
          <NavLink to='/contact' style={navLinkStyles}>
            Contact
          </NavLink>
        </li> */}
      </ul>

      <div>
        <NavLink to='/login' style={navLinkStyles}>
          Login
        </NavLink>
        
      </div>
      
      
    </nav>
  );
};

export default Navbar;
