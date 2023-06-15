import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './components/home';
import Signup from './components/signup';
import Login from './components/login';
import Navbar from './components/navbar';
import HomePageAfterLogin from './components/homepageafterlogin';
import NavbarAfterLogin from './components/navbarafterlogin';
import SearchTrain from './components/searchTrain';
import TrainResult from './components/trainResult';
import BookTickets from './components/BookTickets';
import ViewBookings from './components/viewbookings';
import { useEffect, useState } from 'react';
import PaymentForm from './components/CreditcardPage';
import TrainStationsPage from './components/TrainStationsPage';
import AdminNavbar from './components/AdminNavbar';
import AdminHomePage from './components/AdminHomePage';
import ManageTrains from './components/manageTrains';
import AddTrain from './components/addTrain';

function App() {


    return (
    <div>

      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/home' exact element={<HomePageAfterLogin />} />
        <Route path='/adminHomePage' exact element={[<AdminHomePage/>]} />
        <Route path='/manageTrain' exact element={[<ManageTrains/>]} />
        <Route path='/addTrain' exact element={[<AddTrain/>]} />
        <Route path="/searchTrain" exact element={[<SearchTrain/>]} />
        <Route path="/trainResult" exact element={[<TrainResult/>]} />
        <Route path='/schedulesPage' exact element={[<TrainStationsPage/>]} />
        <Route path="/bookTickets" exact element={[<BookTickets/>]} />
        <Route path="/payment" exact element={[<PaymentForm/>]} />
        <Route path='/viewBookings' exact element={[<ViewBookings/>]} />
        <Route path='/login' exact element={[<Navbar/>,<Login />]} />
        <Route path='/sign-up' exact element={<Signup/>} />
      </Routes>
    </div>
  );
 
/* 
  return (
    <div>

      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/home' exact element={<Home/>} />
        <Route path="/searchTrain" exact element={[<SearchTrain/>]} />
        <Route path="/trainResult" exact element={[<TrainResult/>]} />
        <Route path='/sign-up' exact element={[<Navbar/>, <Signup />]} />
        <Route path='/login' exact element={[<Navbar/>, <Login />]} />
      </Routes>
    </div>
  ); */

}

export default App;
