import React, { useState, useEffect, useContext, useRef, lazy, Suspense } from 'react';

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

function Filter({year, handleYear, camera, toggleCamera}){

    const options_year = [
        { label: '2002', value: "2002" },
        { label: '2011', value: "2011" },
        { label: '2021', value: "2021" },
        { label: 'all', value: 'all' },
    ];

    return(

        <div id='three-filter-wrapper'> 

            <button id='three-cam-btn' onClick={toggleCamera}>Select Camera</button>
            <div>
                    <Dropdown
                    key="dropdown"
                    label="Select Year"
                    options={options_year}
                    value={year}
                    onChange={handleYear}
                    />
            </div>

        </div>
    )
}

export default Filter