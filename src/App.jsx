import React from 'react';
import {Routes, Route} from 'react-router-dom'
import './App.css';
import Header from "./components/Header/Header";
import Main from './components/Main/Main'
import Signup from './components/Signup/Signup';
import Welcome from './components/Welcome/Welcome'


export default function App()
{
  return(
    <div>
      <Header/>
      <Routes>
        <Route path='/welcome' element = {<Welcome/>}></Route>
        <Route path='/' element={<Main />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </div>
  )
}