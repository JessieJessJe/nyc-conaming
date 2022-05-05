import React, { useState, useEffect, useContext, useRef, lazy, Suspense, useMemo } from 'react';

import { Canvas, useFrame, extend, useThree } from '@react-three/fiber'
import {OrbitControls, Sky , Text, OrthographicCamera, PerspectiveCamera } from "@react-three/drei";

import { motion } from 'framer-motion';

import useScrollPosition from "../utils/useScrollPosition";
import { DetailContextProvider, useDetailContextState, useDetailContextUpdater } from '../utils/detailContext';

import Header from './Header';
import Sidebar from './Sidebar';
import MyThreeScene from './MyThreeScene';
import DetailPage from './DetailPage';
import { Preview } from '@mui/icons-material';

import {initFilter, getPureFilter} from '../utils/helper'

import "./three.css"
import "./header.css"

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
        let updateSearch = {};

        switch(category){
            case "init":
                setFilter(initFilter);
                break;
            case "theme_false":
                //if not exist, insert
                if (!filter["theme"].includes(value)){
                    
                    setFilter((prev)=>{
                        return {...prev, 
                            "theme": [...prev["theme"], value]}
                    })

                    console.log(filter, 'update filter')
                }

                return;

            case "theme_true":
      
                    // updateSearch["theme"] = filter["theme"].filter(f => f !== value)

                    setFilter((prev)=>{
                        return{...prev, 
                            "theme": prev["theme"].filter(f => f !== value)}
                    })
                
                return;

            case "angle":
                setFilter((prev)=>{ 
                  return{
                    ...prev,
                    "angle": value.value,
                }
                  })
                return; 

            default:
                let updateValue = {};
                updateValue[category] = value;
        
                setFilter((prev)=>{
                    return {...prev, ...updateValue}
                })
                return;
        }
        




    }

    const filterMemo = useMemo(()=> (filter), [getPureFilter(filter)])


    const [clickDetail, setClickDetail] = useState(null)


    return(
        <>
      <DetailContextProvider>
        <Header />

        <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      layout
        
        id='three-wrapper' ref={ref}>

  

        <MyThreeScene    
        filter={filterMemo}

        camera = {camera}

        setClickDetail={setClickDetail}
      
        />

        <Sidebar

        filter={filter}
        updateFilter={updateFilter}

    
        toggleCamera = {toggleCamera}
       

        />

        <DetailPage 
            clickDetail={clickDetail}
        />
  

        </motion.div>
        </DetailContextProvider>

        </>

    )
}

export default Visualization;