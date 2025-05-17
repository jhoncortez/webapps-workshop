import express from 'express'
// const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))
import fetch from 'node-fetch' // Importing node-fetch for making HTTP requests

const app = express()

app.get('/proxy', async (req: express.Request, res: express.Response) => {
  const imageUrl = req.query.url // Get the URL from the query parameter

  if (!imageUrl) {
    return res.status(400).send('Missing "url" query parameter')
  }

  try {
    const response = await fetch(imageUrl)

    if (!response.ok) {
      return res.status(response.status).send(`Error fetching image: ${response.statusText}`)
    }

    const contentType = response.headers.get('content-type')
    res.set('Content-Type', contentType) // Set the correct content type
    // res.set('Access-Control-Allow-Origin', '*') // Allow CORS for all origins
    // res.set('Access-Control-Allow-Methods', 'GET') // Allow only GET method
    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    res.send(buffer) // Send the image data back to the client
  } catch (error) {
    console.error('Error in proxy server:', error)
    res.status(500).send('Internal Server Error')
  }
})

app.listen(3000, () => {
  console.log('Proxy server running on http://localhost:3000')
})
