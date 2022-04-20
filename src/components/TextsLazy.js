import React, { useState, useEffect, useContext, useRef, lazy, Suspense } from 'react';

const Texts = lazy(()=> import("./Texts"));

function TextsLazy({year, borough}){
    return (
        <Suspense>
         <Texts year={year} borough={borough}/>
       </Suspense>
    )
}


export default TextsLazy;