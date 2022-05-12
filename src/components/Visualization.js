import React, { useState, useEffect, useContext, useRef, lazy, Suspense, useMemo } from 'react';

import { motion } from 'framer-motion';

import useScrollPosition from "../utils/useScrollPosition";
import { DetailContextProvider } from '../utils/detailContext';

import Header from './Header';
import Sidebar from './Sidebar';
import MyThreeScene from './MyThreeScene';
import DetailPage from './DetailPage';

import {initFilter, getPureFilter} from '../utils/helper'

import "./three.css"
import "./header.css"


function Visualization(){


    const ref = useRef();

    const scrollPosition = useScrollPosition();

    useEffect(()=>{
        if (scrollPosition >= window.innerHeight * 2 ){
            document.getElementById("three-wrapper").position = 'sticky'
        }else{
            document.getElementById("three-wrapper").position = 'relative'
        }

    }, [scrollPosition])


    //original hook for filter
    const [filter, setFilter] = useState(initFilter);

    //hook for barchart in case it modifies filter
    const [newFilter, setNewFilter] = useState(initFilter)


    const updateFilter = (category, value)=>{
        

        switch(category){
            case "init":

                if(newFilter == null) setFilter(initFilter);
                else setFilter({...initFilter, 
                                "group": newFilter["group"],
                                "displaySelectedGroup": newFilter["displaySelectedGroup"]})
                
               
                break;
            case "theme_false":
                //if not exist, insert
                if (!filter["theme"].includes(value)){
                    
                    setFilter((prev)=>{
                        return {...prev, 
                            "theme": [...prev["theme"], value],
                            "group": newFilter["group"],
                            "displaySelectedGroup": newFilter["displaySelectedGroup"]}
                    })

                }
                
                return;

            case "theme_true":
      
                    // updateSearch["theme"] = filter["theme"].filter(f => f !== value)

                    setFilter((prev)=>{
                        return{...prev, 
                            "theme": prev["theme"].filter(f => f !== value),
                            "group": newFilter["group"],
                            "displaySelectedGroup": newFilter["displaySelectedGroup"]}
                    })
                
                return;

            case "angle":

                 
                setFilter((prev)=>{ 

                  return{
                    ...prev,
                    "angle": value,
                    "group": newFilter["group"],
                    "displaySelectedGroup": newFilter["displaySelectedGroup"]
                }
                  })
               
                return; 

            case  "search":

                setFilter((prev)=>{
                    return {...prev, 
                        "search": value}
                })
                return;

            // case "reset":

            //     setFilter({...initFilter, 
            //         "group": newFilter["group"],
            //         "displaySelectedGroup": newFilter["displaySelectedGroup"]})
            //     return;

            default:
                let updateValue = {};
                updateValue[category] = value;
        
                setFilter((prev)=>{
                    return {...prev, ...updateValue}
                })
               
                return;
        }
        




    }

    const filterMemo = useMemo(()=> (filter), [getPureFilter(filter)])

    const newFilterMemo = useMemo(()=> (newFilter), [getPureFilter(newFilter)])

    const [clickDetail, setClickDetail] = useState(null)


    return(
        <>
      <DetailContextProvider>
        <Header />

        <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      layout
        
        id='three-wrapper' ref={ref}>

  

        <MyThreeScene    
        // filter={filterMemo}

        filter={newFilterMemo}

        setClickDetail={setClickDetail}
      
        />

        <Sidebar

        filter={filterMemo}
        updateFilter={updateFilter}
       
        setNewFilter={setNewFilter}

        newFilter = {newFilterMemo}
        />

        <DetailPage 
            clickDetail={clickDetail}
        />
  

        </motion.div>
        </DetailContextProvider>

        </>

    )
}

export default Visualization;