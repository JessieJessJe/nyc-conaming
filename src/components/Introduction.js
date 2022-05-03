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
    const margin_left = 0.2 * window.innerWidth;

    useEffect(()=>{

        if (scrollPosition >= window.innerHeight * 4){
            navigate("/visualization")
        }
        else if(scrollPosition >= window.innerHeight * 0.7){
            document.getElementById('intro-images').style.position = "sticky";
            document.getElementById('intro-images').style.top = "55vh";

            document.getElementById('intro-content').style.position = "relative";
            document.getElementById('intro-content').style.top = "100vh";
            document.getElementById('intro-content').style.opacity = 1;
            
        }

        else if (scrollPosition > 0 ){
            document.getElementById('intro-images').style.position = "relative";
            document.getElementById('intro-images').style.top = "80vh";

            document.getElementById('intro-content').style.position = "sticky";
            document.getElementById('intro-content').style.opacity = 0;

        }
        
        // else if{

        //     navigate("/")
        // }



    }, [scrollPosition])

    return(
        <React.Fragment>

        <motion.div id='intro-wrapper'
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0 }}
              transition={{ duration: 0.5 }}
        >

            <div id='intro-content'>
                    <div className='sectionTitle' id="intro-title">Street matters, manifested</div>

                    <div className='text-norma text-center' id="intro-text">

                    Street names are how we recognize and navigate the physical spaces. They also manifest the intangibles, the local, historical, cultural, or political legacies of spaces.

                    NYC honorary street names, or co-names by the City Council, are one way local activists, communities, and politicians lean on to remap our city in a local sense, interweaving its past, present, and future.

                    </div>
            </div>

                    <div className='images' id='intro-images'>
                        {/* <img src={plate3} height={400} alt="plate" />
                        <img src={build1} height={250}alt="plate" />
                        <img src={plate1} height={250}alt="plate" />
                        <img src={build2} height={280} alt="plate" />
                        <img src={plate2} height={200} alt="plate" /> */}
                
                    
                    </div>
                    
            <div id='intro-content-2'>

            <div className='sectionTitle'>Street names, redefined</div>

            <div className='text-norma text-center' >

            Street names are how we recognize and navigate the physical spaces. They also manifest the intangibles, the local, historical, cultural, or political legacies of spaces.

            NYC honorary street names, or co-names by the City Council, are one way local activists, communities, and politicians lean on to remap our city in a local sense, interweaving its past, present, and future.

            </div>
            </div>
       
        </motion.div>
      

        </React.Fragment>

    )
}

export default Introduction;