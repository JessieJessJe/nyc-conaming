import React, {useEffect, useReducer, useState, useMemo} from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from  '@mui/icons-material/Search';


function Search({filter, updateFilter}){

    const [search, setSearch] = useState(null);
    const [input, setInput] = useState("");

    const handleSearch = (e)=>{
        if (e.key === "Enter") {

            if (e.target.value == ""){
                setSearch("");
                setInput("")
            }else{
                setSearch(e.target.value);
                setInput(e.target.value)
            }

        }
    }

    const handleSearchbyClick = (e)=>{

        console.log('input', input, e.target.value)
   
       if (input == ""){
            setSearch("");
             
        }else{
            setSearch(input);         
        }
    }

    useEffect(()=>{

            updateFilter("search", search)        

    }, [search])

    //handle filter reset
    useEffect(()=>{

        setSearch("")
        setInput("")
    
    
    }, [filter["reset"]])

    return(


        <TextField
          key="search-filter"
          placeholder=" Search ( locations, names, postal codes...) "
          onKeyPress={handleSearch}
          onChange = {(event, value)=>{
              
            setInput(value)
          }} 
        
        value={input}
        startAdornment={(
              <InputAdornment

              position="start"
    
              >
                <IconButton
                 edge="end"
                 onClick={handleSearchbyClick} 
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            )}
      
        />

    )
}

export default Search;

// const SearchField = ({filter, updateFilter})=>{
//     const filterMemo = useMemo(()=> (filter), [getPureFilter(filter)])
  
//     let data_filtered = filterData(data, filter)
//     const [search, setSearch] = useState("");
  
//     useEffect(()=>{
  
//       if(!filter["reset"]){
//         updateFilter("search", search)
//       }
  
//     }, [search])
  
//     //handle filter reset
//     useEffect(()=>{
  
//       if (filter["reset"]){
//         setSearch("")
//         updateFilter("reset", false)
//       }
  
  
//     }, [filterMemo])
  
//     return(  
//     <Autocomplete
//       freeSolo
//       id="free-solo-2-demo"
//       // options={data_filtered.map((d) => d.coname).concat(data_filtered.map((d) => d.location))}
  
//       options={data_filtered.map((d) => d.coname)}
//       renderInput={(params, option) => (
//         <TextField
//           key={option}
//           {...params}
//           label="Search co-names"
//           InputProps={{
//             ...params.InputProps,
//             type: 'search',
//           }}
//         />
//       )}
//       value={search}
//       onChange= {(event, value, reason)=>{
  
//         if (value === null){
//           setSearch("")
//         }else{
//           setSearch(value);
//         }
//       }}
//     />
    
//     )
  
//   }


{/* <TextField
          key="search-filter"
          placeholder=" Search ( locations, names, postal codes...) "
          onKeyPress={handleSearch}
          onChange = {(event, value)=>{
              
            setInput(value)
          }} 
        
        value={input}
        startAdornment={(
              <InputAdornment

              position="start"
    
              >
                <IconButton
                 edge="end"
                 onClick={handleSearchbyClick} 
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            )}
      
        />

    ) */}