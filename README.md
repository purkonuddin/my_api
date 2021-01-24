# my_api

RestFull Api dengan Node js, Express Js dan PostgreSQL

## Installation
use git_base : git clone https://git.com/purkonuddin/my_api
cd my_api
npm init
yarn install
npm start

 
## End Point

### Registration Page

![localhost:8000/user/register](localhost:8000/user/register) <br/>

input : 
    <ul>
        <li>username</li>
        <li>password</li>
        <li>name</li>
        <li>email</li>
        <li>referral_code</li>
    </ul>

### Login

![localhost:8000/user/login](localhost:8000/user/login) <br/>

input : 
    <ul>
        <li>username</li>
        <li>password</li> 
    </ul>

### Edit User's Data

![localhost:8000/user/editprofile](localhost:8000/user/editprofile) <br/>

Authorization: Bearer Token<br/>
Headers: user-id<br/><br/>

input : 
    <ul>
        <li>name</li>
        <li>email</li> 
    </ul>

### Ref-Code Input

![localhost:8000/referral](localhost:8000/referral) <br/>

Authorization: Bearer Token<br/>
Headers: user-id<br/><br/>

input : 
    <ul>
        <li>referral_code</li> 
    </ul>


### Find Users by Name

![localhost:8000/user](localhost:8000/user?name={name}) <br/> 

Input Query Params : 
    <ul>
        <li>name</li> 
    </ul>


### Get Singgle Hero Based on Input 

![localhost:8000/hero](localhost:8000/hero?name={hero name}) <br/> 

Input Query Params : 
    <ul>
        <li>name</li> 
    </ul>