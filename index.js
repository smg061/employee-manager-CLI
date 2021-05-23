const inquirer = require('inquirer');
const mysql = require('mysql');
const connection = require('./config/connection')
const {readEmployees, readDepartments } = require('./util/queries');
const {addEmployeePrompt, updateEmployeePrompt, addDepartmentPrompt, viewEmployeeByManager, updateManagerPrompt} = require('./util/prompts');


// main menu prompt object
 let mainMenuPrompt = [
    {
      type:"rawlist",
      message: "What to do?",
      name: "selection",
      choices: ["View departments", "View employees", "Add department", "Add employee", "Update an employee's role", "View Employees by manager", "Update an employee's manager", "Exit"]
    }
  ]

// connect to the database
connection.connect((err)=> { 
    if(err) throw err;
 })

async function mainPrompt()
{
  await inquirer.prompt(mainMenuPrompt)
    .then((answer) => 
    {
      console.clear();
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
        case "Update an employee's role":
          updateEmployeePrompt();
          break;
        case "Add department":
          addDepartmentPrompt();
          break;
        case "View Employees by manager":
          viewEmployeeByManager();
          break;
        case "Update an employee's manager":
          updateManagerPrompt();
          break;
        case "Exit":
          connection.end();
          break;
        default:
          console.log("No valid option selected");
          mainPrompt();
          break;
      }
    })
    mainPrompt();
}

async function main()
{
  await mainPrompt();
}


main();