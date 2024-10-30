import React, { useState } from 'react'
import { items, responseArray, subCategories } from '../MockupData/MockupData';


const DynamicDropdown = () => {
    const [selections, setSelections] = useState({ category: '', subCategory: '', item: '' });
    const [tableData, setTableData] = useState([]);
  
    // Handle selection change for each dropdown
    const handleSelectionChange = (key, value) => {
      setSelections((prev) => ({
        ...prev,
        [key]: value,
        // Clear dependent dropdowns when parent changes
        ...(key === "category" ? { subCategory: '', item: '' } : {}),
        ...(key === "subCategory" ? { item: '' } : {}),
      }));
    };
  
    // Get options based on current selection
    const getOptions = (key) => {
      if (key === "category") return responseArray[0].value;
      if (key === "subCategory") return subCategories[selections.category] || [];
      if (key === "item") return items[selections.subCategory] || [];
      return [];
    };
  
    // Add current selections to the table
    const addRowToTable = () => {
      setTableData([...tableData, selections]);
      setSelections({ category: '', subCategory: '', item: '' }); // Reset selections after adding
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
                {getOptions(dropdown.key).map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
        <button onClick={addRowToTable} disabled={!selections.category || !selections.subCategory || !selections.item}>
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