import React, { useState, useEffect, useRef } from 'react';

import * as d3 from "d3"
import { filterData, getGroupColor, convertRemToPixels} from '../utils/helper';

import mydata from "../data/mydata.json"

// reference from
// https://d3-graph-gallery.com/graph/barplot_stacked_basicWide.html

function BarChart({filter}){
    const ref=useRef();
    const margin = {top: window.innerHeight*0.1, right: convertRemToPixels(2), bottom: 10, left: convertRemToPixels(0.7)}

    const width = window.innerWidth * 0.05 - margin.left - margin.right;
    const height = window.innerHeight * 0.9 - margin.top - margin.bottom;
    const data_len = mydata.length;

    //subgroups
    const subgroups = [0,1,2,3,4,5,6,7,8, -1]

    //color palette
    const color = d3.scaleOrdinal()
    .domain(subgroups)
    .range(getGroupColor())

    useEffect(()=>{
        const svg = d3.select(ref.current)
        svg.attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")")
                
        ///get data
        
        const data = dataPrep(filterData(mydata, filter), subgroups)

        // Add Y axis
        const y = d3.scaleLinear()
        .domain([0, data_len])
        .range([0, height]);

        const stacked = d3.stack().keys(subgroups)(data)
  

        // const stacked_clean = stacked.filter( s => s[0][1] - s[0][0] > 0)
        // console.log(stacked_clean)

        //data input
        svg.selectAll("rect")
            .data(stacked)
            .join(
                enter => enter                 
                    .append("rect")
                    .attr("fill", d => {
                        console.log(color(d.key), 'color', d.key )
                        return color(d.key)} )            
                    .call(
                    enter => enter.transition().duration(200)
                    .attr("x", 0)
                    .attr("y", d => y(d[0][0]))
                    .attr("height", d => y(d[0][1]) - y(d[0][0]) )
                    .attr("width", width)
                ),

                update => update
                    .attr("fill", d => color(d.key) )   
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
 

    }, [filter])

return(
    <svg id="barchart"
    ref={ref}>

    </svg>
)
}

export default BarChart;

function dataPrep(data, subgroups){
    let arr = []
    let obj = {}
    subgroups.forEach( g => {
         let count = 0;
         data.forEach( d =>{
             if(d.group === g) count++
         })

        obj[g] = count
    })
    arr.push(obj)
    return arr
 }