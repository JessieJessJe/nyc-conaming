import React, { useState, useEffect, useContext, useRef, lazy, Suspense } from 'react';

import { Canvas, useFrame, extend, useThree } from '@react-three/fiber'
import {OrbitControls, Sky , Text, OrthographicCamera, PerspectiveCamera } from "@react-three/drei";

import { motion } from 'framer-motion';

import { FilterContext, FilterProvider } from '../utils/filterContext';


// import Nodes from "./Nodes"
import NYCMap from "./NYCMap"
import TextsLazy from './TextsLazy';


function MyThreeScene({year, handleYear, camera, toggleCamera, borough, handleBorough }){

    const OrthographicCamera_ratio = 8
    const {filter} = React.useContext(FilterContext)

    return (

        <React.Fragment>

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

            <TextsLazy year={year} borough={borough}/>

            <NYCMap />

            {/* <Sky /> */}

            </ Suspense>
            </ Canvas>

        </React.Fragment>
    )
    
}

export default MyThreeScene;