import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';

import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route, } from "react-router-dom";

import ScrollToTop from './utils/ScrollToTop';
import LandingPlate from './components/LandingPlate'
import Introduction from './components/Introduction'
import Visualization from './components/Visualization';

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
      <ScrollToTop />
        <Routes>
          <Route path="/" element={<App />}>
          <Route path="landing" element={<LandingPlate />} />
          <Route path="introduction" element={ <Introduction  />} />
          <Route path="visualization" element={ <Visualization />} />
          
        </Route> 
      </Routes>
      </BrowserRouter>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
