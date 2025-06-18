import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'

// This is the main configuration function for Vite.
// It returns an object with the configuration options.
export default defineConfig({
  // Plugins are functions that are run during the build process.
  // They can modify the build output, add new functionality, etc.
  // Here we're using the `react` plugin, which is a plugin that
  // enables support for React in Vite.
  plugins: [react(), tailwindcss()],
})

// In short, this configuration tells Vite to use the React plugin.
// The React plugin is responsible for transpiling React code, so
// if you have a React project, you'll need to include this plugin
// in your Vite configuration.
