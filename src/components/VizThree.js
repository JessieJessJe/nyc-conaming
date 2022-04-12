import React, { useState, useEffect, useContext, useRef } from 'react';
import { SectionContext } from '../utils/sectionContext';
import useScrollPosition from "../utils/useScrollPosition";
import { Canvas, useFrame } from '@react-three/fiber'

function Box(props) {
    // This reference will give us direct access to the mesh
    const mesh = useRef()
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => (mesh.current.rotation.x += 0.01))
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

function VizThree(){
    const { setSection } = useContext(SectionContext);
    const scrollPosition = useScrollPosition();
    const margin_left = 0.2 * window.innerWidth;

    useEffect(()=>{

    }, [scrollPosition])

    return(
        <React.Fragment>

        <div id='three-wrapper'>

        <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />

        <Box position={[-0.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
        </Canvas>

        </div>
      

        </React.Fragment>

    )
}

export default VizThree;