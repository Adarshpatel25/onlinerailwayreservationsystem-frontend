import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import styles from './TrainResult.module.css';
import { useNavigate } from "react-router-dom";
import NavbarAfterLogin from "../navbarafterlogin";
import Navbar from "../navbar";

const TrainResult = (props) => {
    const [trainsList, setTrainsList] = useState([{
        trainNo: "",
        trainName: "",
        fromStationTiming: "",
        toStationTiming: "",
        fromStation: "",
        toStation: ""
    }]);

    const loggedIn = localStorage.getItem('user');

    const navigate = useNavigate();
    
    const fromStation = localStorage.getItem('fromStation');
    const toStation = localStorage.getItem('toStation');

    useEffect(() => {
        
        axios.get(`http://localhost:8000/handleSearch?from=${fromStation}&to=${toStation}`).then((response) => {
            setTrainsList(response.data);
    
        });

    }, [fromStation, toStation]);


    return (
        <>
        {loggedIn?<NavbarAfterLogin/>:<Navbar/>}
        <div className={styles.form_container}>
		    <h1>Available Trains</h1> 
		    <table>
                <tr>    
                    <th>Train Number</th>
                    <th>Train Name</th>
                    <th>Start time</th>
                    <th>Destination time</th>
                    <th>Select Train</th>
                </tr>
                {
                    trainsList.map( (train) => (
                        <tr>
                            <th>{train.trainNo}</th>
                            <th>{train.trainName}</th>
                            <th>{train.fromStationTiming}</th>
                            <th>{train.toStationTiming}</th>
                            <th><button onClick={(event) => {
                                 if(localStorage.getItem('user')) {
                                
                                    localStorage.setItem('trainNo', train.trainNo);
                                    localStorage.setItem('trainName', train.trainName);
                                    localStorage.setItem('fromStation', train.fromStation);
                                    localStorage.setItem('toStation', train.toStation);
                                    localStorage.setItem('fromStationTiming', train.fromStationTiming);
                                    localStorage.setItem('toStationTiming', train.toStationTiming);
                            
                                navigate("/bookTickets");
                                }
                                else {
                                    navigate("/login");
                                }
                            }}>Select</button></th>
                        </tr>
                    ))
                }

            </table>
	    </div>

        </>
    );

};

export default TrainResult;