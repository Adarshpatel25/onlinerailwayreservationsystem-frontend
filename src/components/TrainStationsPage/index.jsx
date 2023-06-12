import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from './TrainStationsPage.module.css';
import { useNavigate } from "react-router-dom";
import NavbarAfterLogin from "../navbarafterlogin";
import Navbar from "../navbar";


const TrainStationsPage = () => {

    const [stationsList, setStationsList] = useState([]);

    const trainNo = localStorage.getItem("trainNo");
    const trainName = localStorage.getItem("trainName");
    const fromStation = localStorage.getItem("fromStation");
    const toStation = localStorage.getItem("toStation");

    var sequenceNo = 1;

    const navigate = useNavigate();

    useEffect(() => {

        axios.get(`http://localhost:8000/booking/getDestinations?trainNo=${trainNo}&fromStation=${fromStation}&toStation=${toStation}`)
        .then(response => {
            setStationsList(response.data);
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

    const departureTime = (destinationTime) => {
        const time = String(destinationTime);
        const hour = time.slice(0, 3);
        const minutes = time.slice(3, 4);
        if(Number(minutes) < 58) {
            return String(hour) + String(minutes+2);
        }
        else if(Number(minutes) == 58) {
            if(Number(hour) < 23) { 
                return String(hour+1) + "00";
            }
            else if(Number(hour) == 23) {
                return "00:00";
            }
        }
        else if(Number(minutes) == 59) {
            if(Number(hour) < 23) {
                return (String(hour+1) + "01")
            }
            else if(Number(hour) == 23) {
                return "00:01";
            }
        }

    }



    const loggedIn = localStorage.getItem("user");

    return (
        <>
        {loggedIn?<NavbarAfterLogin/>:<Navbar/>}
        <div className={styles.trainContainer}>
            <div className={styles.trainDetailsContainer}>
		    <h2 className={styles.h2}>Train Details</h2> 
		    <table className={styles.table1}>
                <tr>    
                    <th>Train Number</th>
                    <th>Train Name</th>
                    <th>From Station</th>
                    <th>Destination Station</th>
                </tr>

                <tr>
                    <td>{trainNo}</td>
                    <td>{trainName}</td>
                    <td>{fromStation}</td>
                    <td>{toStation}</td>
                </tr>
            </table>
	    </div>

        <div className={styles.scheduleContainer}>
		    <h2 className={styles.h2}>Train Schedule Details</h2> 
		    <table className={styles.table2}>
                <tr>    
                    <th>Station No.</th>
                    <th>Station Name</th>
                    <th>Arrival Time</th>
                    <th>Departure Time</th>
                </tr>
                { 
                    stationsList.map((station) => (
                        <tr>    
                            <td>{sequenceNo++}</td>
                            <td>{station.destinationName}</td>
                            <td>{station.destinationTime}</td>
                            <td>{departureTime(station.destinationTime)}</td>
                           
                        </tr>
                    ))
                }
                
            </table>
	     </div>

        </div>
        </>
    );

}

export default TrainStationsPage;