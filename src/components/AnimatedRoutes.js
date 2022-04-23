import { useLocation, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import ScrollToTop from './../utils/ScrollToTop';

import App from './../App'
import LandingPlate from './LandingPlate'
import Introduction from './Introduction'
import Visualization from './Visualization';


const AnimatedRoutes = () => {
    const location = useLocation();
  
    return (
      <AnimatePresence  initial={false} exitBeforeEnter>
        
        <Routes location={location} key={location.pathname}>

          <Route path="/" element={<LandingPlate  />} />
          <Route path="visualization" element={ <Visualization />} />
         
    
      
      </Routes>

      </AnimatePresence>
    );
  };
  
  export default AnimatedRoutes;