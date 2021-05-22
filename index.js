const inquirer = require('inquirer');
const mysql = require('mysql');
const connection = require('./config/connection')
const {readEmployees, readDepartments, returnEmployeeArray, returnDepartmentArray} = require('./util/queries');

const {addEmployeePrompt, updateEmployeePrompt} = require('./util/prompts');


// the employee list and employee roles are read into these arrays after calling the 
let employeeList = [];
let employeeRoles = [];

// main menu prompt object
 let mainMenuPrompt = [
    {
      type:"rawlist",
      message: "What to do?",
      name: "selection",
      choices: ["View departments", "View employees", "Add department", "Add employee", "Update employee"]
    }
  ]

// connect to the database
connection.connect((err)=> { 
    if(err) throw err;
 })

async function mainPrompt()
{
  
  inquirer.prompt(mainMenuPrompt)
    .then((answer) => 
    {
      switch(answer.selection)
      {
        case "View departments":
          readDepartments();
          break;
        case "View employees":
          readEmployees();
          break;
        case "Add employee":
          addEmployeePrompt();
          break;
        case "Update employee":
          updateEmployeePrompt();
          break;

        default:
            console.log("NO valid option selected")
            break;
      }
    })
}

mainPrompt();