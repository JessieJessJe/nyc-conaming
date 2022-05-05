import React, { useState, useEffect } from 'react';
import BarChart from './BarChart';
import Filter from "./Filter"

import {useDetailContextState, useDetailContextUpdater} from "./../utils/detailContext"

function Sidebar({filter, updateFilter, toggleCamera}){
    
    const [detail, show] = useDetailContextState();
    const [showDetail, hideDetail] = useDetailContextUpdater();


    const [expanded, setExpanded] = useState(false);

    const toggleSidebar = () =>{

        if(show) hideDetail();

        setExpanded(!expanded)
    }

    useEffect(()=>{

        if(show){
            if(expanded) setExpanded(false);
        }

    }, [show])

    return(

        <div className="sidebar" >

            <div 
                className='barchart-wrapper'
                onClick={toggleSidebar}
                >
            {/* <button className='sidebar-btn' onClick={toggleSidebar}>{expanded ? ">>>" : "<<<"} </button>  */}
            <BarChart filter={filter} />
            </div> 

            <div className= { ` ${show? "filter--hide": ""} ${expanded ? "filter-wrapper filter-wrapper--expanded" : "filter-wrapper"}`} > 
                
            

                <div className={expanded ? "filter-content-wrapper filter-content-wrapper--expanded" : "filter-content-wrapper"}> 
                    <Filter 
                    
                    filter={filter}
                    updateFilter={updateFilter}
                    toggleCamera = {toggleCamera}
                
                    />                 
                </div>

                <div className="goback"           
                onClick={toggleSidebar}
                    >
                    ✕
                </div>
            </div>

                {/* {
                    expanded 
                    ? <SidebarIsOpen toggleSidebar={toggleSidebar} 
                    
                    filter={filter}
                    updateFilter={updateFilter}

                   
                    toggleCamera = {toggleCamera}
             
                    />
                    : <SidebarIsClose 
                    filter={filter}
                    toggleSidebar={toggleSidebar} />
                } */}
           

        </div>

    )

}

function SidebarIsOpen({filter,updateFilter, toggleSidebar, toggleCamera, }){
    return(
    <React.Fragment>
        <button className='sidebar-btn sidebar--expanded' onClick={toggleSidebar}>Close</button> 

        <Filter 
        
        filter={filter}
        updateFilter={updateFilter}
 
        toggleCamera = {toggleCamera}
      
        />
    </React.Fragment>
    )
}

function SidebarIsClose({filter, toggleSidebar}){
    return(
        <React.Fragment>
        <button className='sidebar-btn' onClick={toggleSidebar}>Open</button> 
      
        </React.Fragment>
    )
}


export default Sidebar;
