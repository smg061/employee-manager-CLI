const inquirer = require('inquirer');
const mysql = require('mysql');
const connection = require('./config/connection')
const dotenv = require('dotenv');
const {readEmployees, readDepartments, getEmployees, returnEmployeeArray, getDepartments, returnDepartmentArray} = require('./util/queries');

connection.connect((err)=> { 
    if(err) throw err;
 })

 let mainMenuPrompt = [
    {
      type:"rawlist",
      message: "What to do?",
      name: "selection",
      choices: ["View departments", "View employees"]
    }
  ]


async function mainPrompt()
{
  let employeeList = await returnDepartmentArray(); 
  console.log(employeeList);
  //console.clear();
  inquirer.prompt(mainMenuPrompt)
    .then((answer) => 
    {
      switch(answer.selection)
      {
        case "View departments":
          readDepartments();
          connection.end();
          break;
        case "View employees":
          readEmployees();
          connection.end();
          break;
        
        default:
            console.log("NO valid option selected")
            break;
      }
    })
}

async function main()
{
    await mainPrompt();

}

main();