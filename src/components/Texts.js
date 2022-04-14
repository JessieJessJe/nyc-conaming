import React, { useState, useEffect, useMemo, useRef, lazy, Suspense } from 'react';

import { Canvas, useFrame, extend, useThree } from '@react-three/fiber'
import { meshBounds, Text } from "@react-three/drei";
import * as THREE from 'three'

import { createBillboardMaterial } from '../utils/createBillboardMaterial'
import { normLat, normLong, normZ, groupColor } from "../utils/helper"

import data from "../data/mydata.json"

function Line({pX, pY, pZ, year}){

  const geometry = useMemo(()=>{

    const start = new THREE.Vector3(pX, pY, pZ )
    const end = new THREE.Vector3(pX, pY, 0 )
    const geometry = new THREE.BufferGeometry().setFromPoints([start, end])

    return geometry

  }, [year])

  return(
  
      <line 

        onUpdate={(line) =>{ line.computeLineDistances()}}
        geometry={geometry}>
     
          <lineDashedMaterial 
            color={0xefefef}
            opacity={0.5}
            transparent={true}
            linewidth={1}
            scale={2}
            dashSize={0.5}
            gapSize={0.5}
          />
      </line>

  )

}

                //adding each data point's vertical line -----------------------
              //   const lineM = new THREE.LineDashedMaterial({
              //     color: 0xefefef,
              //     opacity: 0.5,
              //     transparent: true,
              //     linewidth: 1,
              //     scale: 2,
              //     dashSize: 0.5,
              //     gapSize: 0.5
              // });

              // const points = [];
              // points.push( new THREE.Vector3( pX,pY,pZ ) );
              // points.push( new THREE.Vector3( pX,pY,0 ) );
           
              // const lineG = new THREE.BufferGeometry().setFromPoints( points );

              // const line = new THREE.Line( lineG, lineM );
              // line.computeLineDistances();
              // everything.add(line)


function MyText({pX, pY, pZ, pColor, content}){

  const [hovered, setHover] = useState(false)
  const [billboardMaterial] = useState(() => createBillboardMaterial(new  THREE.MeshBasicMaterial()))
  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
  }, [hovered])
  return(
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
            outlineOpacity={hovered? 0.6 : 0}
            outlineColor={pColor}

          
            onPointerOver={(event) => setHover(true)}
            onPointerOut={(event) => setHover(false)}>

            {content}
        </Text>
  )
}

function Texts({year}){
   

    let data_filtered = year === "all" ? data : data.filter(d => d.year == year);

 
    let textlist = [];
    let linelist = [];

    data_filtered.forEach((d, i)=>{

        let pX = - normLong(d.long),
            pY = normLat(d.lat),
            pZ = normZ(d.year),
            pColor = groupColor[d.group];

        textlist.push(             
          <MyText pX={pX} pY={pY} pZ={pZ} key={`text-${i}`} pColor={pColor} content={d.coname} />
          )
        linelist.push(
          <Line pX={pX} pY={pY} pZ={pZ} key={`line-${i}`} year={year}/>
        )

    })
    return (
        <React.Fragment>
          {textlist}
          {linelist}
        </React.Fragment>
      )
    
}
export default Texts;