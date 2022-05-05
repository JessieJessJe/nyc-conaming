import React, { useState, useEffect } from 'react';
import BarChart from './BarChart';
import Filter from "./Filter"



function Sidebar({filter, updateFilter, toggleCamera}){

const [expanded, setExpanded] = useState(false);

const toggleSidebar = () =>{
    setExpanded(!expanded)
}

    return(

        <div className={`${expanded ? "sidebar sidebar--expanded" : "sidebar"}`} >

            <div className='barchart-wrapper'>
            <button className='sidebar-btn' onClick={toggleSidebar}>{expanded ? ">>>" : "<<<"} </button> 
           <BarChart filter={filter} />
            </div> 

            <div className= {`filter--hide ${expanded ? "filter-wrapper filter-wrapper--expanded" : "filter-wrapper"}`} > 
                
            

                <div className={expanded ? "filter-content-wrapper filter-content-wrapper--expanded" : "filter-content-wrapper"}> 
                    <Filter 
                    
                    filter={filter}
                    updateFilter={updateFilter}
                    toggleCamera = {toggleCamera}
                
                    />
                      <button className='sidebar-filter-btn' onClick={toggleSidebar}>Close</button> 
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
