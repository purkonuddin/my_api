// db.js 
const { pool } = require('./pgconnect');
 
pool.on('connect', () => {
  console.log('connected to the db');
});

/**
 * test insert user
 */
const insertUser = () => {
  const createQuery = `INSERT INTO users(username, password, name, email, referral_code, salt) VALUES($1, $2, $3, $4, $5, $6) returning *`;
  const values = [ 
      'mr i',
      'pass123',
      'pur din aja',
      'pur@gml.id',
      'asd1234fgh12',
      'TEST', 
  ];
  pool.query(createQuery, values,
      (error, result) => {
          if (error) console.log(error);

          console.log(result);
          pool.end();
  });
}

/**
 * Create User Table
 */
const createUserTable = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      users(
        id BIGSERIAL PRIMARY KEY,
        username VARCHAR(128) UNIQUE NOT NULL,
        password VARCHAR(128) NOT NULL,
        name VARCHAR(128) NOT NULL,
        email VARCHAR(128) UNIQUE NOT NULL,
        referral_code VARCHAR(128) NULL,
        salt VARCHAR(128) NULL,
        created TIMESTAMP,
        updated TIMESTAMP
      )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

/**
 * Create Referral Table
 */
const createReferralTable = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      referral(
        id BIGSERIAL PRIMARY KEY,
        up_line INT NOT NULL,
        down_line INT NOT NULL,
        referral_code VARCHAR(25) NOT NULL,
        created TIMESTAMP,
        updated TIMESTAMP
      )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}
 
/**
 * Drop User Table
 */
const dropUserTable = () => {
  const queryText = 'DROP TABLE IF EXISTS users returning *';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
        console.log(err);
        pool.end();
      });
  }

  /**
 * Drop Referral Table
 */
const dropReferralTable = () => {
  const queryText = 'DROP TABLE IF EXISTS referral returning *';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
        console.log(err);
        pool.end();
      });
  }
  /**
   * Create All Tables
   */
  const createAllTables = () => {
    createUserTable();
    createReferralTable();
  }
  /**
   * Drop All Tables
   */
  const dropAllTables = () => {
    dropUserTable();
    dropReferralTable();
  }
  
  pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
  });
  
  
  module.exports = {
    insertUser,
    createReferralTable,
    createUserTable,
    createAllTables,
    dropUserTable, 
    dropReferralTable, 
    dropAllTables,
  };
  
  require('make-runnable');