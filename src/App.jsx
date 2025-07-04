import React, { useEffect, useState } from 'react';
import {Routes, Route} from 'react-router-dom'
import './App.css';
import Header from "./components/Header/Header";
import Main from './components/Main/Main'
import Signup from './components/Signup/Signup';
import Welcome from './components/Welcome/Welcome'
import Login from './components/Login/Login'

export default function App()
{
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('isDark');
    return saved ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem('isDark', JSON.stringify(isDark));
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () =>{
    setIsDark(!isDark);
  }

  return(
    <div>
      <Header
      toggleTheme = {toggleTheme}
      isChecked={isDark}
      />

      <Routes>
        <Route path='/' element = {<Welcome/>}></Route>
        <Route path='/main' element={<Main />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  )
}