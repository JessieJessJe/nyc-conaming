//not working... why?
//https://devtrium.com/posts/how-use-react-context-pro#use-react-context-with-a-custom-provider

//Uncaught TypeError: Cannot destructure property 'filter' of '(0 , react__WEBPACK_IMPORTED_MODULE_0__.useContext)(...)' as it is undefined.

import { useState, createContext, useMemo } from 'react';

const FilterContext = createContext(); 



const FilterProvider = (props) => {
    
    const initFilter = {
        "year":["all"],
        "borough":["all"],
        "angle":["map"],
        "theme":["all"]
    }

    const [filter, setFilter] = useState(initFilter);

    const value = useMemo(
    () => ({filter, setFilter}),[filter])


    return (
        <FilterContext.Provider
            value={{filter, setFilter}}
        >
            {props.children}
        </FilterContext.Provider>
    );
}
export { FilterContext, FilterProvider };