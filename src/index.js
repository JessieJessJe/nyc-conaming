import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import reportWebVitals from './reportWebVitals';
import { BrowserRouter} from "react-router-dom";

import ScrollToTop from './utils/ScrollToTop';

import AnimatedRoutes from './components/AnimatedRoutes'

import { FilterProvider } from './utils/filterContext';

ReactDOM.render(
  <React.StrictMode>
    
      <BrowserRouter>
      <FilterProvider>

      <AnimatedRoutes />
      </FilterProvider>
      </BrowserRouter>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
