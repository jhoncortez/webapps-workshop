import {useContext, createContext, useState, type ReactNode, useMemo, useEffect, useRef} from 'react'
import { type TableDataContextType, type ApiResponse } from '../vite-env.d';

export const TableDataContext = createContext<TableDataContextType>({} as TableDataContextType);

export const TableDataProvider = ({children}: {children: ReactNode}) => {
  const [initialTableData, setInitialTableData] = useState<ApiResponse>({results: []}); // State to hold the initial table data
  const veryInitialData = useRef<ApiResponse>({results: []}); // Using useRef to store the very initial data
  const [searchTerm, setSearchTerm] = useState<string>(''); // State for search term
  //   const [initialData, setInitialData] = useState<any[]>([]);
    
  
  const filteredData = useMemo(() => {
    // console.log('initialTableData:', initialTableData);
    if (initialTableData.results?.length === 0) {
      return [];
    }
    return initialTableData.results ? [...initialTableData.results].filter((item) => {
      // Assuming each item has a 'country' property
      // Adjust the filtering logic based on your data structure
      if (!searchTerm) {
        return true; // If no search term, return all items 
      }
      const filtered = item.location && item.location.country.toLowerCase().includes(searchTerm.toLowerCase());
      return filtered; // Ensure location and country exist
    }) : [];  
  }, [initialTableData, searchTerm]);


  useEffect(() => {
    // Fetch initial data from an API or other source
    // get data from localstorage if available
    // delete localStorage tableData;
    const storedData = localStorage.getItem('tableData');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        veryInitialData.current = parsedData; // Store the very initial data in useRef
        setInitialTableData(parsedData);
      } catch (error) {
        console.error('Error parsing stored data:', error);
      }
    } else {
      // If no data in localStorage, fetch from API
      fetchData();
    }
    async function fetchData() {
          try {
              const response = await fetch('https://randomuser.me/api/?results=100&inc=name,email,location,picture, login');
              
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              // Assuming the API returns an array of user objects
              // Adjust the data structure based on your API response
              // For example, if the API returns an object with a 'results' property:
              // const data = await response.json();
              // setTableData(data.results);
              const data = await response.json();
              // Store the fetched data in localStorage
              localStorage.setItem('tableData', JSON.stringify(data))
            //   console.log('veryInitialData useEffect:', veryInitialData);
              veryInitialData.current = data;
              setInitialTableData(data);
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      }
  }, [])

  return (
    <TableDataContext.Provider value={{veryInitialData, setInitialTableData, filteredData , searchTerm, setSearchTerm}}>
      {children}
    </TableDataContext.Provider>
  );
}

export const useTableData = () => {
  const context = useContext(TableDataContext);
  if (!context) {
    throw new Error('useTableData must be used within a TableDataProvider');
  }
  return context;

} 