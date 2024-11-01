import React from 'react';
import './App.css';
import DynamicDropdown from './DynamicDropdown/DynamicDropdown.js';

const fetchOptions = async (selectedValue, key) => {
  console.log('selectedValue',selectedValue);

  if (key === 'country') {
    return selectedValue === 'Asia' ? ['India', 'China'] : ['Germany', 'France'];
  } else if (key === 'city') {
    return selectedValue === 'India' ? ['Mumbai', 'Delhi'] : ['Berlin', 'Paris'];
  } else if (key === 'landmark') {
    return selectedValue === 'Mumbai' ? ['Chopati','Taj hotel'] : ( selectedValue === 'Delhi' ? [' piliya chowk', 'Tank rowd'] : ( selectedValue === 'Berlin' ? [' Test1', 'Test2'] : selectedValue === 'Paris' ? ['tower', 'donuts'] : []))
  }
  return [];
};
function App() {
  return (
    <div className="App">
      <DynamicDropdown fetchOptions={fetchOptions}/>
    </div>
  );
}

export default App;
