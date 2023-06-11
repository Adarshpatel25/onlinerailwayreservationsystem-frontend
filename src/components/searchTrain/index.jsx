import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from './SearchTrain.module.css';
import { useNavigate } from "react-router-dom";
import NavbarAfterLogin from "../navbarafterlogin";
import Navbar from "../navbar";

const SearchTrain = () => {

    const [destinationsList, setDestinationsList] = useState([]);
    const [fromStation, setFromStation] = useState();
    const [toStation, setToStation] = useState();
    const [seatCoach, setSeatCoach] = useState();
    
    const loggedIn = localStorage.getItem('user');


    const navigate = useNavigate();

 
    const handleSearch = () => {
        localStorage.setItem('fromStation', fromStation);
        localStorage.setItem('toStation', toStation);
        localStorage.setItem('seatCoach', seatCoach);
        navigate('/trainResult');
    };

    useEffect(() => {
        axios.get("http://localhost:8000/searchTrain").then((response) => {
            setDestinationsList(response.data);
        });
        
    }, []); 

    return (
        <div>
        {loggedIn?(<NavbarAfterLogin/>):(<Navbar    />)}
        <div className={styles.form_container}>
		<h1 className={styles.h1}>Search Trains</h1>

		<form className={styles.form}>
			<label className={styles.label} for="from">From Station:</label><br/>
			<select key="select1" id="from" className={styles.from} value={fromStation} onChange={(event) => setFromStation(event.target.value)}>
                <option>Select Onboarding Station</option>
               {destinationsList.map((destination) => (
                    <option>{destination}</option>
                ))
                }
            </select> <br/> 
                
            <label className={styles.label} for="to">To Station:</label><br/>               
			<select key="select2" id="to" className={styles.to} value={toStation} onChange={(event) => setToStation(event.target.value)}>
                <option>Select Destination Station</option>
                {destinationsList.map((destination) => (
                    <option>{destination}</option>
                ))
                }

			</select>   

            <label className={styles.label} for="seatCoach">Seat Coach:</label><br/>   
            <select key="select3" id="seatCoach" className={styles.seatCoach} value={seatCoach} onChange={(event) => setSeatCoach(event.target.value)}>
                <option>Select Your Coach Class</option>
                <option>First Class</option>
                <option>Second Class</option>
                <option>Third Class</option>
            </select>

			<div className={styles.btn}>
				<button type="submit" className={styles.search} onClick={handleSearch} >Search</button>
			</div>
		</form>
	    </div>
        </div>
    );

};

export default SearchTrain;