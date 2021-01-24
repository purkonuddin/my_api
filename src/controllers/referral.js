const models = require("../models/referral");
const usermodels = require("../models/user");
const helper = require("../helpers");
const helpers = require("../helpers");

module.exports = {
  handleReferralCode: async (request, response) => {
    try{
      const data = {
        dataForm: request.dataForm,
        referral_code: request.referral_code,
        userId: request.userId
      }
      // console.log(data);
      const checkReferralCode = await models.checkReferralCode(data.referral_code);
      // console.log(checkReferralCode);
      if (checkReferralCode.rowCount > 0) {
        const dataRefferal = {
          up_line: checkReferralCode.rows[0].id,
          down_line: data.userId,
          referral_code: data.referral_code,
          created: new Date(),
          updated: new Date(),
        };

        console.log(dataRefferal);
        const inputRef = await models.inputReferral(dataRefferal);
        console.log(inputRef);
        helper.response(response, 200, data);
      } else {
        helper.customErrorResponse(response, 404, "Referral Code is not exist");
      }
    }catch(error){
      helpers.customErrorResponse(response, 400, "Fail update user");
    }
  },
  inputReferralCode: async (request, response) => {
    try{
      const userId = request.userId 
      const dataValid = await usermodels.checkData(userId);
      const dataUser = dataValid.rows[0]; 
      const name = dataUser.name;
      const email = dataUser.email; 
      const referral_code = request.body.referral_code; 
      const updated = new Date(); 

      await usermodels.updateData(
        name,
        email,
        referral_code,
        updated,
        userId
      );

      const data = {
        name,
        email,
        referral_code,
        updated,
        userId
      }

      helper.response(response, 200, data);
    }catch(error){ 
        helpers.customErrorResponse(response, 400, error); 
    } 
  },
};
