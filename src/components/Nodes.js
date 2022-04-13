import React, { useState, useRef } from 'react';

import { Canvas, useFrame, extend, useThree } from '@react-three/fiber'
import {OrbitControls, Sky , Text, OrthographicCamera, PerspectiveCamera } from "@react-three/drei";
import * as THREE from 'three'

import { normLat, normLong, normZ, groupColor } from "../utils/helper"

import data from "../data/mydata.json"

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

            nodes.push(<Node key={`${pX}+${pY}+${pZ}+${key}`} position={[pX, pY, pZ]} color={pColor}/>)
          
    }

        return(
            <React.Fragment>
            {nodes}
            </React.Fragment>
        )
}

export default Nodes;