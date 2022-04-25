import React, { useState, useEffect, useRef } from 'react';

import * as d3 from "d3"
import { filterData, getGroupColor} from '../utils/helper';

import mydata from "../data/mydata.json"

// reference from
// https://d3-graph-gallery.com/graph/barplot_stacked_basicWide.html

function BarChart({filter}){
    const ref=useRef();

    const margin = {top: 100, right: 30, bottom: 10, left: 30}
    const width = window.innerWidth * 0.1 - margin.left - margin.right;
    const height = window.innerHeight * 0.9 - margin.top - margin.bottom;
    const w = window.innerWidth * 0.04;
    const data_len = mydata.length;
  
    useEffect(()=>{
        const svg = d3.select(ref.current)
        svg.attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
                

        //subgroups
        const subgroups = [0,1,2,3,4,5,6,7,8, -1]

        //color palette
        const color = d3.scaleOrdinal()
        .domain(subgroups)
        .range(getGroupColor())

        console.log(getGroupColor())

        ///get data
        
        const data = dataPrep(filterData(mydata, filter), subgroups)

        // Add Y axis
        const y = d3.scaleLinear()
        .domain([0, data_len])
        .range([0, height]);

        const stacked = d3.stack().keys(subgroups)(data)
        console.log(stacked, 'stacked')

        svg.append("g")
        .call(d3.axisLeft(y));

        //data input
        svg.append("g")
            .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")")

 
            .selectAll("rect")

            .data(stacked)
            .join("rect")
            .attr("fill", function(d) { 
                console.log(d.key, 'key', color(d.key),'color')
                return color(d.key); })
            .attr("x", width/2+margin.left - w)
            .attr("y", d => y(d[0][0]))
            .attr("height", d => { 
                console.log(d.key, 'key', y(d[0][1]) - y(d[0][0]),'height')

                return y(d[0][1]) - y(d[0][0])} )
            .attr("width", `${w}px`)

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