import React, { useState, useEffect, useContext } from 'react';
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { motion, LayoutGroup} from 'framer-motion';

import './imgPlates.css'

import useScrollPosition from "../utils/useScrollPosition";
import plate0 from './../images/plate0.png';
import plate1 from './../images/plate1.png';
import plate2 from './../images/plate2.png';
import plate3 from './../images/plate3.png';
import plate4 from './../images/plate4.png';
import plate5 from './../images/plate5.png';


const plateInfo=[{
    "title":"Little Guyana Avenue",
    "location":"Liberty Avenue, Queens, NY",
    "year":"2021",
    "reason":`This co-naming will commemorate the contributions of the Guyanese community in Richmond Hill. Guyanese now makes up the second largest immigrant group based on the 2010 census.`,
},{
    "title":"Healthcare Heroes Way",
    "location":"West 168th Street, Manhattan, NY",
    "year":"2021",
    "reason":`This co-naming honors the thousands of dedicated medical and nursing professionals, EMT\u2019s, social workers, administrators, custodial and food service staff, volunteers and others vital to the continuity of care during the COVID-19 pandemic, especially those at New York Presbyterian/Columbia University Irving Medical Center.`,
},{
    "title":"Private Danny Chen Way",
    "location":"Elizabeth Street, Manhattan, NY",
    "year":"2013",
    "reason":`Danny Chen was born and raised in Chinatown and attended P.S. 130, I.S. 131 and graduated from Pace High School.  He enlisted in the United States Army and served with C Company, 3rd Battalion, 21st Infantry Regiment, 1st Stryker Brigade Combat Team, 25th Infantry Division in Afghanistan.  On October 3, 2011, he committed suicide as a result of being hazed and maltreated by several superiors.  Eight superiors were subsequently found guilty in connection with his death either by court martial or administrative proceedings.  On January 2, 2013, President Obama signed the National Defense Authorization Act which contains provisions requiring the military to take affirmative steps to prevent hazing.`,
},]

function ImgPlates({toggleIntro, windowWidth}){

const transition_img = {              
    stiffness:314,
    damping: 26,
    mass: 2.3,
    delay: 0,
    type: "spring",
}

let imageWidth = [ 
    windowWidth*0.10,
    windowWidth*0.17,
    windowWidth*0.2,
    windowWidth*0.28,
    windowWidth*0.22,
    windowWidth*0.18 ]


    return(

        <motion.div 
        layout
        className= {`images landing-images ${toggleIntro ? "intro-images" : ""}`}>


        <LayoutGroup>

        <motion.img 
             layout
             layoutId='img-0'
             transition={transition_img}
            className= {`landing-img-0 ${toggleIntro ? "intro-img-0" : ""}`}   src={plate0} width={ toggleIntro? imageWidth[0]*0.7 :imageWidth[0] } alt="plate" />
        <motion.img 
            layout
            layoutId='img-1'
            transition= {transition_img}
            className= {`landing-img-1 ${toggleIntro ? "intro-img-1" : ""}`}   src={plate1} width={toggleIntro? imageWidth[1]*0.7 :imageWidth[1] } alt="plate" />
        <motion.img 
            layout
            layoutId='img-2'
            transition={transition_img}
            className= {`landing-img-2 ${toggleIntro ? "intro-img-2" : ""}`}   src={plate2} width={toggleIntro? imageWidth[2]*0.7 :imageWidth[2] } alt="plate" />
        <motion.img 
            layout
            layoutId='img-3'
            transition={transition_img}
        
            className= {`landing-img-3 ${toggleIntro ? "intro-img-3" : ""}`}   src={plate3} width={toggleIntro? imageWidth[3]*0.7 :imageWidth[3] } alt="plate" />
        <motion.img 
            layoutId='img-4'
            layout
            transition={transition_img}
            className= {`landing-img-4 ${toggleIntro ? "intro-img-4" : ""}`}   src={plate4} width={toggleIntro? imageWidth[4]*0.7 :imageWidth[4] } alt="plate" />
        <motion.img 
            layout
            layoutId='img-5'
            transition={transition_img}
            className= {`landing-img-5 ${toggleIntro ? "intro-img-5" : ""}`}   src={plate5} width={toggleIntro? imageWidth[5]*0.7 :imageWidth[5] } alt="plate" />
        
        </LayoutGroup>
        </motion.div>
    )
}

function PlateText({isPlate, prevScroll, windowHeight, windowWidth}){

    let navigate = useNavigate();


    const scrollPosition = useScrollPosition();

    const transition = { duration: 1.4, ease: [0.6, 0.01, -0.05, 0.9] };


    useEffect(()=>{
        
        document.getElementById("intro-plate-wrapper").style.transform = `translateY(-${(scrollPosition-prevScroll)}px)`;
         
        //navigation
        // if (document.getElementById("intro-plate-wrapper").getBoundingClientRect().bottom <= windowHeight){
        //     navigate("/visualization")
        // }



    }, [scrollPosition])

      

    return(
        <React.Fragment>
        <div  className="intro-plate" id="intro-plate-wrapper">

        {plateInfo.map((plate) => 
                <motion.div 

                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{delay: 1}}
                exit={{ opacity: 0 }}
         
                className="intro-plate-each" key={plate["title"]}>
        
                <p className='sectionTitle text-left'>{plate["title"]}</p>
                <p className='plate-text-loc'>
                {plate["location"]}
               </p>
        
               <p className='plate-text-year'>
                {plate["year"]}
               </p>
          
               <p className='text-normal'>
                {plate["reason"]}
               </p>
                </motion.div>
        )}
        </div>

        </React.Fragment>
    )
}

function Introduction(){
    let navigate = useNavigate();

    const scrollPosition = useScrollPosition();
    
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [windowHeight, setWindowHeight] = useState(window.innerHeight)

    const [isPlate, setIsPlate] = useState(true);
    const [plateNum, setPlateNum] = useState(0)
    const [prevScroll, setPrevScroll] = useState(0)

    let prev_step_plate;

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

        }else if( scrollPosition > windowHeight && scrollPosition < windowHeight * 3){

            let prev_step = windowHeight
            bg.style.transform = `translateY(-${(scrollPosition-prev_step)*1.5}px)`;

        }
        else if (scrollPosition >= window.innerHeight * 4.5){
            navigate("/visualization")
        }else{

        } 


        // check position
        if (bg.getBoundingClientRect().bottom == 0){
           
        }
        else if (bg.getBoundingClientRect().bottom < 0){

            if (!isPlate) {
                setIsPlate(true)
                setPrevScroll(scrollPosition)
             
            }
            
            
        }else{

            if(isPlate){
                setIsPlate(false)
               
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

            {isPlate &&
            <PlateText 
                windowWidth= {windowWidth}
                windowHeight= {windowHeight}
                isPlate = {isPlate}
                prevScroll= {prevScroll}/>    
            }
       
        </motion.div>

        <ImgPlates 
            toggleIntro = {isPlate}
            windowWidth = {windowWidth}
        />      

        </React.Fragment>

    )
}

export default Introduction;