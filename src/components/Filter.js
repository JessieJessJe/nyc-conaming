import React, {useReducer, useState} from 'react';

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
                    { label: 'Manhattan', value: "Manhattan" },
                    { label: 'Queens', value: "Queens" },
                    { label: 'Brooklyn', value: "Brooklyn" },
                    { label: 'Bronx', value: 'Bronx' },
                    { label: 'Staten Island', value: 'Staten Island' },
                    { label: 'all', value: 'all' },
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

const MyCheckbox = ()=>{
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;  


  const [selectedYear, setSelectedYear] = useState( [options_year[0]]);

  const handelYear = (value, reason)=>{
    console.log(reason,'s r')
    switch (reason){
      case "removeOption":
      
        setSelectedYear( selectedYear.filter(y => y.label !== value.lable))
        console.log(selectedYear, 'state')
        return selectedYear;
      case "selectOption":
        setSelectedYear( value )
        console.log(selectedYear, 'state')
        return selectedYear;
      default:
        break;
   
    }
    console.log(selectedYear, 'state')
  
  }

  // const [state, dispatch] = useReducer(reducer, initialState);


  // const reducer = (state, action)=>{
  //   switch (action.type) {
  //     case "selectOption":
  //       return { selectedOptions: action.payload.options };
  
  //     case "removeOption":
  //       return {
  //         selectedOptions: state.selectedOptions.filter(
  //           (option) => option.id !== action.payload.id
  //         )
  //       };
  //     default:
  //       throw new Error();
  //   }
  // }

      
    
  
  return(
    <Autocomplete
    multiple
    id="checkboxes-tags-demo"
    options={options_year}
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
      <TextField {...params} label="Select Years" placeholder="Years" />
    )}
  
    value={selectedYear}
    onChange={ (event, value, reason)=>{
      handelYear(value, reason)
      console.log(value, 'v')
      console.log(reason, 'reason')
    }}
    getOptionSelected={(option, value) => option.label === value.label}
  />
  )
}

function Filter({year, handleYear, camera, toggleCamera, borough, handleBorough}){


    return(

        <div id='three-filter-wrapper'> 

            <button id='three-cam-btn' onClick={toggleCamera}>Select Camera</button>
            <div>
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
            </div>

            <MyCheckbox />

        </div>
    )
}

export default Filter