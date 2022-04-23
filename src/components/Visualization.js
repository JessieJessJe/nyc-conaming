import React, { useState, useEffect, useContext, useRef, lazy, Suspense } from 'react';

import { Canvas, useFrame, extend, useThree } from '@react-three/fiber'
import {OrbitControls, Sky , Text, OrthographicCamera, PerspectiveCamera } from "@react-three/drei";

import { motion } from 'framer-motion';

import useScrollPosition from "../utils/useScrollPosition";

import Header from './Header';
import Sidebar from './Sidebar';
import MyThreeScene from './MyThreeScene';


function Visualization(){

    const ref = useRef();

    const scrollPosition = useScrollPosition();
    const margin_left = 0.2 * window.innerWidth;
    const aspect = window.innerWidth / window.innerHeight;

    useEffect(()=>{
        if (scrollPosition >= window.innerHeight * 2 ){
            document.getElementById("three-wrapper").position = 'sticky'
        }else{
            document.getElementById("three-wrapper").position = 'relative'
        }

    }, [scrollPosition])

//filter states
    const [year, setYear] = React.useState('all');
    const handleYear = (event) => {
        setYear(event.target.value);
      };

    const [borough, setBorough] = React.useState('all');
    const handleBorough = (event) => {
        setBorough(event.target.value);
    };   

    const [camera, setCamera ] = useState(true);
    const toggleCamera = ()=>{
        setCamera(!camera)
    }


    return(
        <React.Fragment>

        <Header />

        <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
        
        id='three-wrapper' ref={ref}>

        <MyThreeScene              
        year = {year}
        handleYear = {handleYear}
        camera = {camera}
        toggleCamera = {toggleCamera}
        borough = {borough}
        handleBorough = {handleBorough}
        />

        <Sidebar
        
        year = {year}
        handleYear = {handleYear}
        camera = {camera}
        toggleCamera = {toggleCamera}
        borough = {borough}
        handleBorough = {handleBorough}

        />

        </motion.div>
      

        </React.Fragment>

    )
}

export default Visualization;