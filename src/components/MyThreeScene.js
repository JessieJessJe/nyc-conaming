import React, { useState, useEffect, useContext, useRef, lazy, Suspense } from 'react';

import { Canvas, useFrame, extend, useThree } from '@react-three/fiber'
import {OrbitControls, Sky , OrthographicCamera } from "@react-three/drei";

// import { motion } from 'framer-motion';
// import { MotionCanvas, LayoutOrthographicCamera } from "framer-motion-3d"

// import Nodes from "./Nodes"
import NYCMap from "./NYCMap"
import TextsLazy from './TextsLazy';


function MyThreeScene({filter, camera, setClickDetail}){

    const OrthographicCamera_ratio = 8
    const ref = useRef();

    // useFrame(() => (ref.current.rotation.x = ref.current.rotation.y = ref.current.rotation.z += 0.01))
    // useFrame(({ clock, camera }) => {
    //     camera.position.z = 50 + Math.sin(clock.getElapsedTime()) * 30
    //   })
    return (

     

            <Canvas width="100%" height="100%">
                
            <Suspense fallback={null}>

            <OrthographicCamera
        
                makeDefault = {true}
                left={-window.innerWidth / OrthographicCamera_ratio}
                right={window.innerWidth / OrthographicCamera_ratio}
                top={window.innerHeight / OrthographicCamera_ratio}
                bottom={-window.innerHeight / OrthographicCamera_ratio}
                near={-10} far={1000} 
                position={[0, 0, 500]} 
                zoom={2}/>

            <ambientLight />
            <pointLight position={[10, 10, 10]} />

           
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
    const [wordcloud, setWordcloud] = useState(false)
    const [map, setMap] = useState(true)
    // Subscribe this component to the render-loop, rotate the mesh every frame



    const camera = useThree((state) => state.camera)

    // useFrame(() => {

    //     if(map){
    //         mesh.current.rotation.y = 0
           
    //     }else if(timeline){
    //         mesh.current.rotation.y = Math.PI/2;
           
    //     }
       
    // })
    // Return view, these are regular three.js elements expressed in JSX


    useEffect(()=>{

        if (filter["angle"] === "map"){
            setMap(true)
            setTimeline(false)
            setWordcloud(false)
            camera.position.set(0,0,500)
            mesh.current.rotation.y = 0
            mesh.current.rotation.x = 0
            mesh.current.rotation.z = 0

        }else if (filter["angle"] === "timeline"){
            setTimeline(true)
            setMap(false)
            setWordcloud(false)
            camera.position.set(0,0,500)
            mesh.current.rotation.x = 0
            mesh.current.rotation.z = 0
            mesh.current.rotation.y = Math.PI/2;
        }else{
            setMap(false)
            setTimeline(false)
            setWordcloud(true)
        }

    }, [filter["angle"]])

    return (
      <group
        ref={mesh}>

            <OrbitControls
         
            // enableRotate={map? true : false}
                  
            enableDamping={true}
           

            maxAzimuthAngle={timeline? 0 : 2 * Math.PI}
            minAzimuthAngle={timeline? 0 : -1 * Math.PI}
            
            />
            <TextsLazy 
                filter={filter}
                wordcloud={wordcloud}
                setClickDetail = {setClickDetail}
            />

            <NYCMap />
        
      </group>
    )
  }