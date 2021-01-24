# my_api
RestFull Api with node js express and postgress

## Instalation

### clone and install
open gitbase: git clone https://github.com/purkonuddin/my_api.git"<br/>
cd my_api<br/>
npm init<br/>
yarn install or npm install

### create postgress tables 
run db.js file at configs folder<br/>
cd src/configs > node db.js createAllTables<br/>
 
## Endpoint
<table>
<tr><td>post</td><td>Registration page </td><td> /user/register</td></tr>
<tr><td>post</td><td>login</td><td>/user/login</td></tr>
<tr><td>patch</td><td>Edit user's data</td><td>/user/editprofile</td></tr>
<tr><td>get</td><td>Find user by name</td><td>/user</td></tr>
<tr><td>post</td><td>Ref-Code Input</td><td>/referral</td></tr>
<tr><td>post</td><td>Get singgle Hero</td><td>/hero</td></tr> 
</table>

## Testing

### postman

open postman: localhost:8000<br/>
![https://www.getpostman.com/collections/fdd09870246310adf1dc](https://www.getpostman.com/collections/fdd09870246310adf1dc)
 
### Swagger

open browser: http://localhost:8000/api-docs/<br/>

![https://github.com/purkonuddin/my_api/blob/master/FireShotCapture026-SwaggerUI.png](FireShotCapture026-SwaggerUI.png)

![https://github.com/purkonuddin/my_api/blob/master/FireShot] Capture 027 - Swagger UI - localhost.pdf](FireShot Capture 027 - Swagger UI - localhost.pdf)
