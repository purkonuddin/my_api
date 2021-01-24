require('dotenv/config')

module.exports = { 
  port: process.env.PORT,
  JWT_KEY: process.env.JWT_KEY,
  IP: process.env.DB_IP
}
