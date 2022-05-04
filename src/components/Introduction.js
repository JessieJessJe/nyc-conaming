import React, { useState, useEffect, useContext } from 'react';
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { motion } from 'framer-motion';

import useScrollPosition from "../utils/useScrollPosition";

import plate1 from './../images/plate1.png';
import plate2 from './../images/plate2.png';
import plate3 from './../images/plate3.png';
import plate4 from './../images/plate4.png';
import plate5 from './../images/plate5.png';

function Introduction(){
    let navigate = useNavigate();

    const scrollPosition = useScrollPosition();
    
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [windowHeight, setWindowHeight] = useState(window.innerHeight)

    const handleResize = () => {
        setWindowHeight(window.innerHeight);
        setWindowWidth(window.innerWidth);
    }

    useEffect(()=>{
        window.onresize = handleResize;
    }, [])

    useEffect(()=>{


        if (scrollPosition === 0){

            document.getElementById('intro-bg-rect').style.transform = ``;

        }else if( scrollPosition > windowHeight && scrollPosition < windowHeight * 3){

            let prev_step = windowHeight
            document.getElementById('intro-bg-rect').style.transform = `translateY(-${(scrollPosition-prev_step)*1.5}px)`;
         
        }else if (scrollPosition >= window.innerHeight * 4){
            navigate("/visualization")
        }


    }, [scrollPosition])

    return(
        <React.Fragment>

        <motion.div id='intro-wrapper'
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0 }}
              transition={{ duration: 0.5 }}
        >



                    {/* <div className='images' id='intro-images'>
                        <img src={plate3} height={400} alt="plate" />
                        <img src={build1} height={250}alt="plate" />
                        <img src={plate1} height={250}alt="plate" />
                        <img src={build2} height={280} alt="plate" />
                        <img src={plate2} height={200} alt="plate" />
                
                    
                    </div> */}
            
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

            <div className="intro-plate" id='plate-content-1'>
                    <div className='sectionTitleinPlate'>Little Guyana Avenue</div>

                    <div className='text-normal text-center'>

                    This co-naming will commemorate the contributions of the Guyanese community in Richmond Hill. Guyanese now makes up the second largest immigrant group based on the 2010 census.
                    </div>
            </div>
       
        </motion.div>
      

        </React.Fragment>

    )
}

export default Introduction;