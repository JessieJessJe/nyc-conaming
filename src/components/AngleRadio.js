import React, {useEffect, useReducer, useState, useMemo} from 'react';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const options=[
    { label: 'top-down', value: 'map' },
    { label: 'side', value: "timeline" },
    { label: '360°', value: "landscape" },]


function AngleRadio({ filter, updateFilter, category="angle"}){

    const [selected, setSelected] = useState( options[0].value );

    //TO DO: all vs others checkboxes 
    const handleSelected = (value) =>{
        if (value){
        setSelected(value)
        }else{
        setSelected(options[0].value)
        }

    }

    useEffect(()=>{
        
        // const sel = options.filter((option)=> option.value == selected)
        updateFilter(category, selected)
        
    }, [selected])

      //handle filter reset
    useEffect(()=>{

        setSelected(options[0].value)    

    }, [filter["reset"]])

return (

    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label"
              sx={{
                fontFamily: 'Raw',
                fontSize: "1.2rem",
              }}
      >
          Camera</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={selected}
        onChange={ (event, value)=>{
          handleSelected(value)
          console.log(value)
    
        }}
      >
        <FormControlLabel label="Top-down" control={<Radio />} value="map" />
        <FormControlLabel label="Side" control={<Radio />} value="timeline" />
        <FormControlLabel label="360°" control={<Radio />} value="landscape" />
   
      </RadioGroup>
    </FormControl>
    )
}

export default AngleRadio;


// const AngleCheckbox = ({ filter, updateFilter, category, options})=>{
//     const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
//     const checkedIcon = <CheckBoxIcon fontSize="small" />;  
//     const filterMemo = useMemo(()=> (filter), [getPureFilter(filter)])
  
//     const [selected, setSelected] = useState( options[0] );
  
//     //TO DO: all vs others checkboxes 
//     const handleSelected = (value) =>{
//       if (value){
//         setSelected(value)
//       }else{
//         setSelected(options[0])
//       }
  
//     }
  
//     useEffect(()=>{
      
//       updateFilter(category, selected)
      
//     }, [selected])
  
//     //handle filter reset
//     useEffect(()=>{
  
//       if (filter["reset"]){
//         setSelected(options[0])
//       }
  
//     }, [filterMemo])
  
    
//     return(
//       <Autocomplete
//       // multiple
//       id="checkboxes-tags-demo"
//       options={options} 
//       // disableClearable
//       disableCloseOnSelect
//       // getOptionLabel={(option) => option.label}
//       renderOption={(props, option, { selected }) => (
//         <li {...props}>
//           <Radio
//               style={{
//                 color: "#000000"
//               }}
//             // icon={icon}
//             // checkedIcon={checkedIcon}
//             // style={{ marginRight: 8 }}
//             checked={selected}
//           />
//           {option.label}
//         </li>
//       )}
     
//       renderInput={(params) => (
//         <TextField {...params} label={`Select ${category}`} placeholder= {category} />
//       )}
    
//       value={selected}
//       onChange={ (event, value)=>{
//         handleSelected( value)
  
//       }}
      
//     />
//     )
//   }