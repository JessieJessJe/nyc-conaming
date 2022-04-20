import React, { useState, useEffect, useContext } from 'react';

import useScrollPosition from "../utils/useScrollPosition";

import plate1 from './../images/plate1.png';
import plate2 from './../images/plate2.png';
import plate3 from './../images/plate3.png';
import build1 from './../images/build1.png';
import build2 from './../images/build2.png';

function Introduction(){

    const scrollPosition = useScrollPosition();
    const margin_left = 0.2 * window.innerWidth;

    useEffect(()=>{

        if(scrollPosition >= window.innerHeight * 0.55 + window.innerHeight * 0.8){
            document.getElementById('intro-images').style.position = "sticky";
            document.getElementById('intro-images').style.top = "55vh";

            document.getElementById('intro-content').style.position = "relative";
            document.getElementById('intro-content').style.top = "100vh";
            document.getElementById('intro-content').style.opacity = 1;
            
        }

        else if (scrollPosition >= window.innerHeight){

        }
        
        else{
            document.getElementById('intro-images').style.position = "relative";
            document.getElementById('intro-images').style.top = "80vh";

            document.getElementById('intro-content').style.position = "sticky";
            document.getElementById('intro-content').style.opacity = 0;
         
        }



    }, [scrollPosition])

    return(
        <React.Fragment>

        <div id='intro-wrapper'>

            <div id='intro-content'>
                    <div className='sectionTitle' id="intro-title">say something</div>

                    {/* click on the street signs to get information.
                    landmark images scroll away. */}
            </div>

            <div className='images' id='intro-images'>
                <img src={plate3} height={400} alt="plate" />
                <img src={build1} height={250}alt="plate" />
                <img src={plate1} height={250}alt="plate" />
                <img src={build2} height={280} alt="plate" />
                <img src={plate2} height={200} alt="plate" />
          
            
            </div>
       
        </div>
      

        </React.Fragment>

    )
}

export default Introduction;