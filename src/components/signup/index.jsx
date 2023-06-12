import React, { useEffect, useState } from 'react';
import axios from "axios";
import styles from './Signup.module.css';
import { Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Formik, useFormik } from 'formik';
import { signUpSchema } from '../../schemas';


const Signup = () => {

  const initialValues = { name: "", email: "", password: "", confirmPassword: "", age: "", gender: "" };

  const navigate = useNavigate();

  const {values, errors, handleChange, handleSubmit} = useFormik({
    initialValues: initialValues,
    validationSchema: signUpSchema,
    onSubmit: (values) => {
    
        axios.post("http://localhost:8000/handleRegistration",
        {
        name: values.name,
        email: values.email,
        password: values.password,
        age: values.age,
        gender: values.gender
        },
        {
          'headers': {
          'Content-Type': 'application/json'
          }
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
        navigate("/login");
      }
     
    } );



  return (
    <>
    <Navbar/>
    <div className={`${styles.container} ${styles.sign_up}`}>
      <h1 className={styles.title}>Register Here</h1>

      <form className={styles.form_container} onSubmit={handleSubmit}>
        <label for='name' className={styles.label}>
          Full Name:
        </label>
        <input type='text' id='name' name='name' value={values.name}
        onChange={handleChange} />
        <p className={styles.errorForValidation}>{errors.name}</p>
        
        <label for='email' className={styles.label}>
          Email Address:
        </label>
        <input type='text' id='email' name='email'
        value={values.email}
        onChange={handleChange} />
        <p className={styles.errorForValidation}>{errors.email}</p>
        
        <label for='password' className={styles.label}>
          Password:
        </label>
        <input type='password' id='password' name='password'
        value={values.password}
        onChange={handleChange} />
        <p className={styles.errorForValidation}>{errors.password}</p>

        <label for='confirm-password' className={styles.label}>
          Confirm Password:
        </label>
        <input type='password' id='confirm-password' name="confirmPassword" value={values.confirmPassword} onChange={handleChange}/>
        <p className={styles.errorForValidation}>{errors.confirmPassword}</p>

        <label for='dob' className={styles.label}>
          Age
        </label>
        <input type='number' id='age' name='age' value={values.age} 
        onChange={handleChange} />
        <p className={styles.errorForValidation}>{errors.age}</p>


        <label for='gender' className={styles.label}>
          Gender:
        </label>
        <select id='gender' name='gender' value={values.gender} onChange={handleChange}>
          <option>Select your Gender</option>
          <option value='male'>Male</option>
          <option value='female'>Female</option>
        </select>
        <p className={styles.errorForValidation}>{errors.gender}</p>

        <input type='submit' value='Register' />
      </form>
    </div>
    </>
  );
};

export default Signup;
