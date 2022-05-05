import React, { useState, useEffect, useContext, useRef, lazy, Suspense } from 'react';

const Texts = lazy(()=> import("./Texts"));

function TextsLazy({filter, wordcloud,setClickDetail }){
    return (
        <Suspense>
         <Texts 
                 filter={filter}
                 wordcloud={wordcloud}
                 setClickDetail={setClickDetail}
        />
       </Suspense>
    )
}


export default TextsLazy;