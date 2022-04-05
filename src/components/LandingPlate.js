import React, { useState, useEffect } from 'react';

import useScrollPosition from "../utils/useScrollPosition";

function LandingPlate(){
    const scrollPosition = useScrollPosition();
    useEffect(()=>{

   
        if (scrollPosition < 300){
       Array.from(document.getElementsByClassName("landing-plate-wrapper"))
        .forEach((d)=>{
            // d.style.transform = d.style.transform + `rotateY(${scrollPosition- (window.innerHeight/2)/360}deg)`
       
            d.style.transform = `rotateY(${Math.sin(scrollPosition/window.innerHeight)*30}deg)`
                                   
        })

     
        document.getElementById("plate-1")
            .style.transform = `rotateY(${Math.sin(scrollPosition/window.innerHeight)*30 + 25}deg)`
        

        document.getElementById("plate-3")
            .style.transform = `rotateY(${Math.sin(scrollPosition/window.innerHeight)*30 + 25}deg)`
        
        
        document.getElementById("plate-4")
            .style.transform = `rotateY(${Math.sin(scrollPosition/window.innerHeight)*30 + 25}deg)`

        
        document.getElementById("plate-2")
            .style.transform = `rotateY(${Math.sin(scrollPosition/window.innerHeight)*30 - 25}deg)`
        }
        
        // if (scrollPosition > 500){
        //     Array.from(document.getElementsByClassName("landing-plate-wrapper"))
        //     .forEach((d)=>{
        //         d.style.transform += `
        //         scale3d(${Math.max(500/scrollPosition, 0.5)},${Math.max(500/scrollPosition, 0.5)},${Math.max(500/scrollPosition, 0.5)} )`
    
        //     })
        // }



    }, [scrollPosition])

    
    return(

        <div className='landing-page'>

        <div className='landing-plate-wrapper'>
            <div className='landing-pole' id='landing-pole-1'></div>
            <div className='landing-pole' id='landing-pole-2'></div>
            <div className='landing-plate-plate' id='plate-1'>Memories</div>
            <div className='landing-plate-plate' id='plate-2'>Around</div>
            <div className='landing-plate-plate' id='plate-3'>The</div>
            <div className='landing-plate-plate' id='plate-4'>Corner</div>

            <div className='landing-page-subtitle'>

                Understanding the patterns of 
                <br/>
                NYC honorary street naming history      
                </div>

            </div>
        </div>


    )
}

export default LandingPlate;