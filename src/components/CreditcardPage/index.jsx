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

  const [numberError, setNumberError] = useState();
  const [expiryError, setExpiryError] = useState();
  const [cvcError, setCvcError] = useState();
  

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
      setState({
        number: '',
        expiry: '',
        cvc: '',
        name: '',
        focus: '',
      });
      navigate("/");    
  }

  const handleNumberInput = (event) => {
      const cardNumber = String(event.target.value);

      if(cardNumber.length > 16) {
        setNumberError("Card Number Should Not exceed 16 digits");
      }
      else {
        setNumberError(undefined);
        setState((prev) => ({...prev, number: event.target.value}));
      }
  }

  
  const handleExpiryInput = (event) => {
    const expiry = String(event.target.value);
  

    if(expiry.length == 3 && (Number(expiry.slice(0, 2)) > 12 || expiry.slice(0, 2) == "00")) {
      setExpiryError("Expiry month should be valid");
    }
    else if(expiry.length > 4) {
        setExpiryError("Expiry Date should be valid");
    }
    else {
      setExpiryError(undefined);
      setState((prev) => ({...prev, expiry: event.target.value}));
      if(expiry.length == 4) {
        const expiryMonth = String(event.target.value).slice(0, 2);
        const expiryYear = String(event.target.value).slice(2);
  
        const currentMonth = String(new Date().getMonth());
        const currentYear = String(new Date().getFullYear()).slice(2, 4);
    
        if(Number(expiryYear) < Number(currentYear)) {
          setExpiryError("Your Card is expired");
        }
        else if(Number(expiryMonth) <= Number(currentMonth) && Number(expiryYear) == Number(currentYear)) {
          setExpiryError("Your Card is expired");
        }
  
      }
    }
  }

  const handleCvcInput = (event) => {
    const cvc = String(event.target.value);

    if(cvc.length > 3) {
      setCvcError("Cvc should not contain more than 3 digits");
    }
    else {
      setCvcError(undefined);
      setState((prev) => ({...prev, cvc: event.target.value}));
    }
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
      <form onSubmit={processPayment} >
      <div className={styles.formContainer}>
        <input
          type="number"
          name="number"
          placeholder="Card Number"
          value={state.number}
          onChange={handleNumberInput}
          onFocus={handleInputFocus}
        />
        {numberError && <p className={styles.errorMessage}>{numberError}</p>}
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
          onChange={handleExpiryInput}
          onFocus={handleInputFocus}
        />
        {expiryError && <p className={styles.errorMessage}>{expiryError}</p>}
        <input
          type="password"
          name="cvc"
          placeholder="Card CVC/CVV"
          value={state.cvc}
          onChange={handleCvcInput}
          onFocus={handleInputFocus}
        />
        {cvcError && <p className={styles.errorMessage}>{cvcError}</p>}
      </div>
      <div className={styles.buttonContainer}>
            <button type='submit' className={styles.button}>Confirm Payment</button>
        </div>
        </form>
    </div>
  );
}

export default PaymentForm;