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
          <li className='header-nav-link'>
            <Link to="/" style={{ textDecoration: 'none' }}>Home</Link>
          </li>

          <li className='header-nav-link'>
            <Link to="/visualization" style={{ textDecoration: 'none' }}>{ window.innerWidth > 400 ? 'Visualization' : 'Viz'}</Link>
          </li>
        </ul>
      </nav>

        </div>
      

        </React.Fragment>

    )
}

export default Header;