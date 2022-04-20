import React, { useState, useEffect, useContext } from 'react';

import { Link } from "react-router-dom";

import LandingPlate from './LandingPlate'
import Introduction from './Introduction'
import Header from './Header'
import useScrollPosition from "../utils/useScrollPosition";

import Visualization from './Visualization';
 
function Display(){
    const scrollPosition = useScrollPosition();
 
    const [Header_opacity, setHeader_opacity] = useState( 0 );

    let LandingPlate_opacity = 1;
    let Introduction_opacity = 0;


    useEffect(()=>{

        if (scrollPosition >= window.innerHeight * 1.5){
            setHeader_opacity(1)
        }else{
            setHeader_opacity(0)
        }
    },[scrollPosition])

return ( 

    <React.Fragment>
{/*  
        <Header opacity={Header_opacity}/>
        <LandingPlate opacity={LandingPlate_opacity} />   
        <Introduction opacity={Introduction_opacity}/>
        <Visualization /> */}

         
        <Header opacity={Header_opacity}/>

        <LandingPlate opacity={LandingPlate_opacity} />   
        <Introduction opacity={Introduction_opacity}/>
        <Visualization />


    </React.Fragment>

  
)
}

export default Display;