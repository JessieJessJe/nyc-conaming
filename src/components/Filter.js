import React, {useEffect, useReducer, useState, useMemo} from 'react';

import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import FormLabel from '@mui/material/FormLabel';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';

import MenuItem from '@mui/material/MenuItem';

import Stack from '@mui/material/Stack';

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from '@mui/material/OutlinedInput';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ThemeOptions } from '../utils/theme';

import AngleRadio from './AngleRadio';
import Search from './Search';
import { filterData, getPureFilter, options_theme, options_year, options_borough  } from '../utils/helper';


const theme = createTheme( ThemeOptions );


//check if 'all' is selected for Mycheckbox
const ifAll = (selected)=>{
  return selected.map(s => s.value).includes('all')
}

//stripe away all
const returnOthers = (value) => {
  return value.filter( (v) => v.value !== 'all')
}

const MyCheckbox = ({ filter, updateFilter, category, options})=>{
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;  

  const filterMemo = useMemo(()=> (filter), [getPureFilter(filter)])

  const [selected, setSelected] = useState( [options[0]] );

  const handleSelected = (value) =>{
    
    //if val empty -> all default 

    //if prev is all, and select others -> others

    //if prev no all, select all -> all only

    if (value.length == 0){
      setSelected( [options[0]] )
    }else if ( ifAll(selected) ){
      setSelected(  returnOthers(value))
    }else{

      if (ifAll(value)) setSelected( [options[0]] )
      else setSelected(value)

    }
  }

  useEffect(()=>{
  
      updateFilter(category, selected.map(d => d.value))
    
  }, [selected])

  //handle filter reset
  useEffect(()=>{

      setSelected([options[0]])   

  }, [filter["reset"]])

  
  return(
    <Autocomplete
    multiple
    id="checkboxes-tags-demo"
    options={options} 
    // disableClearable
    disableCloseOnSelect
    // getOptionLabel={(option) => option.label}
    renderOption={(props, option, { selected }) => (
      <li {...props}>
        <Checkbox
          icon={icon}
          checkedIcon={checkedIcon}
          style={{ marginRight: 8 }}
          checked={selected}
        />
        {option.label}
      </li>
    )}

    renderInput={(params) => (
      <TextField {...params} placeholder= {`${category}s`} />
    )}
  
    value={selected}
    onChange={ (event, value)=>{
      handleSelected( value)

    }}
    
  />
  )
}




function Filter({filter, updateFilter}){

  const resetFilter = ()=>{
    // updateFilter("init")
    
    updateFilter("reset", !filter["reset"]) //why thsi? double refreshing
  }

    return(

        <React.Fragment> 

           <ThemeProvider theme={theme}>

            <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
            spacing={2}
            >

            <AngleRadio        
            filter={filter}
            updateFilter={updateFilter}
            category="angle"
            />   

            
            <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
            spacing={1}
            >
            <FormLabel id="demo-group-label"      
              sx={{
                fontFamily: 'Raw',
                fontSize: "1.2rem",
              }}>
            
            Filter by</FormLabel>
  

            <ThemeMultiSelect
            
            filter={filter}
            updateFilter={updateFilter}
            />

            <MyCheckbox 
      
            filter={filter}
            updateFilter={updateFilter}
            category="year"
            options= {options_year}
            />

            <MyCheckbox         
            filter={filter}
            updateFilter={updateFilter}
            category="borough"
            options= {options_borough}
            />     


            <Search 
              filter={filter}
              updateFilter={updateFilter}
            />
           </Stack>
          

        </Stack>

        </ThemeProvider>
            <div id='three-reset-btn' onClick={resetFilter}>Reset</div>  
 
        </React.Fragment>
    )
}

export default Filter




//FOR EACH THEME
const IndeterminateCheckbox = ({theme, updateFilter, checkState, setCheckState})=>{

  // const [checked, setChecked] = useState(()=> theme.value.map(()=> true));

  const [checked, setChecked] = useState(checkState);

  useEffect(()=>{

    setCheckState(checked)

  }, [checked])

  const handleChildren = (event) =>{
  
    return function(idx){
      let prev = checked;
      prev[idx] = event.target.checked;
      setChecked(()=> checked.map((v, i) =>{ return i === idx? event.target.checked : v} ))
      
      //update filter
      if (!event.target.checked){
        updateFilter("theme_false", theme.value[idx])
      }else{
        updateFilter("theme_true", theme.value[idx])
      }

    }
  }

  const handleParent = (event)=> {
    setChecked( ()=>theme.value.map(()=> event.target.checked))

    //update filter-> inform all children
    if (!event.target.checked){
      theme.value.forEach((t)=>{
        updateFilter("theme_false", t)
      })
     
    }else{
      theme.value.forEach((t)=>{
        updateFilter("theme_true", t)
      })
    }
  
  }

  const children = (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>

      {theme.value.map(
        (val, idx) => 
        <FormControlLabel
        onChange={(event)=>{ handleChildren(event)(idx)} } 
        label= {val}
        control={<Checkbox checked={checked[idx]}/>}
        />
      )}
    </Box>
  );

  const ifAllChecked = ()=>{
    //true: all children checked
    return !checked.includes(false);  
  }

  return(
    <React.Fragment>
      <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
      <FormControlLabel
        label={`${theme.label}`}
        control={
          <Checkbox
            checked={ifAllChecked()}
            indeterminate={!ifAllChecked()}
            onChange={handleParent}
          />
        }
      />
      {children}
      </Box>
    </React.Fragment>
  )

}


////////Select Menue, form approach
const ThemeMultiSelect = ({filter, updateFilter})=>{
  const [selected, setSelected] = useState([options_theme])

  const [themeChecked, setThemeChecked] = useState(
    options_theme.map((theme) => {
      return theme.value.map((t) => true)
    })
  )

  const setCheckState = (idx) =>{
    return function(value){
      setThemeChecked((prev)=>
        prev.map((p, i)=>{
          return i===idx? value : p
        })
      )
    }
  }

  const handleChange = (event) => {
    const value_group = event.target.value;
    //TO DO: Display color tag
  };

  //reset
  useEffect(()=>{

    setThemeChecked(    
      options_theme.map((theme) => {
      return theme.value.map((t) => true)
    }))

  }, [filter["reset"]])

  return(
    <React.Fragment>
 
      <FormControl sx={{ display: 'flex', flexDirection: 'column' }}>
      {/* <InputLabel id="theme-multiple-checkbox-label">Select theme</InputLabel>
       */}
      <Select
          labelId="theme-multiple-checkbox-label"
          label="Label"

          id="demo-multiple-checkbox"
          multiple
          value={selected}
          onChange={handleChange}  
          input={<OutlinedInput  />}  
          renderValue={(selected) => "Themes"}
          MenuProps={MenuProps}

 
        >
        {options_theme.map((theme, idx) => (
            <MenuItem key={idx+theme} value={theme}>
            <IndeterminateCheckbox 
                    theme={theme}
                    updateFilter={updateFilter}
                    checkState={themeChecked[idx]}
                    setCheckState={setCheckState(idx)}
                    
            />
            </MenuItem>
          ))}



        </Select>
      
      </FormControl>
   
    </React.Fragment>
  )


}





const ITEM_HEIGHT = 100;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  },
  getContentAnchorEl: null,
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "center"
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "center"
  },
  variant: "menu"
};


