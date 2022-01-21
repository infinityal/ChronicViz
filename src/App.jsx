'use strict';

import './App.css'
import * as d3 from "d3";
import { useState, useEffect } from 'react';
import BarChart from './BarChart';
  
function App() {

  return (
    <div className="App">
      <div className='Header'>
        <h1>World Population Visualization 1950 - 2100</h1>
      </div>
      <BarChart />
    </div>
  )
}

export default App
