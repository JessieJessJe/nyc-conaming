import React, { useState, useEffect, useContext, useRef, lazy, Suspense, useMemo } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import { useDetailContextState, useDetailContextUpdater } from '../utils/detailContext';

import "./detailpage.css"


function DetailPage({clickDetail}){

    const [detail, show] = useDetailContextState();
    const [showDetail, hideDetail] = useDetailContextUpdater();

    
    const [plate, setPlate] = useState(null)

    useEffect(()=>{

        if (clickDetail){

            showDetail(clickDetail)
            setPlate(clickDetail)

        }else{
            hideDetail();
        }



    }, [clickDetail])

return(

    <>
    <AnimatePresence>
    {show &&
    
            <div 
            id="detail-wrapper" >

            <motion.div 
              layout="position"

              initial={{x:-30, opacity:0}}
              animate={{x:0, opacity:1}}
              exit={{x:-30, opacity:0} }
              transition={{ duration:0.5, ease:"easeIn"}}

            className="intro-plate-each" >

            <p className='sectionTitle text-left'>{plate["coname"]}</p>
            <p className='plate-text-loc'>
            {plate["location"]}
        </p>

        <p className='plate-text-year'>
            {plate["year"]}
        </p>

        <p className='text-normal plate-reason' style={{backgroundColor: "#ffffff", zIndex:100}}>
            {plate["reason"]}
        </p>
            </motion.div>

        <div className="goback"
            
                onClick={()=>{ 

                    hideDetail(); 
                }}
            >
            ✕
        </div>

        </div>
    }
    </AnimatePresence>

    </>
)
}

export default DetailPage;