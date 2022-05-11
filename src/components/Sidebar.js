import React, { useState, useEffect } from 'react';
import BarChart from './BarChart';
import Filter from "./Filter"
import Burger from './Burger/Burger';
import { motion, AnimatePresence } from 'framer-motion';

import {useDetailContextState, useDetailContextUpdater} from "./../utils/detailContext"

function Sidebar({filter, updateFilter, setNewFilter, newFilter}){
    
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

            {/* <button className='sidebar-btn' onClick={toggleSidebar}>&#xe236;</button> */}
            <Burger 
             expanded={expanded}
             toggleSidebar={toggleSidebar}
            />

            <div 
                className='barchart-wrapper'
                // onClick={toggleSidebar}
                >
   
            
            <BarChart 
                filter={filter} 
                setNewFilter = {setNewFilter}
                newFilter = {newFilter}
            />

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
                  
                
                    />                 
                </motion.div>

                <div className="goback"           
                onClick={toggleSidebar}
                    >
                    ✕
                </div>
            </motion.div>

        </motion.div>
        </AnimatePresence>
        </>
    )

}

export default Sidebar;
