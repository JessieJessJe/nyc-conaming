import React, { useState, useEffect, useContext, useRef, lazy, Suspense } from 'react';

import { Canvas, useFrame, extend, useThree } from '@react-three/fiber'
import {OrbitControls, Sky , Text, OrthographicCamera, PerspectiveCamera } from "@react-three/drei";

import { motion } from 'framer-motion';

// import Nodes from "./Nodes"
import NYCMap from "./NYCMap"
import TextsLazy from './TextsLazy';


function MyThreeScene({filter, camera}){

    const OrthographicCamera_ratio = 8

    return (

        <React.Fragment>

            <Canvas width="100%" height="100%">

            <Suspense fallback={null}>

            <OrthographicCamera
                makeDefault = {true}
                left={-window.innerWidth / OrthographicCamera_ratio}
                right={window.innerWidth / OrthographicCamera_ratio}
                top={window.innerHeight / OrthographicCamera_ratio}
                bottom={-window.innerHeight / OrthographicCamera_ratio}
                near={-10} far={1000} position={[100, 0, 500]} 
                zoom={2}/>

            <ambientLight />
            <pointLight position={[10, 10, 10]} />

            <OrbitControls />

            <TextsLazy 
                    filter={filter}
            />

            <NYCMap />

            {/* <Sky /> */}

            </ Suspense>
            </ Canvas>

        </React.Fragment>
    )
    
}

export default MyThreeScene;