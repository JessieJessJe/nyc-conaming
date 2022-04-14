import React, { useState, useEffect, useContext } from 'react';
import { SectionContext } from '../utils/sectionContext';
import useScrollPosition from "../utils/useScrollPosition";

function Header({opacity}){

    let divStyle = {
        opacity: opacity, 
      };

    useEffect(()=>{
        divStyle = {
            opacity: opacity, 
          };

       
    }, [opacity])
  

    return(
        <React.Fragment>

        <div id='header-wrapper' style={divStyle}>
        HEADER memories around the corner
       
        </div>
      

        </React.Fragment>

    )
}

export default Header;