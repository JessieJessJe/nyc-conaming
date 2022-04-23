import React, {useEffect, useReducer, useState} from 'react';

import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const termlist = [['detective','nypd','9/11','police','recovery','september 11, 2001'],
                    ['woman','polish','association','she'],                 
                    ['staten island','business','career','board','jazz','council','league'],
                    ['baptist','pastor','church', 'america','rabbi'],
                    ['911 heroes'],
                    ['september 11, 2001', 'fdny','firefighter'],
                    ['gun','marine','9/11', 'combat','violence','police','september 11, 2001'],
                    ['district','attorney','health',' hiv ',' human rights','hiv/aids'],
                    ['school',' art ','civic','children','museum','award']]

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

const Dropdown = ({ label, value, options, onChange }) => {
    return (
      <label>
        {label}
        <select value={value} onChange={onChange}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </label>
    );
  };

const MyCheckbox = ({filter, updateFilter, category, options})=>{
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;  


  const [selected, setSelected] = useState( [options[0]]);


  useEffect(()=>{

    updateFilter(category, selected.map(d => d.value))
    console.log(filter, 'update global filter')

  }, [selected])

  
  return(
    <Autocomplete
    multiple
    id="checkboxes-tags-demo"
    options={options}
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
      setSelected(value)

    }}
    
  />
  )
}

function Filter({filter, updateFilter, toggleCamera}){


    return(

        <div id='three-filter-wrapper'> 

            <button id='three-cam-btn' onClick={toggleCamera}>Select Camera</button>
            {/* <div>
                    <Dropdown
                    key="dropdown_year"
                    label="Select Year"
                    options={options_year}
                    value={year}
                    onChange={handleYear}
                    />
            </div>

            <div>
                    <Dropdown
                    key="dropdown_borough"
                    label="Select Borough"
                    options={options_borough}
                    value={borough}
                    onChange={handleBorough}
                    />
            </div> */}

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

        </div>
    )
}

export default Filter