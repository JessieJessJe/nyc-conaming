import React, { useState, useEffect, useRef } from 'react';

import * as d3 from "d3"
import { group_titles, termlist, filterData, getGroupColor, updateGroup, subgroups, dataPrep, initNewFilter, getOpacity, updateNewFilter } from '../utils/helper';

import mydata from "../data/mydata.json"
import './keywordsPlate.css'

import { motion, AnimatePresence } from 'framer-motion';

// reference from
// https://d3-graph-gallery.com/graph/barplot_stacked_basicWide.html

function BarChart({filter, setNewFilter, newFilter}){
    const ref=useRef();

    const [showKeywords, setShowKeywords] = useState(false);
    const [group, setGroup] = useState(-1);
    const [pos, setPos] = useState(0);

    const margin = {top: window.innerHeight*0.15, right: 0, bottom: 0, left: window.innerWidth*0.012}

    const width = window.innerWidth * 0.04 - margin.left - margin.right;
    const height = window.innerHeight * 0.90 - margin.top - margin.bottom;
    const data_len = mydata.length;


    //color palette
    const color = d3.scaleOrdinal()
    .domain(subgroups)
    .range(getGroupColor())

    useEffect(()=>{

        const initialDisplay = async ()=>{

            function sleep(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }

            setNewFilter(initNewFilter(mydata,filter)) 

            await sleep(200);

            drawSVG();
            return;
        }
      

         //setNewFilter, trigger three draw update
        if(newFilter === null) {
            // setNewFilter(initNewFilter(mydata,filter)) 
            // console.log(newFilter, 'inital filter')

            initialDisplay();
            
        }
        else if(!newFilter["displaySelectedGroup"]){ setNewFilter(initNewFilter(mydata,filter)) }
        else setNewFilter(updateNewFilter(filter, newFilter))
              
        // else{
        //     setNewFilter(initNewFilter(mydata,filter))
        // }


    }, [filter])

    useEffect(()=>{

        if(newFilter !== null){
            drawSVG();

        }

    }, [newFilter])


    function drawSVG(){

        const svg = d3.select(ref.current)
        svg.attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")")
                
        ///get data
        let data = dataPrep(filterData(mydata, filter), subgroups)
        // Add Y axis
        const y = d3.scaleLinear()
        .domain([0, data_len])
        .range([0, height]);

        const stacked = d3.stack().keys(subgroups)(data)


            //data input
            svg.selectAll("rect")
            .data(stacked)
            .join(
                enter => enter                 
                    .append("rect")
                    .attr("fill", d => {
                        
                        return color(d.key)} )  

                    .attr("fill-opacity", d => getOpacity( newFilter["group"], d.key))          
                    .call(
                    enter => enter.transition().duration(200)
                    .attr("x", 0)
                    .attr("y", d => y(d[0][0]))
                    .attr("height", d => y(d[0][1]) - y(d[0][0]) )
                    .attr("width", width)
                ),
    
                update => update
                    .attr("fill", d => color(d.key) )   
                    .attr("fill-opacity", d => getOpacity( newFilter["group"], d.key))    
                    .call(
                    update => update.transition().duration(200)
                    .attr("x", 0)
                    .attr("y", d => y(d[0][0]))
                    .attr("height", d => y(d[0][1]) - y(d[0][0]) )
                    .attr("width", width)
                ),
                        
                exit => exit.call(
                    exit => exit.transition().duration(200)
                    .attr("x", 0)
                    .attr("y", height)
                    .attr("height", 0 )
                    .attr("width", width )
                    .remove()
                ),   
    
            )
            .each(function(d){
        
                let that = this;
    
                d3.select(this)
                  .on("click", function(){

                    let [newDisplay, newGroup] = updateGroup(newFilter, d.key);

                    ////toggle keyword page
    
                    setNewFilter((prev)=>{
                    return {
                        ...prev,
                        "displaySelectedGroup":newDisplay,
                        "group": newGroup
                    }
                    })

    
                    d3.select(that)
                      .attr("fill-opacity", getOpacity(newFilter["group"], d.key))
                    })
    
                  .on("mouseenter", function(){

                    setGroup(d.key)
                    setShowKeywords(true)
                    setPos(y(d[0][0]) + margin.top)

                    d3.select(that)
                    .attr("fill-opacity", "1")

                  })

                  .on("mouseout mouseleave", function(){
                    setShowKeywords(false)

                    d3.select(that)
                    .attr("fill-opacity", getOpacity(newFilter["group"], d.key))

                  })

            })
    }

return(
    <>
    <svg id="barchart"
    ref={ref}>

    </svg>

   

    <KeywordPlate 
        group={group}
        show={showKeywords}
        pos={pos}   
    />


    </>
)
}

export default BarChart;

function KeywordPlate({group, show, pos}){
    return(
        <>
    
            {
                group > -1 && (

                    <div 
    
    
    
                    className={show ? 'keywords-plate' : "keywords_plate keywords-plate--hide"} style={{top: `${pos}px`}}>
                    <p className='keywords-title text-left' style={{color: `${getGroupColor()[group]}`}}> {group_titles.get(group)}</p>
    
                    <div className='keywords-terms-wrapper'>
    
                        { termlist[group].map( (term)=>
                        <p className='text-normal keywords-terms' style={{backgroundColor: "#ffffff", zIndex:100}}>
                        {term}
                        </p>
                        )}
                        
                    </div>
    
               
               </div>

                )
            }
  
       </>
        
    )
}