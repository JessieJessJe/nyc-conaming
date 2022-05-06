import React, { useState, useEffect, useRef } from 'react';

import * as d3 from "d3"
import { filterData, getGroupColor, updateGroup, subgroups, dataPrep, initNewFilter, getOpacity } from '../utils/helper';

import mydata from "../data/mydata.json"
import { easeSin } from 'd3';

// reference from
// https://d3-graph-gallery.com/graph/barplot_stacked_basicWide.html

function BarChart({filter, setNewFilter, newFilter}){
    const ref=useRef();
    const margin = {top: window.innerHeight*0.1, right: 0, bottom: 0, left: window.innerWidth*0.007}

    const width = window.innerWidth * 0.03 - margin.left - margin.right;
    const height = window.innerHeight * 0.95 - margin.top - margin.bottom;
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

            function initializeFilter(){

                return new Promise( resolve => {
                    setNewFilter(initNewFilter(mydata,filter)) 

                    if (newFilter !== null) {
                        console.log('async', newFilter)
                        resolve()
                    }
                })
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
    
                    setNewFilter((prev)=>{
                    return {
                        ...prev,
                        "displaySelectedGroup":newDisplay,
                        "group": newGroup
                    }
                    })
    
                    console.log(newFilter, "newfilter", newGroup)
    
                    d3.select(that)
                      .attr("fill-opacity", getOpacity(newFilter["group"], d.key))
                    })
    
                  .on("mouseenter", function(){
                    d3.select(that)
                      .transition()
                      .ease(d3.easeBack)
                      .duration(300)
                      .attr("width", width/0.8 )
                      .transition()
                      .ease(d3.easeBack)
                      .duration(300)
                      .attr("width", width )
                  })

                  .on("mouseout mouseleave", function(){
                    d3.select(that)
                    .ease(d3.easeBack)
                    .duration(300)
                    .attr("width", width )
                  })

            })
    }

return(
    <svg id="barchart"
    ref={ref}>

    </svg>
)
}

export default BarChart;

