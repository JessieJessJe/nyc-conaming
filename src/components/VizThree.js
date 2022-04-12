import React, { useState, useEffect, useContext, useRef, useLayoutEffect } from 'react';

import { Canvas, useFrame, extend, useThree } from '@react-three/fiber'
import { TrackballControls, Line, Segments } from "@react-three/drei";
import * as THREE from 'three'
import { normLat, normLong } from "../utils/helper"
import { SectionContext } from '../utils/sectionContext';
import useScrollPosition from "../utils/useScrollPosition";

import NYCGeoJson from "../data/nyc.json"

let key = 0;

function Box(props) {
    // This reference will give us direct access to the mesh
    const mesh = useRef()
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => (mesh.current.rotation.x += 0.001))
    // Return view, these are regular three.js elements expressed in JSX
    return (
      <mesh
        {...props}
        ref={mesh}
        scale={active ? 1.5 : 1}
        onClick={(event) => setActive(!active)}
        onPointerOver={(event) => setHover(true)}
        onPointerOut={(event) => setHover(false)}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
      </mesh>
    )
  }

function BoroughMap({shape}){
    let linelist = [];
    let geometry;

    const ref = useRef(null)

    useEffect(()=>{
        shape[0].forEach((loc)=>{
            let px = normLong(loc[0])
            let py = normLat(loc[1])
            linelist.push(new THREE.Vector3(px, py, 1)) 
       
        })
        console.log(linelist)
        ref.current.setFromPoints(linelist)

        // geometry = new THREE.BufferGeometry().setFromPoints(linelist)
        
    }, [])

    key ++;

    return (

    // <line key={key} geometry={geometry}>
    <line key={key} rotation-y={Math.PI}>
    <bufferGeometry ref={ref}/>
    <lineBasicMaterial color="white"  lineWidth={1} />
    </line>
    )

}

function NYCMap(){
    let boroughs = []

        NYCGeoJson.features.forEach((feature)=>{
            feature.geometry.coordinates.forEach((shape)=>{
                // wireframe(shape, mapM)
                boroughs.push(< BoroughMap shape={shape} key={key}/>)
         
            })
        })

       

    return (
        <React.Fragment>
            {boroughs}
        </React.Fragment>

    )

}

function VizThree(){

    const [nycdata, setNYCdata ] = useState([NYCGeoJson]);

    const { setSection } = useContext(SectionContext);
    const scrollPosition = useScrollPosition();
    const margin_left = 0.2 * window.innerWidth;

    const aspect = window.innerWidth / window.innerHeight;
    let nycmap;
    nycmap = NYCMap();


    return(
        <React.Fragment>

        <div id='three-wrapper'>

        <Canvas
      
          camera = { {fov:80, near: 1, far: 1000, position: [0, 0, 120]} }      
        >


        <ambientLight />
        <pointLight position={[10, 10, 10]} />
 
        <TrackballControls autoRotate autoRotateSpeed={5} />s
       
        <Box position={[-0.2, 0, 0]} />
        <Box position={[25.213108706880842, -73.93061327113944, 1]} />  

        <NYCMap />

        {/* <BoroughMap shape={ NYCGeoJson.features[0].geometry.coordinates[0]} nycdata={NYCGeoJson}/> */}

        </Canvas>

        </div>
      

        </React.Fragment>

    )
}

export default VizThree;