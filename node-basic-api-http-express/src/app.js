const { server } = require('./request.js')
// Define the port
const desirePort = process.env.PORT || 3001

// Start the server
server.listen(desirePort, () => {
  console.log(`Server is running on http://localhost:${desirePort}`)
})
