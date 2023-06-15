import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from './ViewBookings.module.css';
import { useNavigate } from "react-router-dom";
import CancelTicket from "./CancelTicket";

const ViewBookings = () => {

    const [myBookings, setMyBookings] = useState([{
        email: "",
        pnrNo: "",
        trainNo: "",
        trainName: "",
        fromStation: "",
        toStation: "",
        passengerDetails:[],
        amount: "",
        seatCoach: "",
        time: "",
        date: "",
        reservationDate: "",
        isCancelled: ""
    }]);

    const email = localStorage.getItem('email');

    useEffect(() => {

        axios.get(`http://localhost:8000/booking/viewBookings?email=${email}`).then((response) => {
            setMyBookings(response.data);
        }).catch((error) => {
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

    }, []);



    return (
        <>
        <div className={styles.container}>
		    <div className={styles.showBookings}>

			    {myBookings.map((booking) => (
                    <div className={styles.booking}>
					    <div className={styles.passengerAndTrain}>
                            <span className={styles.pnrNo}>PNR No :- {booking.pnrNo}</span>
                            <h4 className={styles.h4}>{booking.trainName} | {booking.trainNo}</h4>
					        <span className={styles.fromStation}>{booking.fromStation}</span> <span
						    className={`material-symbols-outlined ${styles.arrow}`}> east </span> <span
						    className={styles.toStation}>{booking.toStation}</span>
                            <span className={styles.passengerDetailsLabel}>Passenger details:</span>
                            
                            <div className={styles.passenger}>
                            
                            {booking.passengerDetails.map((passenger) => ( 
                                <span className={styles.passengerDetails}>{passenger.passengerName}, {passenger.passengerAge} y/o
                                <span className={styles.seatDetails}>Seat No:- {passenger.seatNo}, Seat Coach:- {booking.seatCoach}</span>
                                </span>
                            ))
                            }
                            </div>

                        </div>
                        <div className={styles.transactionDetails}>
                            <span className={styles.ticketFee}>Ticket Fee: {booking.amount}</span>
                            <span className={styles.transactionLabel}>Transaction made at:</span>
                            <span className={styles.time}>{booking.time}</span>
					        <span className={styles.date}>{booking.date}</span>
                        </div>
                        
                        <CancelTicket isCancelled={booking.isCancelled} pnrNo={booking.pnrNo} refundAmount={Number(booking.amount)*0.6}/>
                        
				    </div>
                ))
                }
		    </div>
	    </div>
        </>
    );

};

export default ViewBookings;