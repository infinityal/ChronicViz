'use strict';

import * as d3 from "d3"
import * as React from 'react';
  
function LineChart() {
  // set the dimensions and margins of the graph
  const margin = {top: 100, right: 30, bottom: 80, left: 325},
  width = 1600 - margin.left - margin.right,
  height = 700 - margin.top - margin.bottom;

  d3.json("src/data/PopData.json").then((data) => {
    data = data.filter((d) => {return d.Variant === "Medium" && d.PopTotal > 450000})
    console.log(data)

    // append the svg object to the body of the page
    const svg = d3.select("#pop_line_chart")
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.top + margin.bottom)
                  .append("g")
                  .attr("transform", `translate(${margin.left},${margin.top})`);

    // group the data: I want to draw one line per group
    const sumstat = d3.group(data, d => d.Location); // nest function allows to group the calculation per level of a factor

    // Add X axis --> it is a date format
    const x = d3.scaleLinear()
      .domain(d3.extent(data, function(d) { return d.Time; }))
      .range([ 0, width ]);
    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x).ticks(5));

    // Add Y axis
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return +d.PopTotal; })])
      .range([ height, 0 ]);
    svg.append("g")
      .call(d3.axisLeft(y));

    // Add X axis label:
    svg.append("text")
           .attr("text-anchor", "end")
           .attr("x", width)
           .attr("y", height + margin.bottom - 30)
           .text("Years");

     // Y axis label:
     svg.append("text")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-90)")
            .attr("y", -margin.right - 50)
            .attr("x", -margin.top)
            .text("Population (Thousands)")

    // color palette
    const color = d3.scaleOrdinal()
      .range(["#DE2910","#FF9933", "#008751"])

    // Draw the line
    svg.selectAll(".line")
        .data(sumstat)
        .join("path")
          .attr("fill", "none")
          .attr("stroke", function(d){ return color(d[0]) })
          .attr("stroke-width", 1.5)
          .attr("d", function(d){
            return d3.line()
              .x(function(d) { return x(d.Time); })
              .y(function(d) { return y(+d.PopTotal); })
              (d[1])
          })



    // Add Title
    svg.append("text")
           .attr("x", (width / 2))             
           .attr("y", 0 - (margin.top / 2))
           .attr("text-anchor", "middle")  
           .style("font-size", "20px") 
           .text("Which country will have the largest population in the future?");


    // Handmade legend
    const legend = d3.select("#linechart_legend")

    legend.append("circle").attr("cx",200).attr("cy",130).attr("r", 6).style("fill", "#DE2910")
    legend.append("circle").attr("cx",200).attr("cy",160).attr("r", 6).style("fill", "#FF9933")
    legend.append("circle").attr("cx",200).attr("cy",190).attr("r", 6).style("fill", "#008751")
    legend.append("text").attr("x", 220).attr("y", 130).text("China").style("font-size", "15px").attr("alignment-baseline","middle")
    legend.append("text").attr("x", 220).attr("y", 160).text("India").style("font-size", "15px").attr("alignment-baseline","middle")
    legend.append("text").attr("x", 220).attr("y", 190).text("Nigeria").style("font-size", "15px").attr("alignment-baseline","middle")


    })

  
  

  return (
    <div className="lineChart">
      <div id="pop_lineChart">
        <svg id = "pop_line_chart" />
        <svg id="linechart_legend" height={300} width={450} />
      </div>
    </div>
  )
}

export default LineChart