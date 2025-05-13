import express from 'express'

import { PORT } from './config.js'
import authEndpoint from './endpoints/auth.js'

const app = express()
app.disable('x-powered-by')

app.get('/', (req, res) => {
  res.send('Hello, World!')
})

app.use(express.json()) // Middleware to parse JSON bodies

app.use('/auth', authEndpoint)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
}
)
// Compare this snippet from node-app-auth-cookies-jwt/config.js:
