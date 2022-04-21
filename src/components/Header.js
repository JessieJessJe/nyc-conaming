import React, { useState, useEffect, useContext } from 'react';

import { Link, useNavigate} from "react-router-dom";

function Header({opacity}){

    let divStyle = {
        opacity: opacity, 
      };

    
    useEffect(()=>{
        divStyle = {
            opacity: opacity, 
          };

       
    }, [opacity])
  
    let navigate = useNavigate();

    const handleClick = ()=> {
        
            navigate("/")
        
    }

    return(
        <React.Fragment>

        <div id='header-wrapper' style={divStyle}>
        <div id='header-words-wrapper' onClick={handleClick}>
            <span className='header-words' id='header-m'>Memories</span>
            <span className='header-words' id='header-a'>Around</span>
            <span className='header-words' id='header-t'>The</span>
            <span className='header-words' id='header-c'>Corner</span>
        </div>

        <nav>
        <ul className='header-nav'>
          <li>
            <Link to="/">Home</Link>
          </li>
          {/* <li>
            <Link to="/introduction">About</Link>
          </li> */}
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