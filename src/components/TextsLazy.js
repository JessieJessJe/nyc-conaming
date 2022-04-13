import React, { useState, useEffect, useContext, useRef, lazy, Suspense } from 'react';

const Texts = lazy(()=> import("./Texts"));

function TextsLazy({year}){
    return (
        <Suspense>
         <Texts year={year}/>
       </Suspense>
    )
}


export default TextsLazy;