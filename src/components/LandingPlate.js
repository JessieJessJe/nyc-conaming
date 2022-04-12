import React, { useState, useEffect, useContext } from 'react';
import { SectionContext } from '../utils/sectionContext';
import useScrollPosition from "../utils/useScrollPosition";

function LandingPlate(){
    const { setSection } = useContext(SectionContext);
    const scrollPosition = useScrollPosition();

    useEffect(()=>{

    if (scrollPosition === 0){

        setSection(0);

        document.getElementById("landing-page-content")
            .style.top = `${0}px`
        document.getElementById("landing-page-content")
            .style.left = `${0}px`

        document.getElementById("landing-page-content")
            .style.transform = ``

        document.getElementsByClassName("landing-plate-wrapper")[0]
            .style.top = `${0}px`
        
        document.getElementsByClassName("landing-plate-wrapper")[0]
            .style.left = `${0}px`

        document.getElementsByClassName("landing-plate-wrapper")[0]
            .style.transform = ``



    }
    else if (scrollPosition < 300){

            document.getElementById("landing-pole-1")
            .style.transform = ``
            
            document.getElementById("landing-pole-2")
            .style.transform = `rotateY(${Math.sin( (scrollPosition) /window.innerHeight)*30}deg)`
   

            document.getElementById("plate-1")
                .style.transform = `rotateY(${Math.sin( (scrollPosition) /window.innerHeight)*90 + 25}deg)`
            

            document.getElementById("plate-3")
                .style.transform = `rotateY(${Math.sin( (scrollPosition) /window.innerHeight)*90 + 25}deg)`
            
            
            document.getElementById("plate-4")
                .style.transform = `rotateY(${Math.sin( (scrollPosition) /window.innerHeight)*90 + 25}deg)`

            
            document.getElementById("plate-2")
                .style.transform = `rotateY(${Math.sin( (scrollPosition) /window.innerHeight)*90 - 25}deg)`

        }
        else if(scrollPosition<800){
        
            document.getElementById("landing-page-content")
                .style.top = `${-(scrollPosition-300)}px`
            
        }else if(scrollPosition<1200){
          
            let level = 800-300;
            let level_more = (scrollPosition - 800) * 0.5;
            

            Array.from(document.getElementsByClassName("landing-pole")).forEach((d)=>{
                // d.style.transform = `translateX(${(800-scrollPosition)/3}px) rotateY(${Math.sin((scrollPosition-level)/window.innerHeight)*30}deg) translateZ(${(800-scrollPosition)/3}px)`
                // // scale(${Math.sin(-Math.PI/800 * scrollPosition + 1.5 * Math.PI)})
                d.style.transform = `translate3d(${(800-scrollPosition)*2}px, 0, 0px)`
            
            })

            document.getElementById("plate-1")
                .style.transform = `
                translate3d(${(800-scrollPosition)*2}px, 0px, 0px)
                rotateY(${Math.sin((scrollPosition-level + level_more )/window.innerHeight)*90 + 25}deg)
                
                `
            document.getElementById("plate-2")
                .style.transform = `
                translate3d(${(800-scrollPosition)*2}px, 0px, 0px)
                rotateY(${Math.sin((scrollPosition-level + level_more )/window.innerHeight)*90 - 25}deg)

                `

            document.getElementById("plate-3")
                .style.transform = `
                translate3d(${(800-scrollPosition)*2}px, 0px, 0px)
                rotateY(${Math.sin((scrollPosition-level + level_more )/window.innerHeight)*90 + 25}deg)
     
                `
            document.getElementById("plate-4")
                .style.transform = `
                translate3d(${(800-scrollPosition)*2}px, 0px, 0px)
                rotateY(${Math.sin((scrollPosition-level + level_more )/window.innerHeight)*90 + 25}deg)

                `

            document.getElementById("landing-page-content")
            .style.left = `${(scrollPosition-800)}px`

            document.getElementById("landing-page-content")
            .style.transform = `translateX(${(scrollPosition-800)}px)`

        }else{
      
            setSection(1);
        }
        
    


    }, [scrollPosition])

    
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

                    Understanding the patterns of 
                    <br/>
                    NYC honorary street naming history      
                </div>

    
                <div id="landing-page-text">

                Street names are how we recognize and navigate the physical spaces. They also manifest the intangibles, the local, historical, cultural, or political legacies of spaces.

                NYC honorary street names, or co-names by the City Council, are one way local activists, communities, and politicians lean on to remap our city in a local sense, interweaving its past, present, and future.


                </div>

            </div>
       
 
            </div>

        </React.Fragment>

    )
}

export default LandingPlate;