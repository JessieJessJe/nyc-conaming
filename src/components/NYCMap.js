import React, { useState, useEffect, useContext, useRef, lazy, Suspense } from 'react';

import { Canvas, useFrame, extend, useThree } from '@react-three/fiber'
import {OrbitControls, Sky , Text, OrthographicCamera, PerspectiveCamera } from "@react-three/drei";
import * as THREE from 'three'

import { normLat, normLong, normZ, groupColor } from "../utils/helper"

import NYCGeoJson from "../data/nyc.json"

let key = 0;

function AreaMap({shape}){
     const ref = useRef()
    let linelist = [];

    useEffect(()=>{
        shape[0].forEach((loc)=>{
            let px = normLong(loc[0])
            let py = normLat(loc[1])
            linelist.push(new THREE.Vector3(px, py, 1)) 
       
        })
       
        ref.current.setFromPoints(linelist)
        
    }, [])

    key ++;

    return (

 
    <line key={key} rotation-y={Math.PI} >
    <bufferGeometry ref={ref}/>
    <lineBasicMaterial color="black"  lineWidth={1} />
    </line>
    )

}

function NYCMap(){
    let boroughs = []

        NYCGeoJson.features.forEach((feature)=>{
            feature.geometry.coordinates.forEach((shape, i)=>{
             
                boroughs.push(< AreaMap shape={shape} key={ `${key + shape[0][0][1]}+nyc+${i}`}/>)
         
            })
        })

       

    return (
        <React.Fragment>
            {boroughs}
        </React.Fragment>

    )

}

export default NYCMap;