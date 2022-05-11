import React, { useState, useEffect, useContext, useRef, lazy, Suspense } from 'react';

const Texts = lazy(()=> import("./Texts"));

function TextsLazy({filter, setClickDetail, timeline }){
    return (
        <Suspense>
         <Texts 
                 filter={filter}
        
                 setClickDetail={setClickDetail}
                 timeline={timeline}
        />
       </Suspense>
    )
}


export default TextsLazy;