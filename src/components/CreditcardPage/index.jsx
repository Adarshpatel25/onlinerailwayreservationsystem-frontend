import React, { useState } from 'react';
import axios from 'axios';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import styles from './CreditCardPage.module.css';
import { useNavigate } from 'react-router-dom';


const PaymentForm = () => {
  const [state, setState] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
  });


  const email = localStorage.getItem("email");
  const trainNo = localStorage.getItem("trainNo");
  const trainName = localStorage.getItem("trainName");
  const fromStation = localStorage.getItem("fromStation");
  const toStation = localStorage.getItem("toStation");
  const seatCoach = localStorage.getItem("seatCoach");
  const passengersList = JSON.parse(localStorage.getItem("passengerDetails"));
  const amount = localStorage.getItem("amount");
  const time = localStorage.getItem("time");
  const date = localStorage.getItem("date");
  const reservationDate = localStorage.getItem("reservationDate");

  
  const navigate = useNavigate();

  const processPayment = () => {
    
      	axios.post("http://localhost:8000/booking/handleBooking",
        {
		    email: email,
		    trainNo: trainNo,
	    	trainName: trainName,
		    fromStation: fromStation,
		    toStation: toStation,
		    passengerDetails: passengersList,
		    amount: amount,
		    seatCoach: seatCoach,
		    time: time,
		    date: date,
		    reservationDate: reservationDate
      },
      {
        'headers': {
          'Content-Type': 'application/json'
        }
      }
      ).catch((error) => {
          if(error.response) {
            alert("Response Error Code " + error.response.status);
          }
          else if(error.request) {
            alert("No Response received from Server");
          }
          else {
            alert("Something went wrong " + error.data);
          }
      });
      alert("Booking Successful");
      navigate("/");    
  }

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    
    setState((prev) => ({ ...prev, [name]: value }));
  }

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  }

  return (
    <div className={styles.paymentContainer}>
    <div className={styles.card}>
      <Cards
        number={state.number}
        expiry={state.expiry}
        cvc={state.cvc}
        name={state.name}
        focused={state.focus}
      />
      </div>
      <div className={styles.formContainer}>
      <form onSubmit={processPayment} >
        <input
          type="number"
          name="number"
          placeholder="Card Number"
          value={state.number}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <input
          type="text"
          name="name"
          placeholder="Name on Card"
          value={state.name}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <input
          type="number"
          name="expiry"
          placeholder="Card Expiry Date"
          value={state.expiry}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <input
          type="number"
          name="cvc"
          placeholder="Card CVC/CVV"
          value={state.cvc}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <div className={styles.buttonContainer}>
            <button type='submit' className={styles.button}>Confirm Payment</button>
        </div>
      </form>
      </div>
    </div>
  );
}

export default PaymentForm;