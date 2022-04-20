import React, { useState, useEffect, useContext } from 'react';

import { Link} from "react-router-dom";

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
       
        <nav>
        <ul className='header-nav'>
          <li>
            <Link to="/landing">Home</Link>
          </li>
          <li>
            <Link to="/introduction">About</Link>
          </li>
          <li>
            <Link to="/visualization">Visualization</Link>
          </li>
        </ul>
      </nav>
        </div>
      

        </React.Fragment>

    )
}

export default Header;