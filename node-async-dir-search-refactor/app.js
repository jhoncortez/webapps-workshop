const fs = require('node:fs/promises')
const path = require('node:path')

const folder = process.argv[2] || '.' //
// Default to current directory if no argument is provided
// Check if the folder exists
async function processDirectory (folder) {
  try {
    const stats = await fs.stat(folder)
    if (!stats.isDirectory()) {
      throw new Error(`${folder} is not a directory`)
    }

    const files = await fs.readdir(folder, { withFileTypes: true })

    const fileDetails = await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(folder, file.name)
        const fileStats = await fs.stat(filePath)
        return {
          name: file.name,
          isDirectory: file.isDirectory(),
          size: fileStats.size,
          createdAt: fileStats.birthtime
        }
      })
    )

    fileDetails.forEach((file) => {
      if (file.isDirectory) {
        console.log(`Directory: ${file.name}`)
      } else {
        console.log(`File: ${file.name}, Size: ${file.size} bytes, Created At: ${file.createdAt}`)
      }
    })
  } catch (err) {
    console.error('Error processing directory:', err)
    process.exit(1)
  }
}

processDirectory(folder)
