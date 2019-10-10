let express    = require('express')
let bodyParser = require('body-parser')
let fs         = require('fs')
let jwt        = require('jsonwebtoken')
let morgan     = require('morgan')

const server     = express()
const userdb     = JSON.parse(fs.readFileSync('./users.json', 'UTF-8'))
const AUDIENCE   = process.env.SME_JWT_AUDIENCE
const ISSUER     = process.env.SME_JWT_ISSUER
const SECRET_KEY = process.env.DEVISE_JWT_SECRET_KEY
const tokenList  = {}

server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())
server.use(morgan('dev'))


// Create a token from a payload
function createToken (payload, expiresIn = '1h') {
  return jwt.sign(
    payload, SECRET_KEY, {expiresIn: expiresIn, audience: AUDIENCE, issuer: ISSUER}
  )
}

function createRefreshToken (payload) {
  return createToken(payload, '24h')
}

function getUser ({username, password}) {
  var index = userdb.users.findIndex(user => user.name == username && user.password === password)

  if (index === -1)
    return false

  return userdb.users[index]
}

server.post('/api/Auth/LoginIdentity', (req, res) => {
  const {username, password} = req.body

  if ((user = getUser({username, password}))) {
    const response = {
      username: username,
      name:     username,
      email:    user.email,
      sgpToken: {
        status:       "Logged in",
        token:        createToken({username}),
        refreshToken: createRefreshToken({username})
      }
    }

    tokenList[response.sgpToken.refreshToken] = response

    return res.status(200).json(response)
  }

  return res.status(401).json({status: 401, message: 'Incorrect username or password'});
})

server.post('/api/Auth/RefreshLoginJWT', (req, res) => {
  if (!req.body.refreshToken || !req.body.username || !(req.body.refreshToken in tokenList))
    return res.status(404).json({status: 404, message: 'Invalid request'})

  const {refreshToken, username} = req.body

  tokenList[refreshToken].sgpToken.token = createToken({username})

  return res.status(200).json(tokenList[refreshToken])
})

server.listen(8082, () => {
  console.log('Run Auth API Server')
})
