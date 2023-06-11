import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from './BookTickets.module.css';
import { Navigate, useNavigate } from "react-router-dom";
import { useRef } from "react";


const BookTickets = () => {

	const email = localStorage.getItem('email');
	const trainNo = localStorage.getItem('trainNo');
	const trainName = localStorage.getItem('trainName');
	const fromStation = localStorage.getItem('fromStation');
	const toStation = localStorage.getItem('toStation');
	const fromStationTiming = localStorage.getItem('fromStationTiming');
	const toStationTiming = localStorage.getItem('toStationTiming');
	const seatCoach = localStorage.getItem('seatCoach');

	const navigate = useNavigate();
	
	const [amount, setAmount] = useState();
	const [reservationDate, setReservationDate] = useState();
	

	const [countOfPassengers, setCountOfPassengers] = useState(1);

	useEffect(() => {
		try {
			const response = axios.get(`http://localhost:8000/booking/selectBooking?trainName=${trainName}&fromStation=${fromStation}&toStation=${toStation}`).then((response) => {
	 		const feesInNum = Number(response.data);
			
			if(seatCoach == "First Class") {
				setAmount(feesInNum*2.5);
			}
			else if(seatCoach == "Second Class") {
				setAmount(feesInNum*1.8);
			}
			else if(seatCoach == "Third Class") {
				setAmount(feesInNum*1);
			}
			console.log(amount);
			
	 	});
		}
		catch(err) {
			alert("Error");
		}

	 	}, [amount]);
		
	function save(event)
  	{
		const time = new Date().toLocaleTimeString();
		const date = new Date().toLocaleDateString();

		setAmount(amount*countOfPassengers);
     	event.preventDefault();
		
		const passengersList = [];
		if(countOfPassengers == 1) {
			passengersList.push({passengerName: passengerName1, passengerAge: passengerAge1});
		}
		else if(countOfPassengers == 2) {
			passengersList.push({passengerName: passengerName1, passengerAge: passengerAge1});
			passengersList.push({passengerName: passengerName2, passengerAge: passengerAge2});
		}
		else if(countOfPassengers == 3) {
			passengersList.push({passengerName: passengerName1, passengerAge: passengerAge1});
			passengersList.push({passengerName: passengerName2, passengerAge: passengerAge2});
			passengersList.push({passengerName: passengerName3, passengerAge: passengerAge3});
		}
		else if(countOfPassengers == 4) {
			passengersList.push({passengerName: passengerName1, passengerAge: passengerAge1});
			passengersList.push({passengerName: passengerName2, passengerAge: passengerAge2});
			passengersList.push({passengerName: passengerName3, passengerAge: passengerAge3});
			passengersList.push({passengerName: passengerName4, passengerAge: passengerAge4});
		}
		else if(countOfPassengers == 5) {
			passengersList.push({passengerName: passengerName1, passengerAge: passengerAge1});
			passengersList.push({passengerName: passengerName2, passengerAge: passengerAge2});
			passengersList.push({passengerName: passengerName3, passengerAge: passengerAge3});
			passengersList.push({passengerName: passengerName4, passengerAge: passengerAge4});
			passengersList.push({passengerName: passengerName5, passengerAge: passengerAge5});
		}
	
		/* localStorage.setItem("email", email);
		localStorage.setItem("trainNo", trainNo);
		localStorage.setItem("trainName", trainName);
		localStorage.setItem("fromStation", fromStation);
		localStorage.setItem("toStation", toStation); 
		localStorage.setItem("seatCoach", seatCoach); */
		localStorage.setItem("passengerDetails", JSON.stringify(passengersList));
		localStorage.setItem("amount", amount*countOfPassengers);
		localStorage.setItem("time", time);
		localStorage.setItem("date", date);
		localStorage.setItem("reservationDate", reservationDate);

		navigate("/payment");
		  
 	}

	const [passengerName1, setPassengerName1] = useState("");
	const [passengerAge1, setPassengerAge1] = useState("");

	const [passengerName2, setPassengerName2] = useState("");
	const [passengerAge2, setPassengerAge2] = useState("");

	const [passengerName3, setPassengerName3] = useState("");
	const [passengerAge3, setPassengerAge3] = useState("");

	const [passengerName4, setPassengerName4] = useState("");
	const [passengerAge4, setPassengerAge4] = useState("");

	const [passengerName5, setPassengerName5] = useState("");
	const [passengerAge5, setPassengerAge5] = useState("");


 	const handleAddPassenger = (event) => {
		event.preventDefault();
		const prevPassenger = document.getElementById(`p${countOfPassengers}`);
		const value1 = prevPassenger.childNodes[0].value;
		const value2 = prevPassenger.childNodes[1].value;

		if(countOfPassengers <= 4 && (value1 != "" || value2 != "")) {
			const passenger = document.getElementById(`p${countOfPassengers+1}`);

			if(countOfPassengers >= 3) {
				const container = document.getElementById("container");
				const mini2 = document.getElementById("mini2");
				if(countOfPassengers == 3) {
					container.style.height = "640px";
					mini2.style.height = "360px";
				}
				else if(countOfPassengers == 4) {
					container.style.height = "680px";
					mini2.style.height = "400px";	
				}
			}

			
			passenger.style.visibility = "visible";
			passenger.style.display = "block";
			
			setCountOfPassengers(countOfPassengers+1);
			console.log(countOfPassengers);
		}
		else if(countOfPassengers <= 4 && (value1 == "" || value2 == "")) {
			alert("Please Enter current passenger Details before adding next passenger");
		}
		else {
			alert("Sorry, but you cannot add more than 5 passengers");
		}
	}
 
    return (
        <>
        <div className={styles.container} id="container">
		<form>
			<div className={styles.mini1}>
				<span className={styles.trainNo}>{trainNo}</span> | <span className={styles.trainName}>{trainName}</span>
				<span className={styles.fromTiming}>{fromStationTiming}</span> <span
					className={styles.fromStation}>{fromStation}</span> <span className={styles.toTiming}>{toStationTiming}</span>
				<span className={styles.toStation}>{toStation}</span> <label for="date" className={styles.label}>Enter
					Date of Travel</label> <input type="date" value={reservationDate} className={styles.date} onChange={ (event) => setReservationDate(event.target.value)}/>
			</div>
			<div className={styles.mini2} id="mini2">
				<h3 className={styles.h3}>Passenger Details</h3>
				<div className={styles.passengerContainer}>
				
				<div className={styles.passenger} id="p1" >
				<input type="text" className={styles.input1} placeholder="Passenger Name" value={passengerName1} onChange={ (event) => setPassengerName1(event.target.value)}/> 
				<input type="number" className={styles.input1} placeholder="Passenger Age" value={passengerAge1} onChange={ (event) => setPassengerAge1(event.target.value)}/>
				</div>
				 
				<div className={styles.passenger} id="p2">
				<input type="text" className={styles.input1} placeholder="Passenger Name" value={passengerName2} onChange={(event) => setPassengerName2(event.target.value)}/> 
				<input type="number" className={styles.input1} placeholder="Passenger Age" value={passengerAge2} onChange={(event) => setPassengerAge2(event.target.value)}/>
				<button className={styles.removePassenger} onClick={(event) => 
					{event.preventDefault(); const passenger = document.getElementById("p2"); passenger.style.visibility = "hidden"; passenger.style.display = "none"; setPassengerAge2(""); setPassengerName2(""); setCountOfPassengers(countOfPassengers-1);}}><span class="material-symbols-outlined">close</span></button>
				</div>
				
				<div className={styles.passenger} id="p3">
				<input type="text" className={styles.input1} placeholder="Passenger Name" value={passengerName3} onChange={(event) => setPassengerName3(event.target.value)}/> 
				<input type="number" className={styles.input1} placeholder="Passenger Age" value={passengerAge3} onChange={(event) => setPassengerAge3(event.target.value)}/>
				<button className={styles.removePassenger} onClick={(event) => 
					{event.preventDefault(); const passenger = document.getElementById("p3"); passenger.style.visibility = "hidden"; passenger.style.display = "none"; setPassengerAge3(""); setPassengerName3(""); setCountOfPassengers(countOfPassengers-1);
					const container = document.getElementById("container");
					const mini2 = document.getElementById("mini2");
					if(countOfPassengers == 3) {
						container.style.height = "640px";
						mini2.style.height = "360px";
					}
					else if(countOfPassengers == 2) {
						container.style.height = "680px";
						mini2.style.height = "400px";
					}}}><span class="material-symbols-outlined">close</span></button>
				</div>

				<div className={styles.passenger} id="p4">
				<input type="text" className={styles.input1} placeholder="Passenger Name" value={passengerName4} onChange={(event) => setPassengerName4(event.target.value)}/> 
				<input type="number" className={styles.input1} placeholder="Passenger Age" value={passengerAge4} onChange={(event) => setPassengerAge4(event.target.value)}/>
				<button className={styles.removePassenger} onClick={(event) => 
				{event.preventDefault(); const passenger = document.getElementById("p4"); passenger.style.visibility = "hidden"; passenger.style.display = "none"; setPassengerAge4(""); setPassengerName4(""); setCountOfPassengers(countOfPassengers-1);
				const container = document.getElementById("container");
				const mini2 = document.getElementById("mini2");
				if(countOfPassengers == 3) {
					container.style.height = "640px";
					mini2.style.height = "360px";
				}
				else if(countOfPassengers == 2) {
					container.style.height = "680px";
					mini2.style.height = "400px";
				}}}
				><span class="material-symbols-outlined">close</span></button>
				</div>

				<div className={styles.passenger} id="p5">
				<input type="text" className={styles.input1} placeholder="Passenger Name" value={passengerName5} onChange={(event) => setPassengerName5(event.target.value)}/> 
				<input type="number" className={styles.input1} placeholder="Passenger Age" value={passengerAge5} onChange={(event) => setPassengerAge5(event.target.value)}/>
				<button className={styles.removePassenger} onClick={(event) => 
					{event.preventDefault(); const passenger = document.getElementById("p5"); passenger.style.visibility = "hidden"; passenger.style.display = "none";  setPassengerAge5(""); setPassengerName5(""); setCountOfPassengers(countOfPassengers-1);
					const container = document.getElementById("container");
					const mini2 = document.getElementById("mini2");
					if(countOfPassengers == 3) {
						container.style.height = "640px";
						mini2.style.height = "360px";
					}
					else if(countOfPassengers == 2) {
						container.style.height = "680px";
						mini2.style.height = "400px";
					}
					}}>
						<span class="material-symbols-outlined">close</span></button>
				</div>

				</div>

				<button className={styles.addNew} id="addNew" onClick={handleAddPassenger}>Add Passenger</button>

				{/* <div className={styles.button}>

					<label for="radio" className={styles.label1}><span className={styles.class}>First Class</span> <span
						className={styles.fees}>Fare: {ticketFee*2.5}</span></label> <input type="radio" className={styles.input2} id="radio"
						value="First Class" onChange={(e) => setSeatCoach(e.target.value)} checked={seatCoach === 'First Class'}/>

				</div>
				<div className={styles.button}>
					<label for="radio" className={styles.label1}><span className={styles.class}>Second Class</span> <span
						className={styles.fees}>Fare: {ticketFee*1.8}</span> </label> <input type="radio" className={styles.input2} id="radio"
						value="Second Class" onChange={(e) => setSeatCoach(e.target.value)} checked={seatCoach === 'Second Class'} />
				</div>
				<div className={styles.button}>
					<label for="radio" className={styles.label1}><span className={styles.class}>Third Class</span> <span
						className={styles.fees}>Fare: {ticketFee}</span> </label> <input type="radio" className={styles.input2} id="radio"
						value="Third Class" onChange={(e) => setSeatCoach(e.target.value)} checked={seatCoach === 'Third Class'}/>
				</div> */}
			
				<div className={styles.fees}>
					<span className={styles.feeAmount}>Your Total Fee Amount: {countOfPassengers*amount}</span>
				</div>

			</div>
			<div className={styles.btn_cont}>
				
				<button type="submit" className={styles.btn} onClick={save}>Proceed to Payment</button>
			</div>
		
		</form>
		</div>
        </>
    );

}

export default BookTickets;