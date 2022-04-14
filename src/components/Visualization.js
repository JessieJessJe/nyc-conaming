import React, { useState, useEffect, useContext, useRef, lazy, Suspense } from 'react';

import { Canvas, useFrame, extend, useThree } from '@react-three/fiber'
import {OrbitControls, Sky , Text, OrthographicCamera, PerspectiveCamera } from "@react-three/drei";

import { SectionContext } from '../utils/sectionContext';
import useScrollPosition from "../utils/useScrollPosition";

import Filter from "./Filter"
import Nodes from "./Nodes"
import NYCMap from "./NYCMap"
import TextsLazy from './TextsLazy';


function Visualization(){

    const ref = useRef();

    const [camera, setCamera ] = useState(true);

    const { setSection } = useContext(SectionContext);
    const scrollPosition = useScrollPosition();
    const margin_left = 0.2 * window.innerWidth;
    const aspect = window.innerWidth / window.innerHeight;

    useEffect(()=>{
        if (scrollPosition >= window.innerHeight * 2 ){
            document.getElementById("three-wrapper").position = 'sticky'
        }else{
            document.getElementById("three-wrapper").position = 'relative'
        }

    }, scrollPosition)


    const [year, setYear] = React.useState('all');
    const handleYear = (event) => {
        setYear(event.target.value);
      };
    
    const toggleCamera = ()=>{
        setCamera(!camera)
    }

    const OrthographicCamera_ratio = 8

    return(
        <React.Fragment>

        <div id='three-wrapper' ref={ref}>

        <Filter 
            year = {year}
            handleYear = {handleYear}
            camera = {camera}
            toggleCamera = {toggleCamera}
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

        <TextsLazy year={year} />

        <NYCMap />

        {/* <Sky /> */}

        </ Suspense>
        </Canvas>

        </div>
      

        </React.Fragment>

    )
}

export default Visualization;