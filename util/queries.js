const connection = require('../config/connection');


// optional parameter return array populates an array if provided
const readEmployees = () => {
    let query = 'SELECT e.employee_id, first_name, last_name, title, manager_id, name as department FROM employee e ';
    query+= 'JOIN role r ON e.role_id = r.id ';
    query+='JOIN department d ON r.department_id = d.id ORDER BY first_name'

    connection.query(query, (err, res) => {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
    });
 };

function getEmployees() {
    query = "SELECT first_name, last_name FROM employee"
    return new Promise(function(resolve, reject){
      connection.query(query, (err, res) =>{                                                
              if(res === undefined)
              {
                  reject(new Error("Error rows is undefined"));
              }
              else
              {
                  resolve(res);
              }
          }
      )}
  )}

async function returnEmployeeArray()
  {
      let employeeArray = [];
      retrievedEmployee = await getEmployees();
      retrievedEmployee.forEach(item => employeeArray.push(`${item.first_name} ${item.last_name}`));
      return employeeArray;
  }

  
const readDepartments = () => {
    let query = 'SELECT * from department ORDER BY id ';
    connection.query(query, (err, res) => {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.table(res);
      connection.end();
    });
 };


function getDepartments(){
    query = "SELECT name  FROM department"
    return new Promise(function(resolve, reject){
      connection.query(query, (err, res) =>{                                                
              if(res === undefined)
              {
                  reject(new Error("Error rows is undefined"));
              }
              else
              {
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


const findSongsByArtist = () => 
{
  inquirer.prompt([
    {
      type:"input",
      message: "Search songs by which artist? ",
      name: "artist", 
    }
  ])
  .then(({artist}) =>
  {
    console.log(`----------------------------------\nSearching songs by ${artist}...\n----------------------------------`)
    const query = `SELECT song, raw_total FROM topsongs WHERE?`
    connection.query(query, {artist: artist}, (err, res) => 
    {
      if (err) throw err;
      res.forEach(item => console.log(item["song"], item["raw_total"]))
    })
    connection.end();
})
}

const findAlbumsByArtist = () => 
{
  inquirer.prompt([
    {
      type:"input",
      message: "Search Albums by which artist? ",
      name: "artist",
    }
  ])
  .then(({artist}) =>
  {
    console.log(`----------------------------------\nSearching albums by ${artist}...\n----------------------------------`)
    const query = `SELECT album FROM topalbums WHERE?`;
    connection.query(query, {artist: artist}, (err, res)=> 
    {
      if (err) throw err;
      res.forEach(item => console.log(item["album"]))
    });
    connection.end();
})
}

const findSongAndAlbumByArtist = () => 
{
  inquirer.prompt([
    {
      type:"input",
      message: "Search songs and albums by which artist? ",
      name: "artist",
    }
  ])
  .then(({artist}) => 
  {
    console.log(`----------------------------------\nSearching songs & albums by ${artist}...\n----------------------------------`)
    let query = `SELECT ts.artist, song, album FROM topsongs ts INNER JOIN topalbums ta`;
    query += ` ON ts.artist = ta.artist WHERE?`;
    connection.query(query, {"ts.artist": artist}, (err, res) => 
    {
      if(err) console.log("Could not search your query. Please try again");
      if(res.length == 0) console.log("No items found for your query");
      res.forEach(item => console.log(`song: ${item.song}\nalbum: ${item.album}`));
    });
    connection.end();
  });

}

module.exports = {readEmployees, readDepartments, getEmployees, returnEmployeeArray, getDepartments, returnDepartmentArray};