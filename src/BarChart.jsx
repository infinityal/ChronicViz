'use strict';


import * as d3 from "d3";
import { useState, useEffect } from 'react';

export function BarChart() {
    const [year, setYear] = useState(2022);

    const margin = {top: 70, right: 30, bottom: 200, left: 120},
      width = 1600 - margin.left - margin.right,
      height = 700 - margin.top - margin.bottom;
  
      console.log(year);
  
  
  
      
    useEffect(() => {
      d3.json("src/data/PopData.json").then((data) => {
        data = data.filter((d) => {return d.Variant === "Medium" && d.Time === year.toString() && d.PopTotal > 20000})
        console.log(data)
    
        data.sort(function(b, a) {
          return a.PopTotal - b.PopTotal;
        });
    
        const x = d3.scaleBand()
          .range([ 0, width ])
          .domain(data.map(d => d.Location))
          .padding(0.2);
    
        const tooltip = d3.select("#barchart_tooltip")
          .append("div")
          .style("opacity", 0)
          .attr("class", "tooltip")
          .style("background-color", "white")
          .style("border", "solid")
          .style("border-width", "2px")
          .style("border-radius", "5px")
          .style("padding", "5px")
         
        const mouseover = function(event,d) {
          tooltip
            .style("opacity", 1)
          d3.select(this)
            .style("stroke", "black")
            .style("opacity", 1)
        }
        const mousemove = function(event,d) {
          tooltip
            .html('<u>' + d.Location + '</u>' + "<br>" + d.PopTotal * 1000 + " inhabitants")
            .style("left", (event.x)/2 + "px")
            .style("top", (event.y)/2 + "px")
        }
        const mouseleave = function(event,d) {
          tooltip
            .style("opacity", 0)
          d3.select(this)
            .style("stroke", "none")
            .style("opacity", 0.8)
        }
    
    
        const svg_bar = d3.select(".svg_bar_chart")
                          .attr("height", height + margin.top + margin.bottom)
                          .attr("class", "Bar_Chart")
                          .attr("width", width + margin.left + margin.right)
                          .append("g")
                          .attr("transform", `translate(${margin.left},${margin.top})`);
        console.log("svg created!");
    
        const y = d3.scaleLinear()
        .domain([0, 2260])
        .range([ height, 0]);
    
      
        
        // Add X axis
        svg_bar.append("g")
          
          .attr("transform", `translate(0, ${height})`)
          .call(d3.axisBottom(x))
          .selectAll("text")
          .attr("transform", "translate(-10,0)rotate(-45)")
          .style("text-anchor", "end");
    
        // Add Y axis
        svg_bar.append('g').call(d3.axisLeft(y));
  
        // Color Setting
        /*const color = d3.scaleLinear().domain([1,50])
                        .range(["white", "blue"])*/
    
        // Add Bars
        svg_bar.selectAll("bar")
          .data(data)
          .join("rect")
          .attr("x", d => x(d.Location))
          .attr("y", d => y(d.PopTotal / 1000))
          .attr("width", x.bandwidth())
          .attr("height", d => height - y(d.PopTotal/ 1000))
          .attr("fill", "#44CEF6")
          .on("mouseover", mouseover)
          .on("mousemove", mousemove)
          .on("mouseleave", mouseleave)
          .transition()
          
    
        // Add Title
        svg_bar.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "20px") 
        .text(year + " Population Data(Countries' Pop > 2M) ");
  
        console.log(year);
  
  
      
    });
  
  })
  return (
    <div className="Barchart">
      <form>
        <input placeholder='1950-2100' type="number" id="bar_chart_input" value={year} onChange={(e) => {setYear(e.target.value)}}/>
      </form>
      <div id = "pop_BarChart">
        <svg className='svg_bar_chart'/>
      </div>
      <div id="barchart_tooltip"></div>
    </div>
  )
}

export default BarChart