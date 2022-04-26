import React, { useState, useEffect, useContext, useRef, lazy, Suspense } from 'react';

const Texts = lazy(()=> import("./Texts"));

function TextsLazy({filter, wordcloud }){
    return (
        <Suspense>
         <Texts 
                 filter={filter}
                 wordcloud={wordcloud}
        />
       </Suspense>
    )
}


export default TextsLazy;