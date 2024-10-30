import React, { useState } from 'react'
import { items, responseArray, subCategories } from '../MockupData/MockupData';


const DynamicDropdown = () => {
  const initialSelections = responseArray.reduce((acc, item) => ({ ...acc, [item.key]: '' }), {});
  const [selections, setSelections] = useState(initialSelections);
  const [tableData, setTableData] = useState([]);

  // Handle selection change for each dropdown
  const handleSelectionChange = (key, value) => {
    setSelections((prev) => ({
      ...prev,
      [key]: value,
      // Clear dependent dropdowns when parent changes
      ...responseArray.slice(responseArray.findIndex((item) => item.key === key) + 1).reduce((acc, item) => ({ ...acc, [item.key]: '' }), {}),
    }));
  };

  // Get options for a given dropdown key based on current selections
  const getOptions = (dropdown) => {
    if (dropdown.value) return dropdown.value; // First dropdown has a static value array

    const parentKey = responseArray[responseArray.findIndex((item) => item.key === dropdown.key) - 1]?.key;
    return dropdown.options[selections[parentKey]] || []; // Get options based on the selected parent dropdown value
  };

  // Add current selections to the table
  const addRowToTable = () => {
    setTableData([...tableData, selections]);
    setSelections(initialSelections); // Reset selections after adding
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        {responseArray.map((dropdown, index) => (
          <div key={dropdown.key} style={{ marginBottom: '10px' }}>
            <label>{dropdown.name}: </label>
            <select
              value={selections[dropdown.key] || ''}
              onChange={(e) => handleSelectionChange(dropdown.key, e.target.value)}
              disabled={index > 0 && !selections[responseArray[index - 1].key]}
            >
              <option value="" disabled>Select {dropdown.name}</option>
              {getOptions(dropdown).map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <button onClick={addRowToTable} disabled={Object.values(selections).some((value) => !value)}>
        Add to Table
      </button>

      {tableData.length > 0 && (
        <table border="1" cellPadding="10" style={{ marginTop: '20px', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {responseArray.map((header) => (
                <th key={header.key}>{header.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                {responseArray.map((header) => (
                  <td key={header.key}>{row[header.key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
  };

export default DynamicDropdown