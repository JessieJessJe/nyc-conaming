import React, { useState, useEffect, useContext, useRef, lazy, Suspense } from 'react';

const termlist = [['detective','nypd','9/11','police','recovery','september 11, 2001'],
                    ['woman','polish','association','she'],                 
                    ['staten island','business','career','board','jazz','council','league'],
                    ['baptist','pastor','church', 'america','rabbi'],
                    ['911 heroes'],
                    ['september 11, 2001', 'fdny','firefighter'],
                    ['gun','marine','9/11', 'combat','violence','police','september 11, 2001'],
                    ['district','attorney','health',' hiv ',' human rights','hiv/aids'],
                    ['school',' art ','civic','children','museum','award']]

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

function Filter({year, handleYear, camera, toggleCamera, borough, handleBorough}){

    const options_year = [
        { label: '2002', value: "2002" },
        { label: '2011', value: "2011" },
        { label: '2021', value: "2021" },
        { label: 'all', value: 'all' },
    ];

    const options_borough= [
      { label: 'Manhattan', value: "Manhattan" },
      { label: 'Queens', value: "Queens" },
      { label: 'Brooklyn', value: "Brooklyn" },
      { label: 'Bronx', value: 'Bronx' },
      { label: 'Staten Island', value: 'Staten Island' },
      { label: 'all', value: 'all' },
  ];

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

        </div>
    )
}

export default Filter