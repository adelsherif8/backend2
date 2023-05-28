const express = require("express");
const app = express();
const path = require("path");
const port = 4000;
const weekend = function (req, res, next) {
  const today = new Date().getDay();
  const rightnow = new Date().getHours();
  const noworkdays = today == 0 || today == 6;
  const notworkhours = rightnow < 9 || rightnow > 17;
  if (noworkdays || notworkhours) {
    console.log("outside working hours come back later");
    res.send("Outside working hours. Please come back later.");
  } else {
    next();
  }
};
const mylogger = function (req, res, next) {
  console.log("another request recieved at" + Date.now());
  next();
};

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use("/img", express.static(path.join(__dirname, "views", "img")));
app.use(weekend);

app.use(mylogger);
app.get("/service", function (req, res) {
  res.render("service");
});
app.get("/index", function (req, res) {
  res.render("index");
});
app.get("/contact", function (req, res) {
  res.render("contact");
});

app.listen(port, function () {
  console.log(
    "The server is running, please open your browser at http://localhost:%s",
    port
  );
});
