//Reqiring all Supported Modules
var express = require("express");
var path = require("path");
var bcrypt = require("bcryptjs");
var multer = require('multer');
var nodemailer = require('nodemailer');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var router=express.Router();
var con=require('../database/db');
var path2 = [];
var i = 1;
var {
    NODE_ENV = 'development',
    sess_name = 'sid'
} = process.env;
var IN_PROD = NODE_ENV === 'prodcution'
router.use(session({
    name: sess_name,
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore({
        host: 'localhost',
        port: 3307,
        user: "root",
        password: "",
        database: "ecom"
    }),
    secret: 'oop! sorry it\'s a secret',
    cookie: {
        maxAge: 1000 * 60,
        sameSite: true,
        secure: IN_PROD
    }
}))
// //Redirectin  the Page If User is not Logined

function adminLogin(req, res, next) {
    if (!req.session.admin) {
        res.redirect('/')
    }
    else {
        next()
    }
}



//Displaying admin  Home page
router.get('/admin',adminLogin, function (req, res) {
     res.sendFile('./admin/dashboard.html', { "root": __dirname.substring(0, __dirname.indexOf("\\routes")) 
    });
 });
 //display Categories
 router.get('/viewcat', function (req, res) {
    res.sendFile('./admin/viewcategory.html', { "root": __dirname.substring(0, __dirname.indexOf("\\routes")) 
   });
});
//Display Brands
router.get('/viewbnd', function (req, res) {
    res.sendFile('./admin/viewBrand.html', { "root": __dirname.substring(0, __dirname.indexOf("\\routes")) 
   });
});
// Diplay Products 
router.get('/viewprd', function (req, res) {
    res.sendFile('./admin/viewproduct.html', { "root": __dirname.substring(0, __dirname.indexOf("\\routes")) 
   });
});
//Display Users
router.get('/viewusr', function (req, res) {
    res.sendFile('./admin/viewuser.html', { "root": __dirname.substring(0, __dirname.indexOf("\\routes")) 
   });
});
//Adding Categories
router.get('/addcat', function (req, res) {
    res.sendFile('./admin/addcategory.html', { "root": __dirname.substring(0, __dirname.indexOf("\\routes")) 
   });
});
//aAdd Brands
router.get('/addbnd', function (req, res) {
    res.sendFile('./admin/addBrand.html', { "root": __dirname.substring(0, __dirname.indexOf("\\routes")) 
   });
});
//Add products
router.get('/addpdt', function (req, res) {
    res.sendFile('./admin/addproduct.html', { "root": __dirname.substring(0, __dirname.indexOf("\\routes")) 
   });
});
//Edit Products
router.get('/edtpdt', function (req, res) {
    res.sendFile('./admin/editproduct.html', { "root": __dirname.substring(0, __dirname.indexOf("\\routes")) 
   });
});
//Edit Categoris
router.get('/edtcat', function (req, res) {
    res.sendFile('./admin/editcategory.html', { "root": __dirname.substring(0, __dirname.indexOf("\\routes")) 
   });
});
//Edit Brands
router.get('/edtbnd', function (req, res) {
    res.sendFile('./admin/editBrand.html', { "root": __dirname.substring(0, __dirname.indexOf("\\routes")) 
   });
});
//Edit Users
router.get('/edtuser', function (req, res) {
    res.sendFile('./admin/editUser.html', { "root": __dirname.substring(0, __dirname.indexOf("\\routes")) 
   });
});
//Function Calling Get Methods 
router.get('/editRow', function (req, res) {
    var data = req.query;
    var row = '';
    if (data.table == 'users') {
        row = 'uid';

    }
    else if (data.table == 'category') {
        row = 'cid';
        //var sql="SELECT b.bid,b.bname,c.cname,b.status FROM brand b INNER JOIN category c ON b.cid = c.cid"
    }
    else if (data.table == 'brand') {
        row = 'bid';
    }
    else if (data.table == 'products') {
        row = 'pid';
    }
    console.log(data.id);

    var sql = "Select * From " + data.table + " WHERE " + row + "='" + data.id + "'";
    //var sql = "DELETE FROM "+data.table+" WHERE "+row+" = '"+ data.id+"'";
    con.query(sql, function (err, row) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(row);
            console.log("Edit");
            res.json(row);
        }

    })
});
router.get('/deleteRow', function (req, res) {
    var data = req.query;
    var row = '';
    if (data.table == 'users') {
        row = 'uid';
    }
    else if (data.table == 'category') {
        row = 'cid';
    }
    else if (data.table == 'brand') {
        row = 'bid';
        // var sql="DELETE FROM `products` WHERE pid='"+data.id+"'";
    }
    else if (data.table == 'products') {
        row = 'pid';
        // var sql = "UPDATE " + data.table + " SET status=0 WHERE " + row + "='" + data.id + "'";
        // var sql="DELETE FROM `products` WHERE pid='"+data.id+"'";
    }
    console.log(data.id);
    var sql = "UPDATE " + data.table + " SET status=0 WHERE " + row + "='" + data.id + "'";
    //var sql = "DELETE FROM "+data.table+" WHERE "+row+" = '"+ data.id+"'";
    con.query(sql, function (err, row) {
        if (err) {
            console.log(err);
        } else {
            console.log(row);
            console.log("Deleted Success");
            res.json(data.table);
        }

    })
});
// Funtion  Calling Post Methods
router.post('/updateRow', function (req, res) {
    var data = req.body;
    console.log("This is Update Row Server ");
    var sql = '';
    if (data.table == 'users') {
        row = 'uid';
    }
    else if (data.table == 'category') {
        console.log("This is Category Table");

        sql += "UPDATE `category` SET `cname`='" + data.cname + "' WHERE cid='" + data.cid + "'";

    }
    else if (data.table == 'brand') {

        sql += "UPDATE brand SET bname='" + data.bname + "',cid='" + data.cid + "'  WHERE  bid='" + data.bid + "'";

    }
    else if (data.table == 'products') {

        sql += "UPDATE products SET pname='" + data.pname + "',bid='" + data.bid + "',pprice='" + data.pcost + "',pquantity='" + data.pquantity + "',pdescription='" + data.pdescription + "'  WHERE  pid='" + data.pid + "'";

    }
    con.query(sql, function (err, row) {
        if (err) {
            console.log(err);
        } else {
            // console.log(row);
            // console.log("Updated Success");
            res.json('Update');
        }
    })
});
router.post('/genid', function (req, res) {
    var data = req.body;

    if (data.id == 'id') {
        var sql = "SELECT id FROM " + data.table + " ORDER BY `id` DESC LIMIT 1"
        con.query(sql, function (err, row) {
            if (err) { return console.log(err); }
            if (row.length > 0) {
                res.json(row[0].id);
            }
        })
    }
});
//Upload Images Using Multer 
var storage = multer.diskStorage({
    destination: './public/images/uploads/',
    filename: function (req, file, cb) {
        var updatedpath = file.fieldname + '-' + i + Date.now() + path.extname(file.originalname);
        cb(null, updatedpath);
        var obj = '';
        obj = "images/uploads/" + updatedpath;
        path2.push(obj);
        i++;

    }
});

var upload = multer({
    storage: storage
}).fields([{ name: 'front', maxCount: 1 }, { name: 'lside', maxCount: 1 }, { name: 'rside', maxCount: 1 }, { name: 'back', maxCount: 1 }]);
router.post('/addpdtoo', function (req, res) {
    path2 = []; i = 1;
    upload(req, res, function (err) {
        console.log(req.body);
        // pb= ''+req.body.pbrand+''+req.body.pid;
        //console.log(pb);
        if (err) throw err;
        var sql = 'insert into products SET ?';
        var post = { pid: req.body.pid, pname: req.body.pname, pprice: req.body.pcost, pdescription: req.body.pdescription, pquantity: req.body.pquantity, pimg: path2[0], pimg1: path2[1], pimg2: path2[2], pimg3: path2[3], status: 1, bid: req.body.pbrand }
        con.query(sql, post, function (err, result) {
            if (err) throw err;
            console.log(" Table Data is  inserted product");
            return res.redirect('/admin');
        })
    })

})
router.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
        if (err) {
            return res.redirect('/')
        }
        res.clearCookie(sess_name);

        res.redirect('/');
    })
})

router.get('/logout1', function (req, res) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
      auth: {
        user: 'oak64426442@gmail.com',
        pass: 'Chandu@123'
      }
    });
    
    var mailOptions = {
      from: 'oak64426442@gmail.com',
      to: 'praveenbommu5@gmail.com',
      subject: 'Sending Email using Node.js',
      text: 'That was easy!',
      html:'<h1>Hi I am Praveen <h1>',
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
})

 module.exports=router;