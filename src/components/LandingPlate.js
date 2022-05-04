import React, { useState, useEffect, useContext } from 'react';
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { motion } from 'framer-motion';

import useScrollPosition from "../utils/useScrollPosition";

import plate0 from './../images/plate0.png';
import plate1 from './../images/plate1.png';
import plate2 from './../images/plate2.png';
import plate3 from './../images/plate3.png';
import plate4 from './../images/plate4.png';
import plate5 from './../images/plate5.png';

import Introduction from './Introduction'

import './imgPlates.css'


function LandingPlate(){
    const navigate = useNavigate();
    const scrollPosition = useScrollPosition();

    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [windowHeight, setWindowHeight] = useState(window.innerHeight)

    let imageWidth = [ 
        windowWidth*0.10,
        windowWidth*0.17,
        windowWidth*0.2,
        windowWidth*0.28,
        windowWidth*0.22,
        windowWidth*0.18 ]


    useEffect(()=>{

    if (scrollPosition === 0){

        // document.getElementById('landing-images-id').style.transform = ``;


        document.getElementById("landing-page-content")
            .style.left = `${0}px`

        document.getElementById("landing-page-content")
            .style.transform = ``
           
        document.getElementById("landing-page-content")
        .style.top = `${-(windowHeight*0.47)}px`

        //////////

        document.getElementsByClassName("landing-plate-wrapper")[0]
            .style.top = `${0}px`
        
        document.getElementsByClassName("landing-plate-wrapper")[0]
            .style.left = `${0}px`

        document.getElementsByClassName("landing-plate-wrapper")[0]
            .style.transform = ``



    }
    else if (scrollPosition < windowHeight * 0.3){

        document.getElementById("landing-page-content")
        .style.left = `${0}px`

        document.getElementById("landing-page-content")
            .style.transform = ``
        
        document.getElementById("landing-page-content")
        .style.top = `${-(windowHeight*0.47)}px`
        //////////////////

            document.getElementById("landing-pole-1")
            .style.transform = ``
            
            document.getElementById("landing-pole-2")
            .style.transform = `rotateY(${Math.sin( (scrollPosition) /windowHeight)*30}deg)`
   

            document.getElementById("plate-1")
                .style.transform = `rotateY(${Math.sin( (scrollPosition) /windowHeight)*90 + 25}deg)`
            

            document.getElementById("plate-3")
                .style.transform = `rotateY(${Math.sin( (scrollPosition) /windowHeight)*90 + 25}deg)`
            
            
            document.getElementById("plate-4")
                .style.transform = `rotateY(${Math.sin( (scrollPosition) /windowHeight)*90 + 25}deg)`

            
            document.getElementById("plate-2")
                .style.transform = `rotateY(${Math.sin( (scrollPosition) /windowHeight)*90 - 25}deg)`

        
        }else if(scrollPosition<windowHeight*0.8){
          
            // let level = 800-300;
            // let level_more = (scrollPosition - 800) * 0.5;
          
            let prev_step = windowHeight * 0.3

            let level = 0;
            let level_more = (scrollPosition - prev_step) * 0.5;

            Array.from(document.getElementsByClassName("landing-pole")).forEach((d)=>{
                // d.style.transform = `translateX(${(800-scrollPosition)/3}px) rotateY(${Math.sin((scrollPosition-level)/window.innerHeight)*30}deg) translateZ(${(800-scrollPosition)/3}px)`
                // // scale(${Math.sin(-Math.PI/800 * scrollPosition + 1.5 * Math.PI)})
                d.style.transform = `translate3d(${(prev_step-scrollPosition)*2}px, 0, 0px)`
            
            })

            document.getElementById("plate-1")
                .style.transform = `
                translate3d(${(prev_step-scrollPosition)*2}px, 0px, 0px)
                rotateY(${Math.sin((scrollPosition-level + level_more )/windowHeight)*90 + 25}deg)
                
                `
            document.getElementById("plate-2")
                .style.transform = `
                translate3d(${(prev_step-scrollPosition)*2}px, 0px, 0px)
                rotateY(${Math.sin((scrollPosition-level + level_more )/windowHeight)*90 - 25}deg)

                `

            document.getElementById("plate-3")
                .style.transform = `
                translate3d(${(prev_step-scrollPosition)*2}px, 0px, 0px)
                rotateY(${Math.sin((scrollPosition-level + level_more )/windowHeight)*90 + 25}deg)
     
                `
            document.getElementById("plate-4")
                .style.transform = `
                translate3d(${(prev_step-scrollPosition)*2}px, 0px, 0px)
                rotateY(${Math.sin((scrollPosition-level + level_more )/windowHeight)*90 + 25}deg)

                `

            document.getElementById("landing-page-content")
            .style.left = `${(scrollPosition-prev_step)}px`

            document.getElementById("landing-page-content")
            .style.transform = `translateX(${(scrollPosition-prev_step)}px)`
 

        }
        
    


    }, [scrollPosition])


    const handleResize = () => {
        setWindowHeight(window.innerHeight);
        setWindowWidth(window.innerWidth);
    }

    useEffect(()=>{
        window.onresize = handleResize;
    }, [])

    
    return(
        <React.Fragment>
           
      
            <div className='landing-plate-wrapper'>

            <div className='pole_plate landing-pole' id='landing-pole-1'></div>
            <div className='pole_plate landing-pole' id='landing-pole-2'></div>
            <div className='pole_plate landing-plate-plate' id='plate-1'>Memories</div>
            <div className='pole_plate landing-plate-plate' id='plate-2'>Around</div>
            <div className='pole_plate landing-plate-plate' id='plate-3'>The</div>
            <div className='pole_plate landing-plate-plate' id='plate-4'>Corner</div>



            <div id='landing-page-content'>
                <div className='sectionTitle' id='landing-page-subtitle'>

                    Understanding the Patterns of 
                    <br/>
                    NYC Honorary Street Naming History      
                </div>

    
                <div id="landing-page-text">

                Street names are how we recognize and navigate the physical spaces. They also manifest the intangibles, the local, historical, cultural, or political legacies of spaces.

                NYC honorary street names, or co-names by the City Council, are one way local activists, communities, and politicians lean on to remap our city in a local sense, interweaving its past, present, and future.


                </div>

            </div>
            </div>

             {/* <motion.div 
             
             initial={{ scaleY: 0 }}
             animate={{ scaleY: 1 }}
             exit={{ scaleY: 0 }}
             transition={{ duration: 0.5 }}
             
             className='images landing-images' id='landing-images-id'>

                <img className='landing-img-0' src={plate0} width={imageWidth[0]} alt="plate" />
                <img className='landing-img-1' src={plate1} width={imageWidth[1]} alt="plate" />
                <img className='landing-img-2' src={plate2} width={imageWidth[2]} alt="plate" />
                <img className='landing-img-3' src={plate3} width={imageWidth[3]} alt="plate" />
                <img className='landing-img-4' src={plate4} width={imageWidth[4]} alt="plate" />
                <img className='landing-img-5' src={plate5} width={imageWidth[5]} alt="plate" />

            </motion.div> */}
          
   
        <Introduction />
        </React.Fragment>

    )
}

export default LandingPlate;