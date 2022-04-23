import React, { useState, useEffect } from 'react';
import Filter from "./Filter"

function Sidebar({filter, updateFilter, toggleCamera}){

const [expanded, setExpanded] = useState(false);

const toggleSidebar = () =>{
    setExpanded(!expanded)
}

    return(

        <div className={expanded ? "sidebar sidebar--expanded" : "sidebar"} >
            

                {
                    expanded 
                    ? <SidebarIsOpen toggleSidebar={toggleSidebar} 
                    filter={filter}
                    updateFilter={updateFilter}

                   
                        toggleCamera = {toggleCamera}
             
                    />
                    : <SidebarIsClose toggleSidebar={toggleSidebar} />
                }
           

        </div>

    )

}

function SidebarIsOpen({filter, updateFilter, toggleSidebar, toggleCamera, }){
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

function SidebarIsClose({toggleSidebar}){
    return(
        <button className='sidebar-btn' onClick={toggleSidebar}>Open</button> 
    )
}


export default Sidebar;
