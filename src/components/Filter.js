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

import { filterData, getPureFilter, options_theme } from '../utils/helper';
import data from "../data/mydata.json"

const theme = createTheme( ThemeOptions );

const options_year = [ { label: 'all', value: 'all' },
                      { label: '2002', value: "2002" },
                      { label: '2003', value: "2003" },
                      { label: '2004', value: "2004" },
                      { label: '2005', value: "2005" },
                      { label: '2006', value: "2006" },
                      { label: '2007', value: "2007" },
                      { label: '2008', value: "2008" },
                      { label: '2009', value: "2009" },
                      { label: '2010', value: "2010" },
                      { label: '2011', value: "2011" },
                      { label: '2012', value: "2012" },
                      { label: '2013', value: "2013" },
                      { label: '2014', value: "2014" },
                      { label: '2015', value: "2015" },
                      { label: '2016', value: "2016" },
                      { label: '2017', value: "2017" },
                      { label: '2018', value: "2018" },
                      { label: '2019', value: "2019" },
                      { label: '2020', value: "2020" },
                      { label: '2021', value: "2021" },
                      { label: '2022', value: "2022" },
                 
                  ];
              
const options_borough= [
                    { label: 'all', value: 'all' },
                    { label: 'Manhattan', value: "Manhattan" },
                    { label: 'Queens', value: "Queens" },
                    { label: 'Brooklyn', value: "Brooklyn" },
                    { label: 'Bronx', value: 'Bronx' },
                    { label: 'Staten Island', value: 'Staten Island' },
         
                ];

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

    if (filter["reset"]){
      setSelected([options[0]])
    }

  }, [filterMemo])

  
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
    updateFilter("init")
    updateFilter("reset", true)
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

            <SearchField 
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
        label={`Group ${theme.label}`}
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



const SearchField = ({filter, updateFilter})=>{
  const filterMemo = useMemo(()=> (filter), [getPureFilter(filter)])

  let data_filtered = filterData(data, filter)
  const [search, setSearch] = useState("");

  useEffect(()=>{

    if(!filter["reset"]){
      updateFilter("search", search)
    }

  }, [search])

  //handle filter reset
  useEffect(()=>{

    if (filter["reset"]){
      setSearch("")
      updateFilter("reset", false)
    }


  }, [filterMemo])

  return(  
  <Autocomplete
    freeSolo
    id="free-solo-2-demo"
    // options={data_filtered.map((d) => d.coname).concat(data_filtered.map((d) => d.location))}

    options={data_filtered.map((d) => d.coname)}
    renderInput={(params, option) => (
      <TextField
        key={option}
        {...params}
        label="Search co-names"
        InputProps={{
          ...params.InputProps,
          type: 'search',
        }}
      />
    )}
    value={search}
    onChange= {(event, value, reason)=>{

      if (value === null){
        setSearch("")
      }else{
        setSearch(value);
      }
    }}
  />
  
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


