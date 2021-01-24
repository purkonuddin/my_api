const pool = require("../configs/pgconnect");

module.exports = {
  // REGISTER QUERY
  register: (data) => {
    return new Promise((resolve, reject) => {
      pool.query(
        "SELECT * FROM users WHERE username = $1",
        [data.username],
        (error, result) => {
          if (result.rowCount > 0) {
            const result = "usernameExist";
            resolve(result);
          } else {
            const values = [
              data.username,
              data.password,
              data.name,
              data.email,
              data.referral_code,
              data.salt,
              data.created, 
            ];
            pool.query(
              "INSERT INTO users(username, password, name, email, referral_code, salt, created) VALUES($1, $2, $3, $4, $5, $6, $7) returning *",
              values,
              (error, result) => {
                if (error) reject(new Error(error));
                resolve(result);
              }
            );
          }
        }
      );
    });
  },

  // CHECK Username QUERY
  checkUsername: (username) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM users WHERE username = $1`,
        [username],
        (error, result) => {
          if (error) reject(new Error(error));
          resolve(result);
        }
      );
    });
  },

  // CHECK EMAIL QUERY
  checkEmail: (email) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM users WHERE email = $1`,
        [email],
        (error, result) => {
          if (error) reject(new Error(error));
          resolve(result);
        }
      );
    });
  },

  // CHECK DATA BY ID QUERY
  checkData: (userId) => {
    return new Promise((resolve, reject) => {
      pool.query(
        "SELECT * FROM users WHERE id = $1",
        [userId],
        (error, result) => {
          if (error) reject(new Error(error));
          resolve(result);
        }
      );
    });
  },

  // FIND A USER QUERY
  getUser: (name) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT username, name, email FROM users WHERE name ILIKE '%${name}%'`,
        (error, result) => {
          if (error) reject(new Error(error));
          resolve(result);
        }
      );
    });
  },

  // UPDATE USER DATA
  updateData: ( 
    name,
    email, 
    referral_code,
    updated,
    userId
  ) => {
    return new Promise((resolve, reject) => {
      let data = [ 
        name,
        email, 
        referral_code,
        updated,
        userId,
      ];
      pool.query(
        "UPDATE users SET name = $1, email = $2, referral_code = $3, updated = $4 WHERE id = $5",
        data,
        (error, result) => {
          if (error) reject(new Error(error));
          resolve(result);
        }
      );
    });
  },   
}