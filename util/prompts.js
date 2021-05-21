const {readEmployees, readDepartments} = require('./util/queries');

c

let addEmployeeQuestions = [
    {
        type: "list",
        name: "employeeType",
        message: "What kind of employee do you want to add add?",
        choices: ["Engineer", "Intern", "Manager"]
    },
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
        type: "input",
        name: "role",
        message: "What is the employees email?\n"
    },
    {
        type: "input",
        name: "employeeGithub",
        message: "What is the employees github username?\n",
        // only ask this question if employeeType is 'Engineer'
        when: function (answers) { return answers.employeeType == "Engineer"; }
    },
    {
        type: "input",
        name: "employeeOfficeNumber",
        message: "What is the employees office number?\n",
        // only ask this question if employeeType is 'Manager'
        when: function (answers) { return answers.employeeType == "Manager"; }
    },
    {
        type: "input",
        name: "employeeSchool",
        message: "What is the employee's current school?\n",
        // only ask this question if employeeType is 'Intern'
        when: function (answers) { return answers.employeeType == "Intern"; }
    }



]

