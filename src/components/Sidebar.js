import React, { useState, useEffect } from 'react';
import Filter from "./Filter"

function Sidebar({year, handleYear, camera, toggleCamera, borough, handleBorough}){

const [expanded, setExpanded] = useState(false);

const toggleSidebar = () =>{
    setExpanded(!expanded)
}

    return(

        <div className={expanded ? "sidebar sidebar--expanded" : "sidebar"} >
            

                {
                    expanded 
                    ? <SidebarIsOpen toggleSidebar={toggleSidebar} 
                        year = {year}
                        handleYear = {handleYear}
                        camera = {camera}
                        toggleCamera = {toggleCamera}
                        borough = {borough}
                        handleBorough = {handleBorough}
                    />
                    : <SidebarIsClose toggleSidebar={toggleSidebar} />
                }
           

        </div>

    )

}

function SidebarIsOpen({toggleSidebar, year, handleYear, camera, toggleCamera, borough, handleBorough}){
    return(
    <React.Fragment>
        <button className='sidebar-btn sidebar--expanded' onClick={toggleSidebar}>Close</button> 

        <Filter 
        year = {year}
        handleYear = {handleYear}
        camera = {camera}
        toggleCamera = {toggleCamera}
        borough = {borough}
        handleBorough = {handleBorough}
        />
    </React.Fragment>
    )
}

function SidebarIsClose({toggleSidebar}){
    return(
        <button className='sidebar-btn' onClick={toggleSidebar}>Open</button> 
    )
}


export default Sidebar;
