const JWT = require('jsonwebtoken')
const { JWT_KEY } = require('../configs')
const jwtdecode = require("jwt-decode");

module.exports = {
  authentication: (request, response, next) => { 
    
    const headerToken = request.headers['authorization'].split(' ')[1]
    const userId = request.headers['user-id']
    if (headerToken === undefined) {
      response.json({ message: 'Please provide Token!' })
    } else {
      request.token = headerToken
      request.userId = userId
      next()
    }
  },
  authorization: async (request, response, next) => { 

    try{ 
        const token = request.token
        const userId = request.userId

        const decoded = JWT.verify(token, JWT_KEY)

        if (parseInt(userId) !== parseInt(decoded.id)) {
            response.json({ message: 'You\'re Unauthorized!' })
        }else{
            request.token = token
            request.userId = userId
        
            next()
        } 
    }catch(error){
        if (error && error.name === 'TokenExpiredError') {
            response.json({ message: 'Token Expired!' })
        }else if (error && error.name === 'JsonWebTokenError') {
            response.json({ message: error.message })
        }else{
            response.json({ message: 'Error Error!' })
        }
    }
      
  }
}
