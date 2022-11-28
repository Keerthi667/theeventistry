const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mysql = require("mysql");
const db = require("../database");
const validator = require("email-validator");
const flash = require("connect-flash");
const app = require("../app");
const greetings = "THANK YOU, for choosing theeventistry!";

// app.use(flash());

//get index page
router.get("/", function (req, res) {
  res.render("home");
});

//get thank you page
router.get("/thankyou", function (req, res) {
  res.render("thankyou");
});

//get events page
router.get("/events", function (req, res, next) {
  if (req.session.loggedinUser) {
    res.render("events", { user_Name: req.session.userName });
  } else {
    res.redirect("login");
  }
});

//get login page
router.get("/login", function (req, res) {
  res.render("login", { wrongInput: req.flash("errMsg") });
});

//get signin page
router.get("/signin", function (req, res) {
  res.render("signin", { userMsg: req.flash("msg") });
});

//get form page
router.get("/form", function (req, res) {
  res.render("form", {});
});

//POST LOGIN DATA
router.post("/login", function (req, res, next) {
  var userName = req.body.uname;
  var password = req.body.upassOne;

  var sql = "select * from users where name = ?";
  db.query(sql, [userName], function (err, result, fields) {
    if (result.length && bcrypt.compareSync(password, result[0].password)) {
      // console.log(result);
      req.session.loggedinUser = true;
      req.session.userName = userName;
      res.redirect("/events");
    } else {
      req.flash("errMsg", "Wrong username or password");
      res.redirect("login");
    }
  });
});

//POST REGISTER DATA TABLE
router.post("/signin", function (req, res, next) {
  var u_name = req.body.uname;
  var u_email = req.body.uemail;
  var u_phoneno = req.body.uphoneno;
  var password = req.body.upassOne;
  var u_passTwo = req.body.upassTwo;
  var hashOne = bcrypt.hashSync(password, 1);
  var hashTwo = bcrypt.hashSync(u_passTwo, 1);

  var sql = "SELECT * FROM users WHERE  name = ?";
  db.query(sql, [u_name], function (err, result, fields) {
    if (err) throw err;
    if (result.length > 0) {
      req.flash("msg", "Already registered");
      res.redirect("signin");
    } else if (
      u_name == "" ||
      u_phoneno == "" ||
      password == "" ||
      u_passTwo == "" ||
      u_phoneno.length < 10
    ) {
      res.redirect("signin");
    } else if (!validator.validate(u_email)) {
      req.flash("msg", "Check email again");
      res.redirect("signin");
    } else if (password != u_passTwo) {
      req.flash("msg", "Paswords didnt match");
      res.redirect("signin");
    } else if (password.length < 8) {
      req.flash("msg", "Password must be more than 8 characters");
      res.redirect("signin");
    } else {
      var sql = `insert into users(name,email,phoneno,password,confirmpass) values("${u_name}","${u_email}","${u_phoneno}","${hashOne}","${hashTwo}")`;
      db.query(sql, function (err, result, fields) {
        if (err) throw err;
        else {
          res.render("login");
        }
      });
    }
  });
});

//USEREVENTS TABLE

router.post("/form", function (req, res, next) {
  var event_Username = req.body.event_Username;
  var event_Useremail = req.body.event_Useremail;
  var event_Userphone = req.body.event_Userphone;
  var event_Useraddress = req.body.event_Useraddress;
  var event_Userevent = req.body.event_Userevent;
  var event_theme = req.body.theme;
  var event_date = req.body.date;
  var event_place = req.body.place;
  console.log(
    event_Username,
    event_Useremail,
    event_Userevent,
    event_theme,
    event_date
  );

  var sql = `insert into userevents(name,email,phoneno,address,event,theme,date,place) values("${event_Username}","${event_Useremail}","${event_Userphone}","${event_Useraddress}","${event_Userevent}","${event_theme}","${event_date}","${event_place}")`;
  db.query(sql, function (err, result, fields) {
    if (err) {
      throw err;
    } else {
      res.render("thankyou", { wish: greetings });
    }
  });
});

//logout session
router.get("/", function (req, res, next) {
  req.session.destroy();
  res.render("/");
});

module.exports = router;
