'use strict';

import './App.css'

import BarChart from './BarChart';
import LineChart from './LineChart';
  
function App() {

  return (
    <div className="App">
      <div className='Header'>
        <h1>World Population Visualization 1950 - 2100</h1>
      </div>
      <BarChart />
      <LineChart />
    </div>
  )
} 

export default App
