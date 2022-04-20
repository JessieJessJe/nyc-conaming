
import React, { useState, useEffect, useContext } from 'react';

import { Link, Outlet } from "react-router-dom";

import useScrollPosition from "./utils/useScrollPosition";

import Header from './components/Header'


import './App.css';

function App() {
  const scrollPosition = useScrollPosition();
 
  const [Header_opacity, setHeader_opacity] = useState( 1 );


//   useEffect(()=>{

//     if (scrollPosition >= window.innerHeight * 1.5){
//         setHeader_opacity(1)
//     }else{
//         setHeader_opacity(0)
//     }
// },[scrollPosition])

  return (
    <div className="App">

     {/* <Display /> */}

         
        <Header opacity={Header_opacity}/>

        {/* <LandingPlate  />   
        <Introduction  />
        <Visualization /> */}
      <Outlet />

    </div>

  );
}

export default App;
