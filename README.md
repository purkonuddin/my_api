# my_api
RestFull Api with node js express and postgress

## Instalation

### clone and install
open gitbase: git clone https://github.com/purkonuddin/my_api.git"
cd my_api
npm init
yarn install or npm install

### create postgress tables 
run db.js file at configs folder
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

open postman: localhost:8000
![https://www.getpostman.com/collections/fdd09870246310adf1dc](https://www.getpostman.com/collections/fdd09870246310adf1dc)
 
### Swagger

open browser: http://localhost:8000/api-docs/

![https://github.com/purkonuddin/my_api/blob/master/FireShotCapture026-SwaggerUI.png](FireShotCapture026-SwaggerUI.png)

![https://github.com/purkonuddin/my_api/blob/master/FireShot Capture 027 - Swagger UI - localhost.pdf](FireShot Capture 027 - Swagger UI - localhost.pdf)
