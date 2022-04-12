import React, { useState, useContext } from "react";
import { SectionProvider } from './utils/sectionContext';

import Display from './components/Display'
import './App.css';

function App() {
  return (
    <SectionProvider>
    <div className="App">
     <Display />
    </div>
    </SectionProvider>
  );
}

export default App;
