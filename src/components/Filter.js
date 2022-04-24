import React, {useEffect, useReducer, useState, useMemo} from 'react';

import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

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

const options_theme = [{ label: 'all', value: 'all' },
                        {label: '1', value:['detective','nypd','9/11','police','recovery','september 11, 2001']},
                        {label: '1', value:['woman','polish','association','she']},                 
                        {label: '1', value:['staten island','business','career','board','jazz','council','league']},
                        {label: '1', value:['baptist','pastor','church', 'america','rabbi']},
                        {label: '1', value:['911 heroes']},
                        {label: '1', value:['september 11, 2001', 'fdny','firefighter']},
                        {label: '1', value:['gun','marine','9/11', 'combat','violence','police','september 11, 2001']},
                        {label: '1', value:['district','attorney','health',' hiv ',' human rights','hiv/aids']},
                        {label: '1', value:['school',' art ','civic','children','museum','award']}]

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
    disableClearable
    disableCloseOnSelect
    getOptionLabel={(option) => option.label}
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


function Filter({filter, updateFilter, toggleCamera}){

  const resetFilter = ()=>{
    updateFilter("init")
    updateFilter("reset", true)
  }

    return(

        <div id='three-filter-wrapper'> 

            <button id='three-cam-btn' onClick={toggleCamera}>Select Camera</button>

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

        <button id='three-reset-btn' onClick={resetFilter}>Reset</button>  
        </div>
    )
}

export default Filter