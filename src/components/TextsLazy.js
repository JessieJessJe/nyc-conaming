import React, { useState, useEffect, useContext, useRef, lazy, Suspense } from 'react';

const Texts = lazy(()=> import("./Texts"));

function TextsLazy({filter }){
    return (
        <Suspense>
         <Texts 
                 filter={filter}
        />
       </Suspense>
    )
}


export default TextsLazy;