
import React, { useState, useEffect, useContext } from 'react';

import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";

import useScrollPosition from "./utils/useScrollPosition";

import Header from './components/Header'

import './App.css';

function App() {
  const scrollPosition = useScrollPosition();
 
  const [Header_opacity, setHeader_opacity] = useState( 1 );

  let navigate = useNavigate()
  let location = useLocation()

  useEffect(()=>{
    navigate("/landing")
  }, [])

  useEffect(()=>{
    if (location.pathname !== "/landing"){
      setHeader_opacity(1)
    }else{
      setHeader_opacity(0)
    }

  },[location])

  return (
    <div className="App">

         
      <Header opacity={Header_opacity}/>

      <Outlet />

    </div>

  );
}

export default App;
