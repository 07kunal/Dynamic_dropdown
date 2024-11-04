import React, { useEffect, useState } from 'react'
import { responseArray } from '../MockupData/MockupData';


const DynamicDropdown = ({ fetchOptions }) => {
  const [dropdownValues, setDropdownValues] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({
    key: ''
  });
  const [tableRows, setTableRows] = useState([]);

  // Initialize dropdown options
  useEffect(() => {
    if (responseArray[0]?.value) {
      // Set the initial options for the first dropdown
      const initialDropdownValues = responseArray.map((dropdown, index) => ({
        key: dropdown.key,
        options: index === 0 ? dropdown.value : [], // Only the first dropdown has initial options
      }));
      setDropdownValues(initialDropdownValues);
    }
  }, [responseArray]);

  // Function to handle dropdown selection changes
  const handleSelectChange = async (selectedValue, index) => {
    // console.log('selectedValue', selectedValue);
    // console.log('Index--', index);
    const currentDropdown = responseArray[index];
    // console.log('currentDropDown', currentDropdown);
    setSelectedOptions((prev) => ({   // creating a array of selected options with key value pairs and later pass them to create Table.
      ...prev,
      [currentDropdown.key]: selectedValue,
      key: selectedValue
    }));

    // Load options for the next dropdown based on the selected value of the current one
    if (index + 1 < responseArray.length) {
      const nextDropdown = responseArray[index + 1]; // taking next child dropdown from responseArray
      // console.log('nextDropDown', nextDropdown);
      const newOptions = await fetchOptions(selectedValue, nextDropdown.key);   // To fetch dropdrowns-options for child dropdown
      // console.log('newOptionsByFetching', newOptions);
      setDropdownValues((prevValues) => {
        // console.log('prevValuesDropdowns', prevValues);
        const updatedValues = [...prevValues];
        // console.log('updateValues',updatedValues);
        updatedValues[index+1] = { key: nextDropdown.key, options: newOptions }; // Setting child dropdownvalue
        // console.log('updateValues===',updatedValues[index+1]);
        let latestDropdownValue = updatedValues.slice(0, index + 2);
        return latestDropdownValue; // Keep only options up to the current level
      });
    }
  };

  // Function to add selected options as a new row in the table
  const handleAddRow = () => {
    const newRow = responseArray.map((item) => selectedOptions[item.key] || '');
    // console.log('newRow==', newRow);
    let duplicate = tableRows.some((item) => item[item.length - 1] === newRow[newRow.length - 1]);
    if (duplicate) {
      // console.log('duplicate');
    } else {
      setTableRows([...tableRows, newRow]);
    }
  };
console.log('dropdown,',dropdownValues);
  console.log('selectedOptions',selectedOptions);
  return (
    <div>
      {/* Dynamic Dropdowns */}
      <div className="dropdowns">
        {responseArray.map((dropdown, index) => (
          <div key={dropdown.key} style={{ marginBottom: '10px' }}>
            <label>{dropdown.name}:</label>
            <select
              onChange={(e) => handleSelectChange(e.target.value, index)}
              value={selectedOptions[dropdown.key] || ''}  // yha pr expression pass kra h to get object value
              disabled={index > 0 && !selectedOptions[responseArray[index - 1].key]} // Disable if no value is selected in the parent dropdown
            >
              <option value="">Select {dropdown.name}</option>
              {dropdownValues[index]?.options.map((option, idx) => (
                <option key={idx} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <button onClick={handleAddRow}>Add to Table</button>

      {/* Dynamic Table */}
      {
        tableRows.length > 0 && (
          <table border="1" style={{ marginTop: '20px' }}>
            <thead>
              <tr>
                {responseArray.map((dropdown) => (
                  <th key={dropdown.key}>{dropdown.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )
      }
    </div>
  );
};

export default DynamicDropdown