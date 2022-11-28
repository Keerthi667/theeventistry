const express = require("express"); //connection between server and browser handles req,res
const bodyParser = require("body-parser"); //get access to the post data
const ejs = require("ejs");
const app = express();
const session = require("express-session"); //allows to keep track of users state login logout
const path = require("path"); //allows you to interact with file paths easily.
const pageRouter = require("./routes/pages"); //"Routes" to forward the supported requests.
//  get the requested data from the db, create an HTML page displaying the data, and return it to the user to view in the browser.
const bcrypt = require("bcrypt"); //for hashing password
var createdError = require("http-errors");
const { resourceLimits } = require("worker_threads");
const flash = require("express-flash"); // to display input error of html form
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));
app.use(express.static("public"));
app.use("/images", express.static("images"));
app.use(bodyParser.json());

app.use(flash());

app.use(
  session({
    secret: "ADBCefg",
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/", pageRouter);

app.listen(process.env.PORT || 3306, function () {
  console.log("server is up and running");
});

module.exports = app;
// app.get("/", function (req, res) {
//   res.render("home", {});
// });

// app.get("/events", function (req, res) {
//   res.render("events", {});
// });

// app.get("/login", function (req, res) {
//   res.render("login", {});
// });

// app.get("/signin", function (req, res) {
//   res.render("signin", {});
// });

// app.get("/form", function (req, res) {
//   res.render("form", {});
// });

// var fname = req.body.fname;
// var email = req.body.email;
// var password = req.body.password;

// if (fname == "" || email == "" || password == "") {
//   console.log("please fill the form");
// } else if (email.length < 8) {
//   console.log("enter the full email");
// } else if (password.length < 6) {
//   console.log("try again");
// } else {
//   res.render("events", { userName: fname });
// }

// var db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "root",
//   // database: "mydatabase",
//   multipleStatements: true,
// });

// db.connect((err) => {
//   if (!err) {
//     console.log("connected");
//   } else {
//     console.log("connection successful");
//   }
// });

//Create db
// db.connect((err) => {
//   db.query("CREATE DATABASE mydatabase", (err, result) => {
//     console.log("database created");
//   });
// });

//Create table
// db.connect((err) => {
//   db.query(
//     "CREATE TABLE customers(Personid INTEGER NOT NULL AUTO_INCREMENT,Personname VARCHAR(200),Personaddress VARCHAR(200),Personnum VARCHAR(200),Personevent VARCHAR(20),PRIMARY KEY(id))",
//     (err, result) => {
//       console.log("table created");
//     }
//   );
// });

// user details

// app.post("/form", function (req, res) {
//   const name = req.body.firstName;
//   const address = req.body.userAddress;
//   const phoneno = req.body.userPhone;
//   const event = req.body.userEvent;
//   const theme = req.body.themes;

//   db.connect((err) => {
//     var sql = `INSERT INTO users(name,phoneno,event,address,theme) VALUES("${name}","${phoneno}","${event}","${address}","${theme}")`;
//     db.query(sql, (err, results, fields) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log("data inserted");
//       }
//     });
//   });
//   res.render("thankyou", { wish: greetings });
// });

// delete table;
// db.connect((err) => {
//   var sql = "DELETE FROM public";
//   db.query(sql, (err, results, fields) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("data deleted");
//     }
//   });
// });

//insert into table
// db.connect((err) => {
//   var sql =
//     "INSERT INTO Customers(Personid,Personname,Personaddress,Personnum,Personevent) VALUES ('1','rk','bangalore','984500','birthday')";
//   db.query(sql, (err, result) => {
//     console.log("1 row inserted");
//   });
// });

//Show table
// db.connect((err) => {
//   var sql = "SELECT * from public";
//   db.query(sql, (err, result) => {
//     console.log("this is a table");
//   });
// });
