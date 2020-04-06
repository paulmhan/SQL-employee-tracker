//import sql connection
const connection = require("../config/connection.js");

// Object for all our SQL statement functions.
const orm = {
    all: (tableInput, cb) => {
      let queryString = `SELECT * FROM ${tableInput};`;
      connection.query(queryString, function(err, res) {
        if (err) throw err;
        cb(res);
      });
    },
    addDepartment: (department, cb) => {
        let queryString = `INSERT INTO department (name) VALUES ("${department}")`;
        connection.query(queryString, function(err, res) {
            if(err) throw err;
            cb(res);
        });
    },
    addRole: (title, salary, departmentNum, cb) => {
        let queryString = "INSERT INTO role (title, salary, department_id) VALUES (?,?,?)";
        connection.query(queryString, [title, salary, departmentNum], function(err,res){
            if (err) throw err;
            cb(res);
        })
    },
    addEmployee: (fName, lName, roleNum, cb) => {
        let queryString = "INSERT INTO employee (first_name, last_name, role_id) VALUES (?,?,?)"
        connection.query(queryString, [fName, lName, roleNum], function(err,res){
            if (err) throw err;
            cb(res);
        })

    },
    update: (table, objColVals, condition, cb) => {
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