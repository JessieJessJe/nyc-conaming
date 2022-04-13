import React, { useState, useEffect, useContext, useRef, lazy, Suspense } from 'react';


import { Text} from "@react-three/drei";
import * as THREE from 'three'

import { createBillboardMaterial } from '../utils/createBillboardMaterial'
import { normLat, normLong, normZ, groupColor } from "../utils/helper"

import data from "../data/mydata.json"


function Texts({year}){
    let data_filtered = year === "all" ? data : data.filter(d => d.year == year);

    const [billboardMaterial] = useState(() => createBillboardMaterial(new  THREE.MeshBasicMaterial()))

    let textlist = [];

    data_filtered.forEach((d, i)=>{

        let pX = - normLong(d.long),
            pY = normLat(d.lat),
            pZ = normZ(d.year),
            pColor = groupColor[d.group];

        textlist.push(             
          <Text key={i} fontSize={0.9} position={[pX, pY, pZ]} material={billboardMaterial} color={pColor}>
            {d.coname}
          </Text>
          )

    })
    return (
        <React.Fragment>
          {textlist}
        </React.Fragment>
      )
    
}
export default Texts;