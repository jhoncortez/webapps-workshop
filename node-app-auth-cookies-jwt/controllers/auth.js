const getUser = (req, res) => {
  res.send('<h1>Hello User</h1>')
}
const loginUser = (req, res) => {
  res.json({ user: 'jon going to be logeged in' })
}

const createUser = (req, res) => {
  res.json({ user: 'jon is going to be created' })
}

const logoutUser = (req, res) => {
  res.json({ user: 'jon is going to be loggedout' })
}

const protectedAuth = (req, res) => {
  res.send('<h1>protected</h1>')
}

export { loginUser, createUser, getUser, logoutUser, protectedAuth }
