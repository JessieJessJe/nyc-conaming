import React, { useState, useEffect, useContext, useRef, lazy, Suspense, useMemo } from 'react';

import { Canvas, useFrame, extend, useThree } from '@react-three/fiber'
import {OrbitControls, Sky , Text, OrthographicCamera, PerspectiveCamera } from "@react-three/drei";

import { motion } from 'framer-motion';

import useScrollPosition from "../utils/useScrollPosition";

import Header from './Header';
import Sidebar from './Sidebar';
import MyThreeScene from './MyThreeScene';
import { Preview } from '@mui/icons-material';

import {initFilter, getPureFilter} from '../utils/helper'

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

    const [camera, setCamera ] = useState(true);
    const toggleCamera = ()=>{
        setCamera(!camera)
    }

    const [filter, setFilter] = useState(initFilter);

    const updateFilter = (category, value)=>{

        if(category ==="init"){
            setFilter(initFilter);
        }else{

            let updateValue = {};
            updateValue[category] = value;
    
            setFilter((prev)=>{
                return {...prev, ...updateValue}
            })
        }

    }

    const filterMemo = useMemo(()=> (filter), [getPureFilter(filter)])

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
        filter={filterMemo}

        camera = {camera}
      
        />

        <Sidebar

        filter={filter}
        updateFilter={updateFilter}

    
        toggleCamera = {toggleCamera}
       

        />

        </motion.div>
      

        </React.Fragment>

    )
}

export default Visualization;