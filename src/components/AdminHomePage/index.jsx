import React from 'react';
import styles from './AdminHomePage.module.css';
import AdminNavbar from '../AdminNavbar';
import { useEffect } from 'react';
import { useState } from 'react';
import Navbar from '../navbar';
import { useNavigate } from 'react-router-dom';

const AdminHomePage = () => {

  const isAdmin = useState(localStorage.getItem("isAdmin"));

  const navigate = useNavigate();

  if(!isAdmin) {
      navigate("/");
  }


  return (
    <>
    {(isAdmin ) ?<AdminNavbar/>:<Navbar/>}
    <section class={styles.container}>
      <div class={styles.hero_wrapper}>
        <div class={styles.hero_section}>
          <div class='row'>
            <div class='col-md-12'>
              <div class='top_left_cont zoomIn wow animated'>
                <h2 className={styles.title}>
                  Railway Ticket <strong>Reservation</strong> System
                </h2>
                <p className={styles.sub_title}>
                  Admin Page <br />
                </p>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default AdminHomePage;
