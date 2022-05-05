import React, { useState, useEffect, useRef } from 'react';
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { motion, LayoutGroup, AnimatePresence} from 'framer-motion';

import './imgPlates.css'
import './textPlates.css'
import './intro.css'

import useScrollPosition from "../utils/useScrollPosition";

import plate0 from './../images/plate0.png';
import plate1 from './../images/plate1.png';
import plate2 from './../images/plate2.png';
import plate3 from './../images/plate3.png';
import plate4 from './../images/plate4.png';
import plate5 from './../images/plate5.png';


const plateInfo=[
    {   
    "x":0.32,
    "y":0.62, 
    "title":"Private Danny Chen Way",
    "location":"Elizabeth Street, Manhattan, NY",
    "year":"2013",
    "reason":`Danny Chen was born and raised in Chinatown. He enlisted in the United States Army and served with 25th Infantry Division in Afghanistan.  On October 3, 2011, he committed suicide as a result of being hazed and maltreated by several superiors.  On January 2, 2013, President Obama signed the National Defense Authorization Act which contains provisions requiring the military to take affirmative steps to prevent hazing.`,
},{
    "x":0.41,
    "y":0.35, 
    "title":"Little Guyana Avenue",
    "location":"Liberty Avenue, Queens, NY",
    "year":"2021",
    "reason":`This co-naming will commemorate the contributions of the Guyanese community in Richmond Hill. Guyanese now makes up the second largest immigrant group based on the 2010 census.`,
},{ "x":0.20,
    "y":0.08,
    "title":"Healthcare Heroes Way",
    "location":"West 168th Street, Manhattan, NY",
    "year":"2021",
    "reason":`This co-naming honors the thousands of dedicated medical and nursing professionals, EMT\u2019s, social workers, administrators, custodial and food service staff, volunteers and others vital to the continuity of care during the COVID-19 pandemic, especially those at New York Presbyterian/Columbia University Irving Medical Center.`,
},]

function ImgPlates({toggleIntro, windowWidth, showNext}){

const transition_img = {              
    stiffness:314,
    damping: 26,
    mass: 2.3,  
    type: "spring",
    delay:0,
    duration:1
}

let imageWidth = [ 
    windowWidth*0.10,
    windowWidth*0.17,
    windowWidth*0.2,
    windowWidth*0.28,
    windowWidth*0.22,
    windowWidth*0.18 ]

const getImgClass = (idx) => {
    if (showNext) return `intro-img-${idx} intro-img-out`
    if (toggleIntro) return `intro-img-${idx}`
    return ""
}


    return(

        <AnimatePresence>

        <motion.div 
        layout = "position"
        initial= {{ opacity:1 }}
        animate={{opacity:1}}
        exit={{ opacity:0 }}
        transition={{ delay:0, duration: 1, ease: "linear" }}

        className= {`images landing-images ${toggleIntro ? "intro-images" : ""} ${showNext ? "intro-images-out" : ""}`}>


        <LayoutGroup>

        <motion.img 
             layout = "position"
            layoutId='img-0'
            animate={{opacity:1}}
            exit={{ opacity:0 }}
            transition={transition_img}
            className= {`landing-img-0 ${ getImgClass(0) }`} src={plate0} width={ toggleIntro? imageWidth[0]*0.7 :imageWidth[0] } alt="plate" />
        <motion.img 
             layout = "position"
            layoutId='img-1'
            animate={{opacity:1}}
            exit={{ opacity:0 }}
            transition= {transition_img}
            className= {`landing-img-1 ${toggleIntro ? "intro-img-1" : ""} ${showNext ? "intro-img-out" : ""}`}   src={plate1} width={toggleIntro? imageWidth[1]*0.7 :imageWidth[1] } alt="plate" />
        <motion.img 
             layout = "position"
            layoutId='img-2'
            animate={{opacity:1}}
            exit={{ opacity:0 }}
            transition={transition_img}
            className= {`landing-img-2 ${toggleIntro ? "intro-img-2" : ""} ${showNext ? "intro-img-out" : ""}`}   src={plate2} width={toggleIntro? imageWidth[2]*0.7 :imageWidth[2] } alt="plate" />
        <motion.img 
             layout = "position"
            layoutId='img-3'
            animate={{opacity:1}}
            exit={{ opacity:0 }}
            transition={transition_img}
        
            className= {`landing-img-3 ${toggleIntro ? "intro-img-3" : ""} ${showNext ? "intro-img-out" : ""}`}   src={plate3} width={toggleIntro? imageWidth[3]*0.7 :imageWidth[3] } alt="plate" />
        <motion.img 
            layoutId='img-4'
            layout = "position"
            animate={{opacity:1}}
            exit={{ opacity:0 }}
            transition={transition_img}
            className= {`landing-img-4 ${toggleIntro ? "intro-img-4" : ""} ${showNext ? "intro-img-out" : ""}`}   src={plate4} width={toggleIntro? imageWidth[4]*0.7 :imageWidth[4] } alt="plate" />
        <motion.img 
            layout = "position"
            layoutId='img-5'
            animate={{opacity:1}}
            exit={{ opacity:0 }}
            transition={transition_img}
            className= {`landing-img-5 ${toggleIntro ? "intro-img-5" : ""} ${showNext ? "intro-img-out" : ""}`}   src={plate5} width={toggleIntro? imageWidth[5]*0.7 :imageWidth[5] } alt="plate" />
        
        </LayoutGroup>
        </motion.div>
        </AnimatePresence>
    )
}


function PlateTextEach({plateNum, windowHeight, windowWidth}){

    const ref = useRef();

    let plate = plateInfo[plateNum];

    let left = plate["x"] * windowWidth + 'px';
    let top = plate["y"] * windowHeight + 'px' ;

    let speed = plateNum == 2 ? 1 : 2

    return(      
    
    <motion.div  
        layout
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity:0,  x: 100,}}
        transition={{ delay:0.5, duration: speed, ease:[0.58, -0.1, 0, 0.71] }}

        style={{ top: top, left:left}}
        className="intro-plate" id="intro-plate-wrapper">
    
    <motion.div 
        layout

        ref={ref}
        className="intro-plate-each" >

        <p className='sectionTitle text-left'>{plate["title"]}</p>
        <p className='plate-text-loc'>
        {plate["location"]}
       </p>

       <p className='plate-text-year'>
        {plate["year"]}
       </p>
  
       <p className='text-normal plate-reason' style={{backgroundColor: "#ffffff", zIndex:100}}>
        {plate["reason"]}
       </p>
    </motion.div>
    </motion.div>
    )

}

function PlateText({prevScroll, windowHeight, windowWidth, showNext, setNext}){


    const [plateNum, setPlateNum] = useState(undefined)
    const scrollPosition = useScrollPosition();

    useEffect(()=>{

        let process = (scrollPosition - prevScroll)/windowHeight; 
     
        if ( process < 0.1){

            if (plateNum !== undefined)  setPlateNum(undefined)
        
        }else if (process < 0.5){

            if (plateNum !== 0)  setPlateNum(0)
           
        // }else if ( process < 0.6){
        //     if (plateNum !== undefined)  setPlateNum(undefined)
        }
        
        else if (process < 1){
            if (plateNum !== 1)  setPlateNum(1)

        // }else if ( process < 1.1){
        //     if (plateNum !== undefined)  setPlateNum(undefined)
        
        }else if (process < 1.5){
            if (plateNum !== 2)  setPlateNum(2)

            if(showNext){
                setNext(false)
                document.getElementById('intro-bg-rect-2').style.transform = ``;
                document.getElementById('intro-content-2').style.transform = ``;
            } 
        }else{
            if (!showNext) setNext(true);

            if (plateNum !== undefined)  setPlateNum(undefined)
        
        }


    }, [scrollPosition])

      

    return(
        <React.Fragment>
            <AnimatePresence>

        { plateNum !== undefined &&
                <PlateTextEach 
                    key = { plateNum + 'wrapper'}
                    plateNum = {plateNum}
                    windowHeight={windowHeight}
                    windowWidth={windowWidth}
                />
        }
            </AnimatePresence>


        </React.Fragment>
    )
}

function Introduction(){
    let navigate = useNavigate();

    const scrollPosition = useScrollPosition();
    
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [windowHeight, setWindowHeight] = useState(window.innerHeight)

    const [isPlate, setIsPlate] = useState(true);

    const [prevScroll, setPrevScroll] = useState(0)

    const [showNext, setNext] = useState(false)

    const handleResize = () => {
        setWindowHeight(window.innerHeight);
        setWindowWidth(window.innerWidth);
    }

    useEffect(()=>{
        window.onresize = handleResize;
    }, [])

    useEffect(()=>{

        let bg =  document.getElementById('intro-bg-rect');

        if (scrollPosition === 0){

            bg.style.transform = ``;
            document.getElementById('intro-bg-rect-2').style.transform = ``;
            document.getElementById('intro-content-2').style.transform = ``;
            setNext(false)
            setIsPlate(false);

        }else if( scrollPosition > windowHeight && scrollPosition < windowHeight * 3){

            let prev_step = windowHeight
            bg.style.transform = `translateY(-${(scrollPosition-prev_step)*1.5}px)`;

        }
        else if (scrollPosition >= window.innerHeight * 5.8){
            navigate("/visualization")
        }else{

        } 


        // check position
        if (bg.getBoundingClientRect().bottom == 0){
           
        }
        else if (bg.getBoundingClientRect().bottom <0 ){

            if (!isPlate) {
                setIsPlate(true)
                setPrevScroll(scrollPosition)
             
            }
            
            
        }else{

            if(isPlate){
                setIsPlate(false)
                }
             
        }

        //display next page



        if (showNext){
            let prev = prevScroll + 1.5 * windowHeight;
            document.getElementById('intro-bg-rect-2').style.transform = `translateY(-${(scrollPosition-prev)*1.5}px)`;
            document.getElementById('intro-content-2').style.transform = `translateY(-${(scrollPosition-prev)}px)`;
            
            if (document.getElementById('intro-bg-rect-2').getBoundingClientRect().bottom <= windowHeight* 0.6){
                navigate("/visualization")
            }
        }


    }, [scrollPosition])

    return(
        <React.Fragment>

        <motion.div id='intro-wrapper'
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0 }}
        >
            
            <div id ='intro-bg-rect'></div>
            <div id ='intro-bg-rect-2'></div>
                    
            <div id='intro-content-0'>

                    <div className='sectionTitle'>Street names, redefined</div>

                    <div className='text-normal text-center' >

                    Street names are how we recognize and navigate the physical spaces. They also manifest the intangibles, the local, historical, cultural, or political legacies of spaces.

                    NYC honorary street names, or co-names by the City Council, are one way local activists, communities, and politicians lean on to remap our city in a local sense, interweaving its past, present, and future.

                    </div>
            </div>

            <div id='intro-content-1'>
                    <div className='sectionTitle' id="intro-title">Street matters, manifested</div>

                    <div className='text-normal text-center'>

                    Street names are how we recognize and navigate the physical spaces. They also manifest the intangibles, the local, historical, cultural, or political legacies of spaces.

                    NYC honorary street names, or co-names by the City Council, are one way local activists, communities, and politicians lean on to remap our city in a local sense, interweaving its past, present, and future.

                    </div>
            </div>

            <div id='intro-content-2'>
                    <div className='sectionTitle'>A Generated NYC Map</div>

                    <div className='text-normal text-center'>

                    Street names are how we recognize and navigate the physical spaces. They also manifest the intangibles, the local, historical, cultural, or political legacies of spaces.

                    NYC honorary street names, or co-names by the City Council, are one way local activists, communities, and politicians lean on to remap our city in a local sense, interweaving its past, present, and future.

                    </div>
            </div>

            {isPlate &&
            <PlateText 
                windowWidth= {windowWidth}
                windowHeight= {windowHeight}
                isPlate = {isPlate}
                prevScroll= {prevScroll}
                showNext = {showNext}
                setNext = {setNext}
                />    
            }
       
        </motion.div>

        <ImgPlates 
            toggleIntro = {isPlate}
            windowWidth = {windowWidth}
            showNext = {showNext}
        />      

        </React.Fragment>

    )
}

export default Introduction;