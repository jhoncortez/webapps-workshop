import { useState, useCallback, useMemo } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { useTableData } from './context/tableData';
import './App.css';
import { indexOf } from 'lodash-es'; // Using lodash-es for indexOf function
import type {  ApiResponse } from './vite-env'; // Importing types for User and ApiResponse

function App() {

  const initialColor= useMemo(() => ({
    evenRowColor: '#ffffff', // Default color for even rows
    oddRowColor: '#ffffff', // Default color for odd rows
  }), []);

  const {veryInitialData, setInitialTableData, filteredData, setSearchTerm} = useTableData();
  const [color, setColor] = useState(initialColor);
  const [direction, setDirection] = useState('asc'); // State for sorting direction, not used in this example

  console.log('initialTableData:', filteredData);
  // const [veryInitialData, setVeryInitialData] = useState<ApiResponse>(initialTableData); // State to hold the very initial data  

  const sortData = useCallback( (data: ApiResponse['results'], column: string) => { 
    const sortedData = data?.sort((a, b) => {
      // if ( direction === 'desc') {
        // If direction is descending, reverse the comparison
        if (indexOf(['name', 'email', 'location'], column) !== -1) { 
          // For string columns, compare alphabetically
          if (column === 'name') {
            const aName = `${a.name.first} ${a.name.last}`.toLowerCase();
            const bName = `${b.name.first} ${b.name.last}`.toLowerCase();
            return direction === 'desc' ? bName.localeCompare(aName) : aName.localeCompare(bName); // Compare names alphabetically
          } else if (column === 'email') {
            return direction === 'desc' ? b.email.toLowerCase().localeCompare(a.email.toLowerCase()) : a.email.toLowerCase().localeCompare(b.email.toLowerCase()); // Compare emails alphabetically
          } else if (column === 'location') {
            const aLocation = `${a.location.city}, ${a.location.country}`.toLowerCase();            
            const bLocation = `${b.location.city}, ${b.location.country}`.toLowerCase();
            return direction === 'desc' ? bLocation.localeCompare(aLocation) : aLocation.localeCompare(bLocation); // Compare locations alphabetically
          }
        }

      return 0;
    });
    return sortedData
  }, [direction]);
  

  const handleRestoreInitialState = useCallback(() => {
    console.log('Restoring initial state', veryInitialData.current);
    setInitialTableData({ results: veryInitialData.current.results })
    // setColor(initialColor); // Reset row colors to initial state
    // setDirection('asc'); // Reset sorting direction to ascending
  }, [setInitialTableData]);


  const handleColoringRows = useCallback( ()=> {
    // Implement rows coloring logic here
    // filteredData.map((row, index) => {
    //   if (index % 2 === 0) {
    //     // Apply a specific style for even rows
    //     console.log(`Row ${index} is even:`, row);
    //   }
    //   else {
    //     // Apply a different style for odd rows
    //     console.log(`Row ${index} is odd:`, row);
    //   }
    // });
    let evenRowColor = '#f0f0f0'; // Example color for even rows
    let oddRowColor = '#ffffff'; // Example color for odd rows
    // for (let index = 0; index < filteredData.length ; index++) {
    //   // const row = filteredData[index];
    //   // let rowColor = index % 2 === 0 ? '#f0f0f0' : '#ffffff'; // Example colors for even and odd rows
    //   // setColor({
    //   //   evenRowColor: index % 2 === 0 ? rowColor : '#f0f0f0',
    //   //   oddRowColor: index % 2 !== 0 ? rowColor : '#ffffff',
    //   // });
    //   if (index % 2 === 0) {
    //     // Apply a specific style for even rows
    //     // console.log(`Row ${index} is even:`, filteredData[index]);
    //     evenRowColor = '#f0f0f0';

    //   }
    //   else {
    //     // Apply a different style for odd rows
    //     // console.log(`Row ${index} is odd:`, filteredData[index]);
    //     oddRowColor = '#ffffff'
    //   }
      
    // }

    if (color.evenRowColor === evenRowColor && color.oddRowColor === oddRowColor) {
      setColor({
        evenRowColor: initialColor.evenRowColor,
        oddRowColor: initialColor.oddRowColor,
      });
      return; // If colors are already set, no need to update
    }

    setColor({
      evenRowColor: evenRowColor,
      oddRowColor: oddRowColor,
    });

  }, [color]);



  const handleSorting = useCallback((column: string) => {
    console.log(`Sorting by ${column}`);

    setDirection(direction === 'asc' ? 'desc' : 'asc'); // Toggle sorting direction

    setInitialTableData((prevData: ApiResponse) => {
      const sortedData = sortData(prevData.results, column);
      return { results: sortedData }; // Update the table data with sorted results
    });

  }, [filteredData, setInitialTableData]);

  const handleRemoveRow = useCallback( (id: any) => {
    // Implement row removal logic here
    // console.log(`Removing row at index ${index}`);
    // const updatedData = [...filteredData].filter((item, i) => item.login.uuid !== id);
    setInitialTableData((prevData: ApiResponse) => {
      const updatedData = prevData.results?.filter(item => item.login.uuid !== id);
      return { results: updatedData };
    });
    // localStorage.setItem('tableData', JSON.stringify({ results: updatedData }));
  }, [filteredData, setInitialTableData]);

  // handleSearch function to filter data based on search input
  // const handleSearchByLocation = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
  //   const searchTerm = event.target.value.toLowerCase();


    
    
  // }, [filteredData, setInitialTableData]);  
// import { sortedData } from './utils/sortedData'; // Importing the sorting utility function
  
  return (
    <>
      
      {/* <Table /> */}
      {/* The Table component will be implemented to display the fetched data */}
      {/* You can add more components or features as needed */}
      <header>
        <button onClick={handleColoringRows}>Color Rows</button>
        <button onClick={() => handleSorting('location')}>Sort by Location</button>
        <button onClick={handleRestoreInitialState}>Restore Initial State</button>
        <input type="text" placeholder="Search..." onChange={(e) => setSearchTerm(e.target.value)} />
      </header>
      <div>
      <h1> React Table </h1>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSorting('name')}>Name</th>
            <th onClick={() => handleSorting('email')}>Email</th>
            <th>Location</th>
            <th>Picture</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, index) => (
            <tr key={row.login.uuid} style={{ backgroundColor: index % 2 === 0 ? color.evenRowColor : color.oddRowColor }}>
              <td>{row.name.first} {row.name.last}</td>
              <td>{row.email}</td>
              <td>{row.location.city}, {row.location.country}</td>
              <td><img src={row.picture.thumbnail} alt="User Thumbnail" /></td>
              <td>
                <button onClick={() => handleRemoveRow(row.login.uuid)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>
      <footer>
        <p>React Table Example</p>  
      </footer>

    </>
  )
}

export default App
