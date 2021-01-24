# my_api
RestFull Api with node js express and postgress

## Instalation

### clone and install
open gitbase: git clone https://github.com/purkonuddin/my_api.git"
cd my_api
npm init
yarn install or npm install

### create postgress tables 
run db.js file:
cd src/configs > node db.js createAllTables
 
## Endpoint
post    Registration page       /user/register
post    login                   /user/login
patch   Edit user's data        /user/editprofile
get     Find user by name       /user
post    Ref-Code Input          /referral
post    Get singgle Hero        /hero


## Testing

### postman
 
### Swagger
![https://github.com/purkonuddin/my_api/blob/master/FireShotCapture026-SwaggerUI.png](FireShotCapture026-SwaggerUI.png)
