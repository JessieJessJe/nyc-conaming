import React, { useState, useEffect, useMemo, useContext, useRef, lazy, Suspense } from 'react';

import { Canvas, useFrame, extend, useThree } from '@react-three/fiber'
import { meshBounds, Text } from "@react-three/drei";
import * as THREE from 'three'

import { DetailContextProvider, useDetailContextState, useDetailContextUpdater } from '../utils/detailContext';

import { createBillboardMaterial } from '../utils/createBillboardMaterial'
import { normLat, normLong, normZ, groupColor } from "../utils/helper"
import { filterNewData, termlist } from '../utils/helper';

import data from "../data/mydata.json"


function Line({pX, pY, pZ, filter, handlePointOut, handlePointOver, hovered}){

  const geometry = useMemo(()=>{

    const start = new THREE.Vector3(pX, pY, pZ )
    const end = new THREE.Vector3(pX, pY, 0 )
    const geometry = new THREE.BufferGeometry().setFromPoints([start, end])

    return geometry

  }, [filter])

  return(
  
      <line 
      onPointerOver={handlePointOver}
      onPointerOut={handlePointOut}

        onUpdate={(line) =>{ line.computeLineDistances()}}
        geometry={geometry}>

                  
     
          <lineDashedMaterial 
            color="black"
            opacity={hovered ? 0.8 : 0}
            transparent={true}
            linewidth={1}
            scale={2}
            dashSize={0.5}
            gapSize={0.5}
          />
      </line>

  )

}



function MyText({pX, pY, pZ, pColor, content, filter, i, dataObj, setClickDetail}){


  const [hovered, setHover] = useState(false)
  const [billboardMaterial] = useState(() => createBillboardMaterial(new  THREE.MeshBasicMaterial()))
  
  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
  }, [hovered])

  return(

    <>
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

            //  event listners
            onPointerUp= {()=>{
              setClickDetail(dataObj)
             
            }}
            onPointerOver={(event) => setHover(true)}
            onPointerOut={(event) => setHover(false)}>

            {content}
        </Text>
        <Line pX={pX} pY={pY} pZ={pZ} key={`line-${i}`} filter={filter}

              // handlePointOver={(event) => setHover(true)}
              // handlePointOut={(event) => setHover(false)}
              hovered = {hovered}
        />

  </>
  )
}

function Texts({filter, wordcloud, setClickDetail}){
   
    ///Processing Filtered Data
    let data_filtered = filterNewData(data, filter)


    let textlist = [];
  
      //Draw Text
      data_filtered.forEach((d, i)=>{

          if(d.long){
            let pX = - normLong(d.long),
            pY = normLat(d.lat),
            pZ = normZ(d.year),
            pColor = groupColor[d.group],
            content = wordcloud && d.group >-1 ? termlist[d.group][0] : d.coname

        textlist.push(             
          <MyText 
            pX={pX} pY={pY} pZ={pZ} key={`text-${i}`} 
            pColor={pColor} content={content} filter={filter} i={i} 
            dataObj={d}
            setClickDetail={setClickDetail}
          />
          )
          }
  

      })



    return (
        <>
  
          
          {textlist}
   
         
        </>
      )
    
}
export default Texts;


