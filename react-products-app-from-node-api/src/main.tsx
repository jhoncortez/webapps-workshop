/**
 * Entry point of the React application.
 * 
 * This file is responsible for rendering the root React component (`App`) 
 * into the DOM. It uses React's `StrictMode` to highlight potential problems 
 * in the application during development.
 * 
 * - Imports:
 *   - `StrictMode`: A tool for identifying issues in the application.
 *   - `createRoot`: A method from React DOM for creating a root to render the app.
 *   - `App`: The main application component.
 * 
 * - Functionality:
 *   - Retrieves the DOM element with the ID `root`.
 *   - Creates a React root using `createRoot`.
 *   - Renders the `App` component wrapped in `StrictMode` into the root element.
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GlobalProvider } from './contexts/GlobalContext.tsx'
import { Provider } from 'react-redux'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { NavigationProvider } from './contexts/NavigationContext.tsx'
import Navbar from './components/Navbar.tsx'
import Footer from './components/Footer.tsx'

import store, { persistor }  from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'

import App from './components/App.tsx'

import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor} >
          <AuthProvider>
            <NavigationProvider>

              <Navbar />
              <App />
              <Footer />

            </NavigationProvider>
            
          </AuthProvider>
        </PersistGate>
      </Provider>
    </GlobalProvider>
  </StrictMode>,
)
