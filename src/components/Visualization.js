import React, { useState, useEffect, useContext, useRef, lazy, Suspense } from 'react';

import { Canvas, useFrame, extend, useThree } from '@react-three/fiber'
import {OrbitControls, Sky , Text, OrthographicCamera, PerspectiveCamera } from "@react-three/drei";

import { motion } from 'framer-motion';

import useScrollPosition from "../utils/useScrollPosition";

import Header from './Header';

import Filter from "./Filter"
import Nodes from "./Nodes"
import NYCMap from "./NYCMap"
import TextsLazy from './TextsLazy';


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

    const OrthographicCamera_ratio = 8

    return(
        <React.Fragment>

        <Header />

        <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
        
        id='three-wrapper' ref={ref}>

        <Filter 
            year = {year}
            handleYear = {handleYear}
            camera = {camera}
            toggleCamera = {toggleCamera}
            borough = {borough}
            handleBorough = {handleBorough}
        />

        <Canvas width="100%" height="100%">

        <Suspense fallback={null}>
        <PerspectiveCamera 
            makeDefault = {camera}
            fov={45} near={1} far={1000} position={[0, 0, 120]} />

        <OrthographicCamera
            makeDefault = {!camera}
            left={-window.innerWidth / OrthographicCamera_ratio}
            right={window.innerWidth / OrthographicCamera_ratio}
            top={window.innerHeight / OrthographicCamera_ratio}
            bottom={-window.innerHeight / OrthographicCamera_ratio}
            near={1} far={1000} position={[0, -80, 0]} />

        <ambientLight />
        <pointLight position={[10, 10, 10]} />
 
        <OrbitControls />

        {/* <Nodes year={year} /> */}

        <TextsLazy year={year} borough={borough}/>

        <NYCMap />

        {/* <Sky /> */}

        </ Suspense>
        </Canvas>

        </motion.div>
      

        </React.Fragment>

    )
}

export default Visualization;