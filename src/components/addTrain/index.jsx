import React from 'react';
import styles from './AddTrain.module.css';
import AdminNavbar from '../AdminNavbar';
import { useEffect } from 'react';
import { useState } from 'react';
import Navbar from '../navbar';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { addTrainSchema } from '../../schemas';
import axios from 'axios';


const AddTrain = () => {


    const [destinationsList, setDestinationsList] = useState([]);

    const initialValues = { trainName: "", fromStation: "", toStation: "", startTiming: ""};

    const isAdmin = useState(localStorage.getItem("isAdmin"));

    const navigate = useNavigate();
  
    if(!isAdmin) {
        navigate("/");
    }


    const {values, errors, handleChange, handleSubmit} = useFormik({
        initialValues: initialValues,
        validationSchema: addTrainSchema,
        onSubmit: (values) => {
      
            axios.post("http://localhost:8000/admin/addTrain",
            {
              trainName: values.trainName,
              fromStation: values.fromStation,
              toStation: values.toStation,
              startTiming: values.startTiming
            },
            { 
              'headers': {
               'Content-Type': 'application/json'
              }
            }
            ).catch((error) => {
              if(error.response) {
                alert("Response Error Code " + error.response.status);
                console.log(error.response);
                navigate("/addTrain");
              }
              else if(error.request) {
                alert("No Response received from Server");
                console.log(error.request);
                navigate("/addTrain");
              }
              else {
                alert("Something went wrong " + error.data);
                console.log(error);
                navigate("/addTrain");
              }
            });
            
            alert("Train Successfully Added!")
            navigate("/manageTrain");
          }
      });
   

    useEffect(() => {
        axios.get("http://localhost:8000/booking/searchTrain").then((response) => {
            setDestinationsList(response.data);
        });

    }, []);



    return (
        <div>
        {isAdmin?(<AdminNavbar/>):(<Navbar/>)}
        <div className={styles.form_container}>
		<h1 className={styles.h1}>Add Train</h1>

		<form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.label} for="trainName">Train Name:</label><br/>
            <input type="text" className={styles.input} name="trainName" value={values.trainName} onChange={handleChange} placeholder='Enter Train Name'/>
            <p className={styles.errorForValidation}>{errors.trainName}</p>


			<label className={styles.label} for="from">From Station:</label><br/>
			<select key="select1" id="from" className={styles.from} name="fromStation" value={values.fromStation} onChange={handleChange}>
                <option>Select Starting Station</option>
               {destinationsList.map((destination) => (
                    <option>{destination}</option>
                ))
                }
            </select> <br/> 
            <p className={styles.errorForValidation}>{errors.fromStation}</p>   

            <label className={styles.label} for="to">To Station:</label><br/>               
			<select key="select2" id="to" className={styles.to} name="toStation" value={values.toStation} onChange={handleChange}>
                <option>Select Ending Station</option>
                {destinationsList.map((destination) => (
                    <option>{destination}</option>
                ))
                }

			</select>   
            <p className={styles.errorForValidation}>{errors.toStation}</p>


            <label for="timing" className={styles.label}>Enter Train Start Time:</label>
            <input type="text" className={styles.input} name="startTiming" value={values.startTiming} onChange={handleChange}/>
            <p className={styles.errorForValidation}>{errors.startTiming}</p>
            
            <div className={styles.btn}>
                <button type="submit" className={styles.button}>Submit</button>
            </div>
		</form>
	    </div>
        </div>
    );

}

export default AddTrain;