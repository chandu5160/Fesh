var mysql=require('mysql');

var con=mysql.createConnection({
    host:"localhost",
    user:"root",
    port:3307,
    password:"",
    database:"ecom"
});
con.connect(function(err){
    if(err) throw err;
    console.log("Connected to DB");
});

module.exports=con;

