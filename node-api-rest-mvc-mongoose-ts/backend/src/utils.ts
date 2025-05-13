import { createRequire } from 'node:module' // This code imports the createRequire function from the module module, which is used to create a require function for importing CommonJS modules in ES modules.
import fs from 'node:fs' // This code imports the fs module, which provides an API for interacting with the file system in Node.js.
import path from 'node:path' // This code imports the path module, which provides utilities for working with file and directory paths in Node.js.
import { fileURLToPath } from 'node:url'

// Resolve __dirname in ESModules
const __filename = fileURLToPath(import.meta.url) // This code gets the current file's URL and converts it to a file path.
const __dirname = path.dirname(__filename) // This code gets the directory name of the current file's path.

// creating a require function to import the json file
const require = createRequire(import.meta.url) // This code creates a require function to import the JSON file using ES modules

// create a readJSON function to read the json file
export const readJSON = (filePath) => require(filePath)
// This code defines a function called readJSON that takes a file path as an argument and uses the require function to read the JSON file at that path.
// The function returns the parsed JSON data.

export const writeJSON = (filePath, data) => {
  const absolutePath = path.resolve(__dirname, filePath)
  fs.writeFileSync(absolutePath, JSON.stringify(data, null, 2), 'utf-8')
}
// This code defines a function called writeJSON that takes a file path and data as arguments.
