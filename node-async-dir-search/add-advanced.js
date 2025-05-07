const fs = require('node:fs/promises')

const folder = process.argv[2] || '.' //
// Default to current directory if no argument is provided
// Check if the folder exists
fs.stat(folder)
  .then((stats) => {
    if (!stats.isDirectory()) {
      throw new Error(`${folder} is not a directory`)
    }
  })
  .catch((err) => {
    console.error('Error checking directory:', err)
    process.exit(1)
  })

// Read the directory contents
fs.readdir(folder, { withFileTypes: true })
  .then((files) => {
    files.forEach((file) => {
      if (file.isDirectory()) {
        console.log(`Directory: ${file.name}`)
      } else {
        console.log(`File: ${file.name}`)
      }
    })
  })
  .catch((err) => {
    console.error('Error reading directory:', err)
    process.exit(1)
  })
