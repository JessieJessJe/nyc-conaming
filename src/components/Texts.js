import React, { useState, useEffect, useMemo, useRef, lazy, Suspense } from 'react';

import { Canvas, useFrame, extend, useThree } from '@react-three/fiber'
import { meshBounds, Text } from "@react-three/drei";
import * as THREE from 'three'

import { createBillboardMaterial } from '../utils/createBillboardMaterial'
import { normLat, normLong, normZ, groupColor } from "../utils/helper"

import data from "../data/mydata.json"

function Line({pX, pY, pZ, year, borough, handlePointOut, handlePointOver, hovered}){

  const geometry = useMemo(()=>{

    const start = new THREE.Vector3(pX, pY, pZ )
    const end = new THREE.Vector3(pX, pY, 0 )
    const geometry = new THREE.BufferGeometry().setFromPoints([start, end])

    return geometry

  }, [year, borough])

  return(
  
      <line 
      onPointerOver={handlePointOver}
      onPointerOut={handlePointOut}

        onUpdate={(line) =>{ line.computeLineDistances()}}
        geometry={geometry}>

                  
     
          <lineDashedMaterial 
            color="black"
            opacity={hovered ? 0.8 : 0.3}
            transparent={true}
            linewidth={1}
            scale={2}
            dashSize={0.5}
            gapSize={0.5}
          />
      </line>

  )

}



function MyText({pX, pY, pZ, pColor, content, year, borough, i}){

  const [hovered, setHover] = useState(false)
  const [billboardMaterial] = useState(() => createBillboardMaterial(new  THREE.MeshBasicMaterial()))
  
  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
  }, [hovered])

  return(

    <React.Fragment>
            <Text 
            anchorX='left' 
            fontSize={1} 
            position={[pX, pY, pZ]} 
            color={pColor}
            material={billboardMaterial} 

            outlineWidth={0}
            outlineOffsetX={.1}
            outlineOffsetY={.1}
            outlineOffsetZ={.1}
            outlineBlur={.5}
            outlineOpacity={hovered? 0.4 : 0}
            outlineColor={pColor}

         
            onPointerOver={(event) => setHover(true)}
            onPointerOut={(event) => setHover(false)}>

            {content}
        </Text>
        <Line pX={pX} pY={pY} pZ={pZ} key={`line-${i}`} year={year} borough={borough}

              handlePointOver={(event) => setHover(true)}
              handlePointOut={(event) => setHover(false)}
              hovered = {hovered}
        />

  </React.Fragment>
  )
}

function Texts({year, borough}){
   

    let data_filtered_year = filterYear(data, year)
    let data_filtered_borough = filterBorough(data_filtered_year, borough)

    let data_filtered = data_filtered_borough
 
    let textlist = [];
    let linelist = [];

    data_filtered.forEach((d, i)=>{

        let pX = - normLong(d.long),
            pY = normLat(d.lat),
            pZ = normZ(d.year),
            pColor = groupColor[d.group];

        textlist.push(             
          <MyText pX={pX} pY={pY} pZ={pZ} key={`text-${i}`} pColor={pColor} content={d.coname} year={year} borough={borough} i={i} />
          )
        // linelist.push(
        //   <Line pX={pX} pY={pY} pZ={pZ} key={`line-${i}`} year={year}/>
        // )

    })
    return (
        <React.Fragment>
          {textlist}
          {/* {linelist} */}
        </React.Fragment>
      )
    
}
export default Texts;


function filterYear(data, year){
  return year === "all" ? data : data.filter(d => d.year == year);
}

function filterBorough(data, borough){
  return borough === "all" ? data : data.filter(d => d.borough == borough);
}