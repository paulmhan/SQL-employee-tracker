//import sql connection
const connection = require("../config/connection.js");

// Object for all our SQL statement functions.
const orm = {
    all: function(tableInput, cb) {
      let queryString = `SELECT * FROM ${tableInput};`;
      connection.query(queryString, function(err, res) {
        if (err) throw err;
        cb(res);
      });
    },
    addDepartment: function(department, cb){
        let queryString = `INSERT INTO department (name) VALUES ("${department}")`;
        connection.query(queryString, function(err, res) {
            if(err) throw err;
            cb(res);
        });
    },
    addRole: function(title, salary, departmentNum, cb){
        let queryString = "INSERT INTO role (title, salary, department_id) VALUES (?,?,?)";
        connection.query(queryString, [title, salary, departmentNum], function(err,res){
            if (err) throw err;
            cb(res);
        })
    },











    create: function(table, cols, vals, cb) {     
      let queryString = `INSERT INTO ${table} (${cols}) VALUES ("${vals}");`
      console.log(queryString);  
      connection.query(queryString, function(err, result) {
        if (err) {
          throw err;
        }
        connection.query(`SELECT * FROM ${table} WHERE id = ${result.insertId} `, function(err,res){
            if (err){
                throw err;
            }
            cb(res);
        })
      });
    },
    // An example of objColVals would be {name: panther, sleepy: true}
    update: function(table, objColVals, condition, cb) {
      let queryString = "UPDATE " + table;
  
      queryString += " SET ";
      queryString += objToSql(objColVals);
      queryString += " WHERE ";
      queryString += condition;
  
      console.log(queryString);
      connection.query(queryString, function(err, result) {
        if (err) {
          throw err;
        }
  
        cb(result);
      });
    } 
  };
  
  // Export the orm object for the model (cat.js).
  module.exports = orm;