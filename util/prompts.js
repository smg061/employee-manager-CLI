const {returnQueryAsArray} = require('./queries');
const inquirer = require('inquirer');
const connection = require('../config/connection');

// this is where the list of employees and roles are read
let employeeList = [];
let employeeRoles = [];
let managerList = [];

// this function reads the database and populates the two arrays declared above
async function retrieveEmployeesAndRoles()
{
    // wait for the roles and employee queries to be finished and read them into the arrays with a forEach loop
    let employeeRolesQuery =  await returnQueryAsArray("SELECT title from role");
    let employeeListQuery =  await returnQueryAsArray("SELECT first_name, last_name from employee");
    let managersListQuery = await returnQueryAsArray("SELECT first_name, last_name from employee WHERE manager_id IS NULL");
    // push the results into the global arrays
    employeeListQuery.forEach(item => employeeList.push(`${item.first_name} ${item.last_name}`));
    managersListQuery.forEach(item => managerList.push(`${item.first_name} ${item.last_name}`));
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

    await inquirer.prompt(addEmployeeQuestions)
    .then(answers => {
        // build the query from the answers
        let query = `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES `
        query+= `("${answers.firstName}", "${answers.lastName}", (SELECT id from role WHERE title = '${answers.role}'), `
        query+= `(SELECT t1.employee_id FROM employee t1 WHERE CONCAT(t1.first_name, " ", t1.last_name)= '${answers.manager}'))`
        connection.query(query, (err, res) => {
            if (err) throw err;
            console.log("Employee added successfully!")
            connection.end();
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
        // foreign keys make these queries require references to the tables taht host the foreign keys (I think!)
        let query = `UPDATE employee SET role_id = (SELECT id FROM role WHERE title = '${answers.newRole}') WHERE first_name = '${answers.name}'`
        connection.query(query, (err, res) => {
            if (err) throw err;
            console.log("Employee role updated successfully");
            connection.end();
        })
    });
}

async function addDepartmentPrompt()
{
    await retrieveEmployeesAndRoles();

    let addDepartmentQuestion = [
        {
            type: "input",
            name: "name",
            message: "What is the name of the department you want to add?",
        },
    ]

    inquirer.prompt(addDepartmentQuestion)
    .then(answers => {
        let query = `INSERT INTO department(name) VALUES ('${answers.name}')`
        connection.query(query, (err, res) => {
            if (err) throw err;
            console.log("Department added successfully");
            connection.end();
        })
    });
}

async function viewEmployeeByManager()
{
    await retrieveEmployeesAndRoles();

    let whichManagerQuestion = [
        {
            type: "list",
            name: "name",
            message: "Which manager's employees do you want to see?\n",
            choices: managerList
        }
    ]

    inquirer.prompt(whichManagerQuestion)
    .then(answer => {
        let query = `SELECT CONCAT(first_name, ' ', last_name) as name FROM employee WHERE manager_id = (SELECT employee_id FROM employee WHERE CONCAT(first_name, ' ', last_name) = '${answer.name}')`
        connection.query(query, (err, res) => {

            if (err) throw err;
            if (res.length === 0) {
                console.log("No employees found for this manager")
            }
            else {
                res.forEach(item => {console.log(item.name)})
            }
            connection.end();
        })
    })
}

async function updateManagerPrompt()
{
    await retrieveEmployeesAndRoles();
    
    let updateManagerQuestions = [
        {
            type: "list",
            name: "name",
            message: "Which employee do you want to update?\n",
            choices: employeeList
        },
        {
            type: "list",
            name: "newManager",
            message: "Who is this employee's new manager?",
            choices: employeeList
        },
    ]

    inquirer.prompt(updateManagerQuestions)
    .then(answers => {

        let query = `UPDATE employee SET manager_id =
        (SELECT * FROM (SELECT t1.employee_id FROM employee t1 WHERE CONCAT(first_name, ' ', last_name) = '${answers.newManager}') AS temp) 
        WHERE CONCAT(first_name, ' ', last_name) = '${answers.name}'` // I hope God punishes me for coming up with this query.
        connection.query(query, (err , res) => {
            if (err) throw err;
            console.log("Manager updated succesfully");
            connection.end();
        })
    })
    
}

module.exports = {addEmployeePrompt, updateEmployeePrompt, addDepartmentPrompt, viewEmployeeByManager, updateManagerPrompt}


