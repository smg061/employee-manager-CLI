const connection = require('../config/connection');


// simple query to log all employees
const readEmployees = async () => {
    let query = `SELECT e.employee_id, first_name, last_name, title, manager_id,
     (SELECT CONCAT(first_name, ' ', last_name) FROM employee e2 WHERE e.manager_id = e2.employee_id) AS manager_name,
      salary, name as department FROM employee e `;
    query+= `JOIN role r ON e.role_id = r.id `;
    query+=`JOIN department d ON r.department_id = d.id ORDER BY first_name`

    await connection.query(query, (err, res) => {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        connection.end();
    });
 };


// this function returns the query as an object using a promise
function getEmployees() 
{
    query = "SELECT first_name, last_name FROM employee"
    return new Promise(function(resolve, reject){
      connection.query(query, (err, res) =>{                                                
              if(res === undefined) {
              
                  reject(new Error("Error rows is undefined"));
              }
              else {
              
                  resolve(res);
              }
          }
      )}
  )}

// this function uses the previous function to read the returned query promise into an array and return it to be usable
async function returnEmployeeArray()
{
      let employeeArray = [];
      let retrievedEmployee = await getEmployees();
      retrievedEmployee.forEach(item => employeeArray.push(`${item.first_name} ${item.last_name}`));
      return employeeArray;
}


// this function is a more general version of getEmployees() function; the query must be provided as a parameter
const getSQLQuery = (query) => 
{
  return new Promise((resolve, reject) => 
  {
    connection.query(query, (err, res) => {
      if (err) throw err;
      if (res === undefined) {
        reject(new Error("Error: data is undefined"))
      }
      else {
        resolve(res);
      }
    })
  })
}

// more generic version of the returnEmployeesArray() function
const returnQueryAsArray = async (query) => 
{
  let returnArray = [];
  let retrievedData = await getSQLQuery(query);
  retrievedData.forEach(item => returnArray.push(item));
  return returnArray;
}


// simple query to display all departments
const readDepartments = async () => {
    let query = 'SELECT * from department ORDER BY id ';
    await connection.query(query, (err, res) => {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.table(res);
      connection.end();
    });
 };



// the two functions below are basically the same as the getEmployees() and returnEmployeeArray() duo but for departments
function getDepartments() {
    query = "SELECT name  FROM department"
    return new Promise(function(resolve, reject){
      connection.query(query, (err, res) =>{                                                
              if(res === undefined) {
                  reject(new Error("Error: data is undefined"));
              }
              else {
                  resolve(res);
              }
          }
      )}
  )}

async function returnDepartmentArray()
  {
      let employeeArray = [];
      retrievedEmployee = await getDepartments();
      retrievedEmployee.forEach(item => employeeArray.push(`${item.name}`));
      return employeeArray;
  }


module.exports = {readEmployees, readDepartments, returnEmployeeArray, returnDepartmentArray, returnQueryAsArray};