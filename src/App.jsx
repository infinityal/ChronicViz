'use strict';

import './App.css'
import * as d3 from "d3";
  
function App() {

  const margin = {top: 70, right: 30, bottom: 200, left: 120},
    width = 1600 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;
  
  console.log("test");

    

  d3.json("src/data/PopData.json").then((data) => {
    data = data.filter((d) => {return d.Variant === "Medium" && d.Time === "2022" && d.PopTotal > 20000})
    console.log(data)

    data.sort(function(b, a) {
      return a.PopTotal - b.PopTotal;
    });

    const x = d3.scaleBand()
      .range([ 0, width ])
      .domain(data.map(d => d.Location))
      .padding(0.2);


     

    const svg_bar = d3.select("#pop_BarChart")
                      .append("svg")
                      .attr("height", height + margin.top + margin.bottom)
                      .attr("class", "Bar_Chart")
                      .attr("width", width + margin.left + margin.right)
                      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
      console.log("svg created!");

      
  
    /*co nst Tooltip = d3
    .select('body')
    .append('div')
    .attr('class', 'd3-tooltip')
    .style('position', 'absolute')
    .style('z-index', '10')
    .style('visibility', 'hidden')
    .style('padding', '10px')
    .style('background', 'rgba(0,0,0,0.6)')
    .style('border-radius', '4px')
    .style('color', '#fff')*/

    const y = d3.scaleLinear()
    .domain([0, 2260])
    .range([ height, 0]);

  
    

    svg_bar.append("g")
      
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    svg_bar.append('g').call(d3.axisLeft(y));
    // Add Y axis
    
    

      
      
  
    // Bars
    svg_bar.selectAll("mybar")
      .data(data)
      .join("rect")
      .attr("x", d => x(d.Location))
      .attr("y", d => y(d.PopTotal / 1000))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d.PopTotal/ 1000))
      .attr("fill", "#69b3a2")
      

      svg_bar.append("text")
      .attr("x", (width / 2))             
      .attr("y", 0 - (margin.top / 2))
      .attr("text-anchor", "right")  
      .style("font-size", "30px") 
      .text("2022 World Population Data(Countries' Pop > 2M) ");

    
   

})


  return (
    <div className="App">
      <h1>World Population Visualization 1950 - 2100</h1>
      <div id = "pop_BarChart"></div>
    </div>
  )
}

export default App
