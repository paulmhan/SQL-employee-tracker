const orm = require("../models/orm.js")

const controller = {
    addDepartment: function (departmentName, cb){
        // "John", "Doe", 1, 3
        // "'John', 'Doe', 1, 3"
        console.log(typeof(departmentName))
        orm.create("department", "name", departmentName, function(res){
            cb(res)
        })
    },
    addRole: function(){

    },
    addEmployee: function(){

    },
    viewDepartments: function(cb){
        orm.all("department",function(res){
            cb(res);
        });
    },
    viewRoles: function(cb){
        orm.all("role",function(res){
            cb(res);
        });
    },
    viewEmployees: function(cb){
        orm.all("employee",function(res){
            cb(res);
        });
    },
    updateEmployee: function(){

    },


}

module.exports = controller;