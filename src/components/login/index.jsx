import React, {useEffect, useState} from 'react';
import axios from 'axios';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import { loginSchema } from '../../schemas';
import { useFormik } from 'formik';


const Login = () => {

  const initialValues = { email: "", password: "" };

  const navigate = useNavigate();

  const {values, errors, handleChange, handleSubmit} = useFormik({
    initialValues: initialValues,
    validationSchema: loginSchema,
    onSubmit: (values) => {

        if(values.email === "admin320@gmail.com" && values.password === "12345") {
          localStorage.setItem('isAdmin', true);
          navigate("/adminHomePage");
        }


        else { const response = axios.post("http://localhost:8000/authenticate",
        {
          username: values.email,
          password: values.password
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
            navigate("/login");
          }
          else if(error.request) {
            alert("No Response received from Server");
            console.log(error.request);
            navigate("/login");
          }
          else {
            alert("Something went wrong " + error.data);
            console.log(error);
            navigate("/login");
          }
        });
    
          if(!localStorage.getItem('user')) {
            localStorage.setItem('user', response.data);
            localStorage.setItem('email', values.email);  
          }
         
          navigate("/");
        }
      }
  });


    return (
        <>
       <section className="login my-auto">
        <div className="container">
        
            <div className="card col-12 col-md-6 col-lg-3 text-center mx-auto my-5">
                <form onSubmit={handleSubmit}>
                <div className="card-body">
                    <h2 className="mt-3 text-uppercase">Login</h2>
                    <p>Please enter your login and password!</p>
                   
                    <div className="mt-5">
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" name="email" placeholder="name@example.com"  id='username'
                            value={values.email} onChange={handleChange} />
                            <label>Email address</label>
                            <p className={styles.errorForValidation}>{errors.email}</p>
                        </div>
                       
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" placeholder="Password" id='password' name='password'
                            value={values.password} onChange={handleChange} />
                            <label>Password</label>
                            <p className={styles.errorForValidation}>{errors.password}</p>
                        </div>
                  
                    </div>
                    <div className="d-flex flex-column">{/* <a href="" className="mt-3 text-decoration-none">Forget Password</a> */}

                        <button className="btn btn-outline-primary mt-4 mb-2" type="submit">LOGIN</button>
                        <hr/>
                        <span>Don't have an account? <a href="sign-up" className="text-decoration-none">Sign Up</a></span>
                    </div>
                </div>
                </form>
            </div>
        </div>
    </section>
    </>
    )

}
export default Login;