import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { TableDataProvider } from './context/tableData.tsx'

/*
  This is a simple React application that sets up the basic structure for a React Table.
  It imports necessary hooks and styles, and defines an App component that renders a header.
*/
// import { Table } from './components/Table'
// steps:
// 1. Create a new React app using Vite.
// 2. Install necessary dependencies for React Table.
// 3. Set up the basic structure of the app.
// 4. Create a Table component to display data.
// 5. fetch 100 rows of data from the JSONPlaceholder API and display it in a table format.
// 6. display the data in a table format using React Table.
// 7. provide the option to color rows based on a specific condition, allow sorting by country
// 8. enable the ability to delete rows from the table.
// 9. implement a feture that allows the user to restore the initial state of the table.
// 10. handle any potentnial errors that may occur during data fetching or table operations.
// 11. implement feature that allows the user to filter the data by country.
// 12. avoid sorting users again the data when the user is changing filter by country.
// 13. sort by click on the column header.

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TableDataProvider>
      <App />
    </TableDataProvider>
  </StrictMode>,
)
