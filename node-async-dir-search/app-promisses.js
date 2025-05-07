const fs = require('node:fs/promises')

fs.readdir('.', { withFileTypes: true })
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
  })
