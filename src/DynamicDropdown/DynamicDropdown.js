import React, { useState } from 'react'
import { responseArray } from '../MockupData/MockupData';


const DynamicDropdown = () => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [tableData, setTableData] = useState([]);

  // Placeholder data for dynamic dependencies
  const dependencyData = {
    country: {
      USA: ['California', 'Texas'],
      Canada: ['Ontario', 'Quebec']
    },
    state: {
      California: ['Los Angeles', 'San Francisco'],
      Texas: ['Austin', 'Houston'],
      Ontario: ['Toronto', 'Ottawa'],
      Quebec: ['Montreal', 'Quebec City']
    }
  };

  // Handle dropdown selection changes
  const handleSelectChange = (key, value) => {
    setSelectedOptions((prevOptions) => {
      const newOptions = { ...prevOptions, [key]: value };

      // Reset dependent dropdowns if the parent dropdown changes
      const currentIndex = responseArray.findIndex(item => item.key === key);
      for (let i = currentIndex + 1; i < responseArray.length; i++) {
        newOptions[responseArray[i].key] = '';
      }
      return newOptions;
    });
  };

  // Add current selections to the table
  const addToTable = () => {
    setTableData((prevData) => [...prevData, selectedOptions]);
    setSelectedOptions({});
  };

  // Helper function to get dropdown options based on dependencies
  const getOptions = (item, index) => {
    if (index === 0) {
      return item.value; // Use value from the first object
    }
    const parentKey = responseArray[index - 1].key;
    const parentValue = selectedOptions[parentKey];
    return dependencyData[parentKey]?.[parentValue] || [];
  };

  return (
    <div>
      {/* Render dropdowns dynamically */}
      {responseArray.map((item, index) => (
        <div key={item.key}>
          <label>{item.name}:</label>
          <select
            value={selectedOptions[item.key] || ''}
            onChange={(e) => handleSelectChange(item.key, e.target.value)}
            disabled={index > 0 && !selectedOptions[responseArray[index - 1].key]}
          >
            <option value="">Select {item.name}</option>
            {getOptions(item, index).map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      ))}

      <button onClick={addToTable} disabled={!Object.keys(selectedOptions).length}>Add to Table</button>

      {/* Render table with selected options */}
   {tableData.length > 0 && (
       <table border="1">
       <thead>
         <tr>
           {responseArray.map(item => (
             <th key={item.key}>{item.name}</th>
           ))}
         </tr>
       </thead>
       <tbody>
         {tableData.map((rowData, rowIndex) => (
           <tr key={rowIndex}>
             {responseArray.map(item => (
               <td key={item.key}>{rowData[item.key]}</td>
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