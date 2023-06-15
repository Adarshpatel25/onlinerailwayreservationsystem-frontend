import React, {useEffect, useState} from 'react';
import axios from 'axios';
import styles from './ManageTrains.module.css';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../AdminNavbar';
import Navbar from '../navbar';

const ManageTrains = () => {

    const [trainsList, setTrainsList] = useState([]);

    const isAdmin = useState(localStorage.getItem("isAdmin"));

    const navigate = useNavigate();
  
    if(!isAdmin) {
        navigate("/");
    }

    useEffect(() => {   
        const response = axios.get('http://localhost:8000/admin/viewTrains').then((response) => {
            setTrainsList(response.data);
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
         {(isAdmin ) ?<AdminNavbar/>:<Navbar/>}
            <div className={styles.form_container}>
		    <h1>Trains List</h1> 
		    <table>
                <tr>    
                    <th>Train Number</th>
                    <th>Train Name</th>
                    <th>From Station</th>
                    <th>From Station Timing</th>
                    <th>To Station</th>
                    <th>To Station Timing</th>
                    <th>Remove Train</th>
                </tr>
                {
                    trainsList.map( (train) => (
                        <tr>
                            <th>{train.trainNo}</th>
                            <th>{train.trainName}</th>
                            <th>{train.fromStation}</th>
                            <th>{train.fromStationTiming}</th>
                            <th>{train.toStation}</th>
                            <th>{train.toStationTiming}</th>
                            <th><button className={styles.button} onClick={(event) => {
                                    axios.delete(`http://localhost:8000/admin/deleteTrain/${train.trainNo}`).catch((error) => {
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
                                      window.location.reload();  
                                      alert('Train Successfully Removed from Database');
                                }
                            }>Remove</button>
                            </th>
                            
                        </tr>
                    ))
                }

            </table>

            <div className={styles.addTrainContainer}>
                <button className={styles.addTrainButton} onClick={() => navigate("/addTrain")}>Add Train</button>
            </div>

	    </div>

        </>
    );

}

export default ManageTrains;