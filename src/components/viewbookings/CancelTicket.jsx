import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from './ViewBookings.module.css';
import { useNavigate } from "react-router-dom";

const CancelTicket = (props) => {

    const [cancelled, setCancelled] = useState(props.isCancelled);
    const [showPopup, setShowPopup] = useState(false);

    const refundAmount = String(props.refundAmount);
    const pnrNo = String(props.pnrNo);
    console.log(pnrNo + " " + refundAmount);

    const handleConfirm = () => {
        axios.post(`http://localhost:8000/booking/cancelTicket?pnrNo=${pnrNo}&refundAmount=${refundAmount}`, 
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

        setCancelled(true);
        alert(`Ticket Cancellation Successful! Refund amount ${props.refundAmount}Rs processed.`);
    };


    const Popup = () => {
        return (showPopup && 
            <>
            <div className={styles.popup} onClick={() => setShowPopup(false)}></div>
            <div className={styles.popupContainer}>
                Are you sure you want to cancel your booking?
                <button onClick={handleConfirm} className={styles.confirmCancel}>Confirm</button>
                <button onClick={() => setShowPopup(false)} className={styles.goBack}>Go Back</button>
            </div>
            </>
        )
    }

    if(props.isCancelled == false && cancelled == false) {
        return (
            <>
            <button className={styles.cancelButton} onClick={() => setShowPopup(true)} >
                Cancel Ticket
           </button>
           <Popup/>
           </>
        )
    }

   

    return (
        <>
        <button className={styles.cancelled} >
            Ticket Cancelled
        </button>
        </>
    );
    
}

export default CancelTicket;