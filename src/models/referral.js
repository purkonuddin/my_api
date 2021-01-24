const pool = require("../configs/pgconnect");

module.exports = {
  checkReferralCode: (referral_code) => {
    return new Promise((resolve, reject) => {
      pool.query(
        "SELECT id FROM users WHERE referral_code = $1",
        [referral_code],
        (error, result) => {
          if (error) reject(error);
          resolve(result);
        }
      );
    });
  },

  inputReferral: (data) => {
    return new Promise((resolve, reject) => {
      const values = [
        data.up_line,
        data.down_line,
        data.referral_code,
        data.created
      ];
      pool.query("INSERT INTO referral(up_line, down_line, referral_code, created) VALUES($1, $2, $3, $4) returning *", values, (error, result) => {
        if (error) reject(error);
        resolve(result);
      });
    });
  },
};
