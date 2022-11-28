var mysql = require("mysql");

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "userdb",
  multipleStatements: true,
});

db.connect((err) => {
  if (!err) {
    console.log("connected");
  } else {
    console.log("connection not successful");
  }
});

// db.query = util.promisify(db.query);
module.exports = db;
