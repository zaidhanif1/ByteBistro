import React from 'react';
import {Routes, Route} from 'react-router-dom'
import './App.css';
import Header from "./components/Header/Header";
import Main from './components/Main/Main'
import Signup from './components/Signup/Signup';
import Welcome from './components/Welcome/Welcome'
import Login from './components/Login/Login'

export default function App()
{
  return(
    <div>
      <Header/>
      <Routes>
        <Route path='/' element = {<Welcome/>}></Route>
        <Route path='/main' element={<Main />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  )
}