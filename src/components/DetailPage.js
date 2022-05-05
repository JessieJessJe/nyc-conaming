import React, { useState, useEffect, useContext, useRef, lazy, Suspense, useMemo } from 'react';

import { motion } from 'framer-motion';

import { useDetailContextState, useDetailContextUpdater } from '../utils/detailContext';

import CloseIcon from '@mui/icons-material/Close';

import "./detailpage.css"

const plate = {
    "id": "20211",
    "coname": "Henry Clayton Street",
    "location": "169th Street, Queens, NY",
    "reason": "Henry Clayton, Jr. relentlessly served his community starting in the 1970s, providing free extermination services in his Southeast Queens community. He then went on to open what became one of the largest black owned travel agencies in NYC in March of 1988, growing to employ over 30 black and brown community members who also went on to become professional entrepreneurs. He also partnered with Greater Allen A.M.E. Cathedral of New York to provide safe, affordable, and memorable trips for seniors and their families. Additionally, he used his community route as a Frito-Lay salesman as a pathway to support, employ and mentor young men throughout Jamaica Queens. He provided holiday gifts out of his own pocket for over 150 families every year.",
    "lat": 40.7176028,
    "long": -73.79646029999999,
    "year": "2021",
    "group": 2,
    "borough": "Queens",
    "keywords": []
}



function DetailPage({clickDetail}){

    const [detail, show] = useDetailContextState();
    const [showDetail, hideDetail] = useDetailContextUpdater();

    
    const [plate, setPlate] = useState(null)

    useEffect(()=>{

        showDetail(clickDetail)
        setPlate(clickDetail)

    }, [clickDetail])

return(

    <>

    {show &&
    
            <div id="detail-wrapper" >

            <motion.div 
            layout


            className="intro-plate-each" >

            <p className='sectionTitle text-left'>{plate["coname"]}</p>
            <p className='plate-text-loc'>
            {plate["location"]}
        </p>

        <p className='plate-text-year'>
            {plate["year"]}
        </p>

        <p className='text-normal' style={{backgroundColor: "#ffffff", zIndex:100}}>
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
    

    </>
)
}

export default DetailPage;