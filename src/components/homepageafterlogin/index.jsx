import React from 'react';
import styles from './HomeAfterLogin.module.css';
import 'bootstrap';
import NavbarAfterLogin from '../navbarafterlogin';
import Navbar from '../navbar';

const HomePageAfterLogin = () => {

  const loggedIn = localStorage.getItem('user');

  return (
    <>
    {loggedIn?<NavbarAfterLogin/>:<Navbar/>}
    <section className={styles.container}>
      <div className={styles.hero_wrapper}>
        <div className={styles.hero_section}>
          <div className='row'>
            <div className='col-md-12'>
              <div className='top_left_cont zoomIn wow animated'>
                <h2 className={styles.title}>
                  Railway Ticket <strong>Reservation</strong> System
                </h2>
                <p className={styles.sub_title}>
                  Book Your Tickets Here. <br/>
                </p>
                <a href='/searchTrain' className={`btn ${styles.book_btn}`}>
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

export default HomePageAfterLogin;
