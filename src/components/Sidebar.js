import React, { useState, useEffect } from 'react';
import BarChart from './BarChart';
import Filter from "./Filter"

import { motion, AnimatePresence } from 'framer-motion';

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
        <>
        <AnimatePresence>
        <motion.div 
            layout
            className="sidebar" >

            <div 
                className='barchart-wrapper'
                onClick={toggleSidebar}
                >
            {/* <button className='sidebar-btn' onClick={toggleSidebar}>{expanded ? ">>>" : "<<<"} </button>  */}
            <BarChart filter={filter} />
            </div> 

            <motion.div 
            layout
            className= { ` ${show? "filter--hide": ""} ${expanded ? "filter-wrapper filter-wrapper--expanded" : "filter-wrapper"}`} > 
                
            

                <motion.div 
                    layout
                    initial={{x:-30, opacity:0}}
                    animate={{x:0, opacity:1}}
                    exit={{x:-30, opacity:0} }
                    transition={{ duration:0.5, ease:"easeIn"}}
                    className={expanded ? "filter-content-wrapper filter-content-wrapper--expanded" : "filter-content-wrapper"}> 
                    <Filter 
                    
                    filter={filter}
                    updateFilter={updateFilter}
                    toggleCamera = {toggleCamera}
                
                    />                 
                </motion.div>

                <div className="goback"           
                onClick={toggleSidebar}
                    >
                    ✕
                </div>
            </motion.div>

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
           

        </motion.div>
        </AnimatePresence>
        </>
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
