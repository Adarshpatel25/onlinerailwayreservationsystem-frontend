import React from 'react';
import styles from './Home.module.css';
import 'bootstrap';
import Navbar from '../navbar';
import NavbarAfterLogin from '../navbarafterlogin';
import { useEffect } from 'react';
import { useState } from 'react';

const Home = () => {

  const loggedIn = useState(localStorage.getItem("user"));

  const expiry = localStorage.getItem('expiry');
  const currentTime = new Date().getTime();


  return (
    <>
    {(loggedIn) ?<NavbarAfterLogin/>:<Navbar/>}
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
                  Book Your Tickets Here. <br />
        
                </p>
                <a href='/login' class={`btn ${styles.book_btn}`}>
                  Book Tickets
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Home;
