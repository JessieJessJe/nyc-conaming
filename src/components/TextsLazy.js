import React, { useState, useEffect, useContext, useRef, lazy, Suspense } from 'react';

const Texts = lazy(()=> import("./Texts"));

function TextsLazy({filter, wordcloud,setClickDetail, timeline }){
    return (
        <Suspense>
         <Texts 
                 filter={filter}
                 wordcloud={wordcloud}
                 setClickDetail={setClickDetail}
                 timeline={timeline}
        />
       </Suspense>
    )
}


export default TextsLazy;