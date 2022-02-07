'use strict';

import './App.css'
import * as React from 'react';
import Divider from '@mui/material/Divider';
import Map from './Map';

  
function App() {

  return (
    <div className="App">
      <div className='Header'>
        <h1>World Population Visualization 1950 - 2100</h1>
      </div>
      <Map />
      <Divider />
      <section id='writeup_section'>
        <h2>Write-Up Section</h2>
        
      </section>
    </div>
  )
} 

export default App
