import React, { useState, useEffect, useContext, useRef, useLayoutEffect } from 'react';

import { Canvas, useFrame, extend, useThree } from '@react-three/fiber'
import { TransformControls, OrbitControls, TrackballControls, OrthographicCamera, PerspectiveCamera } from "@react-three/drei";
import * as THREE from 'three'
import { normLat, normLong, normZ, groupColor } from "../utils/helper"
import { SectionContext } from '../utils/sectionContext';
import useScrollPosition from "../utils/useScrollPosition";

import NYCGeoJson from "../data/nyc.json"
import data from "../data/mydata.json"

let key = 0;

function Node({position, color}) {
    // This reference will give us direct access to the mesh
    const mesh = useRef()
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    // Subscribe this component to the render-loop, rotate the mesh every frame
    // useFrame((state, delta) => (mesh.current.rotation.x += 0.001))
    // Return view, these are regular three.js elements expressed in JSX


    return (
      <mesh
        position={position}
        ref={mesh}
        scale={hovered ? 1.5 : 1}
        onClick={(event) => setActive(!active)}
        onPointerOver={(event) => setHover(true)}
        onPointerOut={(event) => setHover(false)}>
        <boxGeometry args={[1, 1, 1]} />
        {/* <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} /> */}
        <meshStandardMaterial color={color} />
      </mesh>
    )
  }


function Nodes({year}){
    let nodes = [];

    let data_filtered = year === "all" ? data : data.filter(d => d.year == year);

   
    for (let key in data_filtered){
                
            let pX = - normLong(data_filtered[key].long),
                pY = normLat(data_filtered[key].lat),
                pZ = normZ(data_filtered[key].year),
                // pZ = normZ(currentYear),
                pColor = groupColor[data_filtered[key].group];

            console.log(pZ)
            nodes.push(<Node key={`${pX}+${pY}+${pZ}+${key}`} position={[pX, pY, pZ]} color={pColor}/>)
          
    }

        return(
            <React.Fragment>
            {nodes}
            </React.Fragment>
        )
}

function BoroughMap({shape}){
    let linelist = [];

    const ref = useRef(null)

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

 
    <line key={key} rotation-y={Math.PI}>
    <bufferGeometry ref={ref}/>
    <lineBasicMaterial color="white"  lineWidth={1} />
    </line>
    )

}

function NYCMap(){
    let boroughs = []

        NYCGeoJson.features.forEach((feature)=>{
            feature.geometry.coordinates.forEach((shape, i)=>{
                // wireframe(shape, mapM)
                boroughs.push(< BoroughMap shape={shape} key={ `${key + shape[0][0][1]}+nyc+${i}`}/>)
         
            })
        })

       

    return (
        <React.Fragment>
            {boroughs}
        </React.Fragment>

    )

}


const Dropdown = ({ label, value, options, onChange }) => {
    return (
      <label>
        {label}
        <select value={value} onChange={onChange}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </label>
    );
  };

function VizThree(){

    const [camera, setCamera ] = useState(true);

    const { setSection } = useContext(SectionContext);
    const scrollPosition = useScrollPosition();
    const margin_left = 0.2 * window.innerWidth;
    const aspect = window.innerWidth / window.innerHeight;

    const options_year = [
        { label: '2002', value: "2002" },
        { label: '2011', value: "2011" },
        { label: '2021', value: "2021" },
        { label: 'all', value: 'all' },
    ];
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

        <div id='three-wrapper'>

        <div id='three-filter-wrapper'> 

            <button id='three-cam-btn' onClick={toggleCamera}>Select Camera</button>
            <div>
                    <Dropdown
                    key="dropdown"
                    label="Select Year"
                    options={options_year}
                    value={year}
                    onChange={handleYear}
                    />
            </div>

        </div>
        <Canvas
        >
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

        <Nodes year={year} />

        <NYCMap />

        </Canvas>

        </div>
      

        </React.Fragment>

    )
}

export default VizThree;