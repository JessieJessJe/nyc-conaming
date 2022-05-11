import React, { useState, useEffect, useContext, useRef, lazy, Suspense } from 'react';

import { Canvas, useFrame, extend, useThree } from '@react-three/fiber'
import {OrbitControls, Sky , OrthographicCamera } from "@react-three/drei";

import * as THREE from 'three'

// import { motion } from 'framer-motion';
// import { MotionCanvas, LayoutOrthographicCamera } from "framer-motion-3d"

// import Nodes from "./Nodes"
import NYCMap from "./NYCMap"
import TextsLazy from './TextsLazy';


function MyThreeScene({filter, setClickDetail}){

    const OrthographicCamera_ratio = 8
    const ref = useRef();

    // useFrame(() => (ref.current.rotation.x = ref.current.rotation.y = ref.current.rotation.z += 0.01))
    // useFrame(({ clock, camera }) => {
    //     camera.position.z = 50 + Math.sin(clock.getElapsedTime()) * 30
    //   })
    return (

     

            <Canvas width="100%" 
                    height="100%"
          
                    >
                
            <Suspense fallback={null}>
           
            <OrthographicCamera
        
                makeDefault = {true}
                left={-window.innerWidth / OrthographicCamera_ratio}
                right={window.innerWidth / OrthographicCamera_ratio}
                top={window.innerHeight / OrthographicCamera_ratio}
                bottom={-window.innerHeight / OrthographicCamera_ratio}
                near={-500} far={1000} 
                position={[0, 0, 600]} 
                zoom={1.5}/>

            <ambientLight />
            <pointLight 
                intensity={1}
                position={[0, 0, 600]}
             />

           
            <Group 
                filter={filter} 
                setClickDetail={setClickDetail}
                />

            {/* <OrbitControls />
            <TextsLazy 
                    filter={filter}
            />

            <NYCMap /> */}
          

            {/* <Sky /> */}

            {/* <Rig /> */}

            </ Suspense>
            </Canvas>

      
    )
    
}

export default MyThreeScene;

function Group({filter, setClickDetail}) {
   
    // This reference will give us direct access to the mesh
    const mesh = useRef()
    // Set up state for the hovered and active state
    const [timeline, setTimeline] = useState(false)

    const [map, setMap] = useState(true)
    // Subscribe this component to the render-loop, rotate the mesh every frame

    let v = new THREE.Vector3()

    useFrame((state) => {

        if(map){

            if(mesh.current.rotation.y > 0){
                mesh.current.rotation.y -= 0.02 
            }
            state.camera.position.lerp(v.set(0, 0, 600), 0.05)
            
           
        }else if(timeline){
            // mesh.current.rotation.y = Math.PI/2;
            if(mesh.current.rotation.y < Math.PI / 2){
                mesh.current.rotation.y += 0.02
            }
            state.camera.position.lerp(v.set(2000, 0, 600), 0.05)
           // state.camera.setViewOffset(1/OrthographicCamera_ratio, 1/OrthographicCamera_ratio, -50, 0, window.innerWidth, window.innerHeight )
            
        }else{
            if(mesh.current.rotation.y > 0) {
                mesh.current.rotation.y -= 0.2
                state.camera.position.lerp(v.set(0, 0, 600), 0.05)
            }
        }
       
    })

    useEffect(()=>{

        if (filter["angle"] === "map"){
            setMap(true)
            setTimeline(false)
        
            // camera.position.set(0,0,500)
            // mesh.current.rotation.y = 0
            // mesh.current.rotation.x = 0
            // mesh.current.rotation.z = 0

        }else if (filter["angle"] === "timeline"){
            setTimeline(true)
            setMap(false)

            // camera.position.set(0,0,500)
            // mesh.current.rotation.x = 0
            // mesh.current.rotation.z = 0
            // mesh.current.rotation.y = Math.PI/2;
        }else{
            setMap(false)
            setTimeline(false)
           
        }

    }, [filter["angle"]])

    return (
      <group
        ref={mesh}>

            <OrbitControls
         
            // enableRotate={map? true : false}
                  
            enableDamping={true}
            dampingFactor={0.2}

            zoomSpeed={0.3}
            rotateSpeed={0.5}
            panSpeed={0.5}

            minZoom={0.5}
            maxZoom={10}

            maxAzimuthAngle={timeline? 0 : 2 * Math.PI}
            minAzimuthAngle={timeline? 0 : -1 * Math.PI}
            
            />
            <TextsLazy 
                filter={filter}
              
                timeline={timeline}
                setClickDetail = {setClickDetail}
            />

            <NYCMap />
        
      </group>
    )
  }

  function Rig({ v = new THREE.Vector3() }) {

    const camera = useThree(state => state.camera)
    console.log(camera)

    return useFrame((state) => {
      state.camera.position.lerp(v.set(state.mouse.x / 10, state.mouse.y / 10, 600), 0.05)
    })
  }


  function Rig_Time({ v = new THREE.Vector3() }) {

    const camera = useThree(state => state.camera)

    return useFrame((state) => {
      state.camera.position.lerp(v.set(0, 0, 500), 0.05)
    })
  }
