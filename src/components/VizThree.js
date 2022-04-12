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

function Box(props) {
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


function Nodes(){
    let nodes = [];
        for (let key in data){
                
            let pX = - normLong(data[key].long),
                pY = normLat(data[key].lat),
                pZ = normZ(data[key].year),
                pColor = groupColor[data[key].group];
            
            nodes.push(<Box key={`${pX}+${pY}+${pZ}`} position={[pX, pY, pZ]} />)
            
            }
        
        return(
            <React.Fragment>
            {nodes}
            </React.Fragment>
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
            feature.geometry.coordinates.forEach((shape)=>{
                // wireframe(shape, mapM)
                boroughs.push(< BoroughMap shape={shape} key={ `${key + shape[0][0][1]}+nyc`}/>)
         
            })
        })

       

    return (
        <React.Fragment>
            {boroughs}
        </React.Fragment>

    )

}

function VizThree(){

    const [camera, setCamera ] = useState(true);

    const { setSection } = useContext(SectionContext);
    const scrollPosition = useScrollPosition();
    const margin_left = 0.2 * window.innerWidth;

    const aspect = window.innerWidth / window.innerHeight;

    const toggleCamera = ()=>{
        setCamera(!camera)
    }

    const OrthographicCamera_ratio = 8

    return(
        <React.Fragment>

        <div id='three-wrapper'>

        <button id='three-cam-btn' onClick={toggleCamera}>Switch View</button>

        <Canvas
      
        //   camera = { {fov:80, near: 1, far: 1000, position: [0, 0, 120]} }      
        >
        <PerspectiveCamera 
            makeDefault = {camera}
            fov={80} near={1} far={1000} position={[0, 0, 120]} />

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

        <Nodes />

        <NYCMap />

        </Canvas>

        </div>
      

        </React.Fragment>

    )
}

export default VizThree;