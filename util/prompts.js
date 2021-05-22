const {returnQueryAsArray, readDepartments} = require('./queries');
const inquirer = require('inquirer');
const connection = require('../config/connection');


// this is where the list of employees and roles are read
let employeeList = [];
let employeeRoles = [];

// this function reads the database and populates the two arrays declared above
async function retrieveEmployeesAndRoles()
{
    // wait for the roles and employee queries to be finished and read them into the arrays with a forEach loop
    let employeeRolesQuery =  await returnQueryAsArray("SELECT title from role");
    let employeeListQuery =  await returnQueryAsArray("SELECT first_name, last_name from employee");
    employeeListQuery.forEach(item => employeeList.push(`${item.first_name} ${item.last_name}`));
    employeeRolesQuery.forEach(item => employeeRoles.push(item.title));
}

// prompt to add an employee
async function addEmployeePrompt()
{
    // wait for the retrieval of employee and roles
    await retrieveEmployeesAndRoles();
    let addEmployeeQuestions = [
        {
            type: "input",
            name: "firstName",
            message: "What is the employees first name?\n"
        },
        {
            type: "input",
            name: "lastName",
            message: "What is the employees last name?\n"
        },
        {
            type: "list",
            name: "role",
            message: "What is the employees role?\n",
            choices: employeeRoles
        },
        {
            type: "list",
            name: "manager",
            message: "Who is this employee's manager?",
            choices: ["None", ...employeeList, ]
        }
    ]

    inquirer.prompt(addEmployeeQuestions)
    .then(answers => {
        let query = `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES `
        query+= `("${answers.firstName}", "${answers.lastName}", (SELECT id from role WHERE title = '${answers.role}'), `
        query+= `(SELECT t1.employee_id FROM employee t1 WHERE CONCAT(t1.first_name, " ", t1.last_name)= '${answers.manager}'))`
        connection.query(query, (err, res) => {
            if (err) throw err;
            console.log("Employee added successfully!")
        })
    });
}


async function updateEmployeePrompt()
{
    await retrieveEmployeesAndRoles();

    let updateEmployeeQuestions = [
        {
            type: "list",
            name: "name",
            message: "Which employee do you want to update?\n",
            choices: employeeList
        },
        {
            type: "list",
            name: "newRole",
            message: "What is this employees new role?",
            choices: employeeRoles
        },
    ]

    inquirer.prompt(updateEmployeeQuestions)
    .then(answers => {
        let query = `UPDATE employee SET role_id = (SELECT id FROM role WHERE title = '${answers.newRole}') WHERE first_name = '${answers.name}'`
        connection.query(query, (err, res) => {
            if (err) throw err;
            console.log("Employee role updated successfully");
        })
    });
}

async function addDepartmentPrompt()
{
    await retrieveEmployeesAndRoles();

    let addDepartmentPrompt = [
        {
            type: "input",
            name: "name",
            message: "What is the name of the department you want to add?",
        },
        {
            type: "list",
            name: "newRole",
            message: "What is this employees new role?",
            choices: employeeRoles
        },
    ]

    inquirer.prompt(updateEmployeeQuestions)
    .then(answers => {
        let query = `UPDATE employee SET role_id = (SELECT id FROM role WHERE title = '${answers.newRole}') WHERE first_name = '${answers.name}'`
        connection.query(query, (err, res) => {
            if (err) throw err;
            console.log("Employee role updated successfully");
        })
    });
}


module.exports = {addEmployeePrompt, updateEmployeePrompt}


