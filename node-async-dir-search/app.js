const fs = require('node:fs')

fs.readdir('.', { withFileTypes: true }, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err)
    return
  }

  files.forEach((file) => {
    if (file.isDirectory()) {
      console.log(`Directory: ${file.name}`)
    } else {
      console.log(`File: ${file.name}`)
    }
  })
})
