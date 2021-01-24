const models = require("../models/user");
const refmodels = require("../models/referral");
const helper = require("../helpers");
const JWT = require("jsonwebtoken"); 
const helpers = require("../helpers");
const { JWT_KEY } = require("../configs"); 

module.exports = {
  // REGISTER USER
  register: async (request, response, next) => {
    try {
      let salt = helper.generateSalt(32); 
      let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 
      let key = salt;
      let iv = key.slice(0, 16);
      
      var hashPassword = helpers.encryptText('aes256', key, iv, `${request.body.password}`, "base64");
      // console.log("encrypted text = " + hashPassword.salt, hashPassword.passwordHash);

      const data = {
        username: request.body.username,
        password: hashPassword.passwordHash,  
        salt: hashPassword.salt,  
        name: request.body.name, 
        email: request.body.email, 
        created: new Date(),
      };

      const referral_code = request.body.referral_code;

      let validateEmail = await regexEmail.test(data.email);
      const emailExist = await models.checkEmail(data.email); 

      if(!data.username || !data.password || !data.name || !data.email){
        console.log(data)
        helpers.customErrorResponse(response, 400, "Please fill out the fields");
        
      }else if(!validateEmail){
        helpers.customErrorResponse(response, 400, "Plese use valid email");

      }else if(emailExist.rowCount > 0){
        helpers.customErrorResponse(response, 400, "Email has already exist");

      }else{
        if(referral_code !== ''){
          const checkReferralCode = await refmodels.checkReferralCode(referral_code);

          if(checkReferralCode.rowCount == 0){
            helper.customErrorResponse(response, 404, "Referral Code is not exist");
    
          }else{
            await models.register(data).then((result) => {
              if (result === "usernameExist") {
                helpers.customErrorResponse(
                  response,
                  400,
                  `Register fail username has already Exist`
                ); 
              } else {
                // save referral  
                // console.log(result);
                request.userId = result.rows[0].id;
                request.dataForm = data;
                request.referral_code = referral_code;
                next()  // --> handleReferralCode
              }
    
            });
          }
        }else{
          await models.register(data).then((result) => {
            if (result === "usernameExist") {
              helpers.customErrorResponse(
                response,
                400,
                `Register fail username has already Exist`
              ); 
            } else {
              helpers.response(response, 200, data);
            }
  
          });
        } 
      } 
      // }  
    } catch (error) {
      console.log(error);
    }
  },

  // LOGIN USER
  login: async (request, response) => {
    try {
      const data = {
        username: request.body.username,
        password: request.body.password,
      };
      const usernameValid = await models.checkUsername(data.username);
      console.log(usernameValid.rows[0]);
      const dataUser = usernameValid.rows[0];

      let salt = dataUser.salt;
      let key = salt;
      let iv = key.slice(0, 16);
      let encryptpass = helpers.encryptText('aes256', key, iv, `${data.password}`, "base64");
      const hashPassword = encryptpass; 
      
      if (
        hashPassword.passwordHash === dataUser.password &&
        usernameValid.rowCount > 0
      ) {
        const token = JWT.sign(
          {
            email: dataUser.email,
            id: dataUser.id,
          },
          JWT_KEY,
          { expiresIn: "9h" }
        );
        delete dataUser.salt;
        delete dataUser.password;
        dataUser.token = token;
        response.json(dataUser);
        console.log("DATA", token);
      } else {
        helpers.customErrorResponse(response, 400, "wrong password");
      }
    } catch (error) {
      helpers.customErrorResponse(response, 400, "username not found");
    }
  }, 

  // EDIT USER DATA
  updateData: async (request, response) => {
    try {  
      const userId = request.userId 
      const dataValid = await models.checkData(userId);
      // console.log(dataValid.rows[0]);
      const dataUser = dataValid.rows[0]; 
      const name = request.body.name;
      const email = request.body.email; 
      const referral_code = ''; 
      // console.log(dataUser);
      const updated = new Date(); 
      // console.log(dataUser);
      let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      let validateEmail = await regexEmail.test(email); 
      // console.log(regexEmail);
      const emailExist = await models.checkEmail(email); 
      // console.log(validateEmail);

      if(!name || !email){
        helpers.customErrorResponse(response, 400, "Please fill out the fields");
        
      }else if(!validateEmail){
        helpers.customErrorResponse(response, 400, "Plese use valid email");

      }else if(emailExist.rowCount > 0 && dataUser.email !== email){
        helpers.customErrorResponse(response, 400, "Email has already exist");

      }else{
        await models.updateData(
          name,
          email,
          referral_code,
          updated,
          userId
        );

        const newData = {
          name: name,
          email: email, 
          referral_code:referral_code,
          updated: updated,
          id: userId,
        };

      helpers.response(response, 200, newData);

      } 
    } catch (error) { 
        helpers.customErrorResponse(response, 400, "Fail update user"); 
    }
  }, 

  // FIND A USER
  getUser: async (request, response) => {
    try {
      const name = request.query.name || "";
      const result = await models.getUser(name);
      helpers.response(response, 200, result.rows);
    } catch (error) {
      helpers.customErrorResponse(response, 404, "user not found");
    }
  }, 
};
