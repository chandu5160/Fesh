/*********Intializing*********/
var express = require("express");
var app = express();
var bodyparser = require("body-parser");
//var doc = new jsPDF();
app.use(express.static(__dirname + '/public'));
app.use(bodyparser.urlencoded({ extended: false }));
//Require Roots
var adminRoute=require('./routes/adminRoutes');
var userRoute=require('./routes/userRoutes');
//Redirectin  the Page If User is not Logined

app.use(adminRoute);
app.use(userRoute);
app.listen(8082, function (req, res) {
    console.log("Server is Listening");
});