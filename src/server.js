const { port } = require('./configs')
const { IP } = require('./configs')
const express = require('express')
const server = express()
const logger = require('morgan')
const bodyParser = require('body-parser')
const mainNavigation = require('./routes')
const cors = require('cors')
const compress = require('compression')
const helmet = require('helmet')
const swaggerJsonDoc = require('swagger-jsdoc')	
const swaggerUI = require('swagger-ui-express')
const swaggerDocument = require('./swagger-spec.json');
 
var options = {
    customCss: '.swagger-ui .topbar { display: none }'
  };
 
server.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument, options))

server.use(helmet()); 
server.use(compress()); 
server.use(cors()); 
server.listen(port, () => console.log(`\n This server is running on port ${port}, and use IP ${IP}`))
server.use(logger('dev')) 
server.use(bodyParser.json()) 
server.use(bodyParser.urlencoded({ extended: true })) 
server.use('/', mainNavigation)
server.get('/', (req, res)=>{
    res.send('RestFull Api with nodejs, expressjs and postgress, and sweger testing')
})
