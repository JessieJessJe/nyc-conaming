import React, {useEffect, useReducer, useState, useMemo} from 'react';

import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';

import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from '@mui/material/OutlinedInput';

import { filterData, getPureFilter } from '../utils/helper';
import data from "../data/mydata.json"

const termlist = [['detective','nypd','9/11','police','recovery','september 11, 2001'],
                    ['woman','polish','association','she'],                 
                    ['staten island','business','career','board','jazz','council','league'],
                    ['baptist','pastor','church', 'america','rabbi'],
                    ['911 heroes'],
                    ['september 11, 2001', 'fdny','firefighter'],
                    ['gun','marine','9/11', 'combat','violence','police','september 11, 2001'],
                    ['district','attorney','health',' hiv ',' human rights','hiv/aids'],
                    ['school',' art ','civic','children','museum','award']]

const options_theme = [{ label: 'all', value: [''] },
                        {label: '0', value:['detective','nypd','9/11','police','recovery','september 11, 2001']},
                        {label: '1', value:['woman','polish','association','she']},                 
                        {label: '2', value:['staten island','business','career','board','jazz','council','league']},
                        {label: '3', value:['baptist','pastor','church', 'america','rabbi']},
                        {label: '4', value:['911 heroes']},
                        {label: '5', value:['september 11, 2001', 'fdny','firefighter']},
                        {label: '6', value:['gun','marine','9/11', 'combat','violence','police','september 11, 2001']},
                        {label: '7', value:['district','attorney','health',' hiv ',' human rights','hiv/aids']},
                        {label: '8', value:['school',' art ','civic','children','museum','award']},
                        {label: '-1', value: [''] },]

const options_year = [ { label: 'all', value: 'all' },
                      { label: '2002', value: "2002" },
                      { label: '2011', value: "2011" },
                      { label: '2021', value: "2021" },
                 
                  ];
              
const options_borough= [
                    { label: 'all', value: 'all' },
                    { label: 'Manhattan', value: "Manhattan" },
                    { label: 'Queens', value: "Queens" },
                    { label: 'Brooklyn', value: "Brooklyn" },
                    { label: 'Bronx', value: 'Bronx' },
                    { label: 'Staten Island', value: 'Staten Island' },
         
                ];

const options_angle=[
                  { label: 'map', value: 'map' },
                  { label: 'timeline', value: "timeline" },
                  { label: 'wordcloud', value: "wordcloud" },]

const MyCheckbox = ({ filter, updateFilter, category, options})=>{
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;  
  const filterMemo = useMemo(()=> (filter), [getPureFilter(filter)])

  const [selected, setSelected] = useState( [options[0]] );

  //TO DO: all vs others checkboxes 
  const handleSelected = (value) =>{
    
    // if (value[value.length-1].label === "all"){
    //   setSelected( [options[0] ])
    // }else{
    //   setSelected(value.filter(v => v.lable !== "all"))
    // }

    setSelected(value)
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
    style={{ width: 500 }}
    renderInput={(params) => (
      <TextField {...params} label={`Select ${category}`} placeholder= {category} />
    )}
  
    value={selected}
    onChange={ (event, value)=>{
      handleSelected( value)

    }}
    
  />
  )
}




function Filter({filter, updateFilter, toggleCamera}){

  const resetFilter = ()=>{
    updateFilter("init")
    updateFilter("reset", true)
  }

    return(

        <React.Fragment> 

            <button id='three-cam-btn' onClick={toggleCamera}>Select Camera</button>

           {/* < IndeterminateCheckbox theme={options_theme[1]} /> */}

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

            <AngleCheckbox         
            filter={filter}
            updateFilter={updateFilter}
            category="angle"
            options= {options_angle}
            />    

            <SearchField 
             filter={filter}
             updateFilter={updateFilter}
            />

        <button id='three-reset-btn' onClick={resetFilter}>Reset</button>  
        </React.Fragment>
    )
}

export default Filter


const ThemeCheckbox = ({filter, updateFilter}) => {

  const [selected, setSelected] = useState([])
  return(
    <Autocomplete
    multiple
    id="checkboxes-tags-demo"
    options={options_theme} 

    getOptionLabel={(option) => option.label}
    renderOption={(props, option, { selected }) => {
      
      return(
        <li>
        < IndeterminateCheckbox 
            theme={option}
            updateFilter={updateFilter}
            copyClick={selected}
             />
        </li>
      )
    } }
    style={{ width: 500 }}
    renderInput={(params) => (
      <TextField {...params} label={`Select theme`} placeholder="theme" />
    )}
  
    // value={selected}
    onChange={ (event, value)=>{
      // handleSelected( value)
      console.log(event, value, 'theme check')

    }}
    
  />
  )
}


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
      <FormControl sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
      <InputLabel id="demo-multiple-checkbox-label">Select theme</InputLabel>
      <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selected}
          onChange={handleChange}  
          input={<OutlinedInput label="Tag" />}  
          renderValue={(selected) => {}}
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
    options={data_filtered.map((d) => d.coname).concat(data_filtered.map((d) => d.location))}
    renderInput={(params) => (
      <TextField
        {...params}
        label="Search locations"
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


const AngleCheckbox = ({ filter, updateFilter, category, options})=>{
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;  
  const filterMemo = useMemo(()=> (filter), [getPureFilter(filter)])

  const [selected, setSelected] = useState( options[0] );

  //TO DO: all vs others checkboxes 
  const handleSelected = (value) =>{

    setSelected(value)
  }

  useEffect(()=>{
    console.log(selected)
      updateFilter(category, selected)
    
  }, [selected])

  //handle filter reset
  useEffect(()=>{

    if (filter["reset"]){
      setSelected(options[0])
    }

  }, [filterMemo])

  
  return(
    <Autocomplete
    // multiple
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
    style={{ width: 500 }}
    renderInput={(params) => (
      <TextField {...params} label={`Select ${category}`} placeholder= {category} />
    )}
  
    value={selected}
    onChange={ (event, value)=>{
      handleSelected( value)

    }}
    
  />
  )
}