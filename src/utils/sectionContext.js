import { useState, createContext, useMemo } from 'react';

const SectionContext = createContext(); 

const SectionProvider = (props) => {
    const [section, setSection] = useState(0);
// the state that we'll be storing the username into

/* because we will be providing an object to the provider, it is better to put the value inside a useMemo so that the component will only re-render when there's a change in the value. */

const value = useMemo(
   () => ({section, setSection}),[section])


    return (
        <SectionContext.Provider
            value={value}
        >
            {props.children}
        </SectionContext.Provider>
    );
}
export { SectionContext, SectionProvider };