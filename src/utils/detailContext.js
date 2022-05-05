import React, {
    createContext,
    useContext,
    useState,

  } from "react";
  
  // create contexts
  const DetailContextState = createContext();
  const DetailContextUpdater = createContext();
  
  // context consumer hook
  const useDetailContextState = () => {
    // get the context
    const context = useContext(DetailContextState);
  
    // if `undefined`, throw an error
    if (context === undefined) {
      throw new Error("useDetailContextState was used outside of its Provider");
    }
  
    return context;
  };
  
  // context consumer hook
  const useDetailContextUpdater = () => {
    // get the context
    const context = useContext(DetailContextUpdater);
  
    // if `undefined`, throw an error
    if (context === undefined) {
      throw new Error("useDetailContextUpdater was used outside of its Provider");
    }
  
    return context;
  };
  
  const DetailContextProvider = ({ children }) => {
    // the value that will be given to the context
    const [detail, setDetail] = useState(null);

    const [show, setShow] = useState(false);
  
    const showDetail = ((obj) => {
      setDetail(obj);
      if(!show) setShow(true)
    });

    const hideDetail = (()=>{
      if(show) setShow(false)
    })
  
  
    return (
      // the Providers gives access to the context to its children
      <DetailContextState.Provider value={[detail, show]}>
        <DetailContextUpdater.Provider value={[showDetail, hideDetail]}>
          {children}
        </DetailContextUpdater.Provider>
      </DetailContextState.Provider>
    );
  };
  
  export { DetailContextProvider, useDetailContextState, useDetailContextUpdater };