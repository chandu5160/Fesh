/*********Intializing*********/
var express = require("express");
var app = express();
var session = require('express-session');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var path = require("path");
var bcrypt = require("bcryptjs");
var nodemailer = require('nodemailer');
var router = express.Router();
var con = require('../database/db');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file
app.set('superSecret', config.secret); // secret variable

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
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'oak64426442@gmail.com',
        pass: 'Chandu@123'
    }
});



// //Redirectin  the Page If User is not Logined
function adminLogin(req, res, next) {
    if (!req.session.admin) {
        res.redirect('/')
    }
    else {
        next()
    }
}
function userLogin(req, res, next) {
    if (!req.session.userId) {
        res.redirect('/')
    }
    else {
        next()
    }
}
function redirectHome(req, res, next) {
    if (req.session.userId) {
        res.redirect('/')
    } else {
        next()
    }
}
//This is Home Page
router.get('/', function (req, res) {
    res.sendFile('./index.html', {
        "root": __dirname.substring(0, __dirname.indexOf("\\routes"))
    });
});
//For Login Page
router.get('/login', function (req, res) {
    res.sendFile('./login.html', {
        "root": __dirname.substring(0, __dirname.indexOf("\\routes"))
    });
});
//For RegistrationPage 
router.get('/signup', function (req, res) {
    res.sendFile('/signup.html', {
        "root": __dirname.substring(0, __dirname.indexOf("\\routes"))
    });
});
//Home page DashBoard Page
router.get('/home', function (req, res) {
    res.sendFile('/home.html', {
        "root": __dirname.substring(0, __dirname.indexOf("\\routes"))
    });
});
router.get('/forget', function (req, res) {
    res.sendFile('/forget.html', {
        "root": __dirname.substring(0, __dirname.indexOf("\\routes"))
    });
});
//is Data in Database Checking
router.post('/isdata', function (req, res) {
    var data = req.body;
    var val;
    if (data.email) {
        var sql = "select * from users where email = '" + data.email + "'";
        val = 'Email';
    }
    if (data.phone) {
        var sql = "select * from users where phone = " + data.phone;
        val = 'Phone';
    }
    con.query(sql, function (err, row) {
        if (err) {
            return console.log(err);
        }
        if (row.length > 0) {
            res.json(val + ' is Already Existed in Database Please Use Another!');
        }
    })

})
//Displaying Product Details
router.get('/pdtdtls', function (req, res) {
    res.sendFile('/product-detail.html', {
        "root": __dirname.substring(0, __dirname.indexOf("\\routes"))
    });
});
//Displaying Cart  Details
router.get('/cart', function (req, res) {
    res.sendFile('/cart.html', {
        "root": __dirname.substring(0, __dirname.indexOf("\\routes"))
    });
});
//Displaying Previous Orders
router.get('/previous', function (req, res) {
    res.sendFile('/prevorders.html', {
        "root": __dirname.substring(0, __dirname.indexOf("\\routes"))
    });
});
router.get('/home', function (req, res) {
    var img = "SELECT * FROM products,category "
    con.query(img, function (err, row) {
        if (err) {
            return console.log(err);
        }
        if (row.length > 0) {
            res.json(row);
        } else {
            res.json('0');
        }

    })
});
router.post('/ss', function (req, res) {

    var data = req.body;
    table = data.table;


    if (table == 'category') {
        var sql = "insert into category SET ?";
        var post = { cid: data.cid, cname: data.cname, status: 1 };
    }
    else if (table == 'brand') {
        var sql = "insert into brand SET ?";
        var post = { bid: data.bid, bname: data.bname, cid: data.cid, status: 1 };
    }

    con.query(sql, post, function (err, result) {
        if (err) throw err;
        res.json(data)
    })


});
router.post('/signup', function (req, res) {

    var data = req.body;
    var pass = data.password;
    bcrypt.genSalt(12, function (err, salt) {
        bcrypt.hash(pass, salt, function (err, hash) {
            if (err) throw err;
            pass = hash;
            const payload = {
                user: data.uid
            };
            var token = jwt.sign(payload, app.get('superSecret'), {

            });

            var sql = "insert into users SET ?";
            var post = { uid: data.uid, fname: data.fname, email: data.email, password: pass, phone: data.phone, token: token, status: 0 };
            con.query(sql, post, function (err, result) {
                if (err) { throw err; }
                else {
                    var mailOptions = {
                        from: 'oak64426442@gmail.com',
                        to: data.email,
                        subject: 'Sending Email From FasheEcom',
                        text: 'That was easy!',//<a href="localhost:8082/email:'+data.uid+'"></a><form action="https://localhost:8082/email:'+data.uid+'"><input type="submit" value="Active Account" /></form>
                        html: `<!DOCTYPE html>
                        <html lang="en">
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <meta http-equiv="X-UA-Compatible" content="ie=edge">
                            <title>Document</title>
                             <!-- Compiled and minified CSS -->
                             <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
                             <!-- Compiled and minified JavaScript -->
                             <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
                            <style>
                            .button { background-color: #4CAF50; /* Green */ border: none; color: white; padding: 16px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; -webkit-transition-duration: 0.4s; /* Safari */ transition-duration: 0.4s; cursor: pointer; }  .button1 { background-color: white; color: black; border: 2px solid #4CAF50; }
                            </style>      
                        </head>
                        <body>
                            <div class="container">
                            <H1>Welcome ${data.fname}</H1>
                            <center><H1>Fesh</H1></center>
                            <blockquote>
                                Fashion is a distinctive and often constant trend in the style in which people present themselves. With Trending collections.
                            </blockquote>
                            <p class="flow-text"><h3>Thank You.</h3><br>
                            For registering to your Favourite shopping website with more Trending and latest collections. <br>
                            In order to activate your account please click on given below button
                            </p><br>
                            <a href="http://localhost:8082/token:${token}"><button class="button button1">Activate</button></a>
                        </div>
                        </body>
                        </html>`





                        // '<h1>Hi I am '+data.fname+'</h1><br><h3>i am sending a mail for Confirmation Your acount is valid or not.</h3><a href="http://localhost:8082/email:'+data.uid+'" style="color:blue">Active Account</a><br><br><br><br><br><br><br><br><br><br><br><h2>Thanks&Regards,</h2><br><p>FasheEcom</p>'
                    };

                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });
                    res.json(data)
                }

            })
        })
    })

});
router.post('/retrive', function (req, res) {
    var data = req.body,
        email = data.email,
        psw = data.password;
    if (email == 'admin@admin.com' && psw == 'admin') {
        req.session.admin = 'admin';
        res.json('admin');
    }
    else {
        var loginData = "select * from users where email = '" + data.email + "' AND status=1";

        con.query(loginData, function (err, row) {
            if (err) {
                res.json('0');
                return console.log(err);
            }
            if (row.length > 0) {

                bcrypt.compare(psw, row[0].password, function (err, isMatch) {
                    if (err) throw err;
                    if (isMatch) {
                        req.session.userId = row[0].uid;
                        res.json(row);
                        console.log("Login Success ");
                    }
                    else {
                        console.log("Invalid password");
                        console.log('0')
                        res.json('0');
                    }
                })

                //console.log(row)
            } else {
                console.log("Invalid Email");
                res.json('0');

            }
            //console.log(row)
        })
    }
    con.query("SELECT * FROM users", function (err, result) {
        if (err) {
            res.json('0');
            return console.log(err);
        }
        else {
            for (i = 0; i < result.length; i++) {
                if (result[i].status == 0) {
                    date_now = new Date(result[i].updateTime);
                    console.log("This is Date For the User", date_now);
                    date_future = new Date();
                    seconds = Math.floor((date_future - (date_now)) / 1000);
                    minutes = Math.floor(seconds / 60);
                    hours = Math.floor(minutes / 60);
                    days = Math.floor(hours / 24);

                    hours = hours - (days * 24);
                    minutes = minutes - (days * 24 * 60) - (hours * 60);
                    seconds = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);
                    console.log("Hours", hours, "Minutes", minutes, "seconds", seconds)
                    if (hours > 0 || minutes > 20) {
                        con.query("DELETE FROM `users` WHERE uid='" + result[i].uid + "'", function (err, row) {
                            if (err) {
                                //res.json('0');
                                return console.log(err);
                            }
                            else {
                                console.log("This is Deleterd Success_Fully ");
                            }
                        })
                    }

                }
            }
        }

    })

})

router.get('/loadFromDB', function (req, res) {
    var dbtable = req.query.which;
    switch (dbtable) {
        case 'category': {
            var sql = "SELECT * FROM " + dbtable + " WHERE status=1";
            break;
        }
        case 'brand': {
            var sql = "SELECT b.bid,b.bname,c.cname,b.status FROM brand b INNER JOIN category c ON b.cid = c.cid";
            break;
        }
        case 'users': {
            var sql = "SELECT * FROM " + dbtable + " WHERE status=1";
            break;
        }
        case 'products': {
            var sql = "SELECT p.pid,p.pimg,p.pname,p.pprice,p.pdescription,p.pquantity,b.bname,p.bid FROM products p INNER JOIN brand b ON b.bid = p.bid AND p.status=1 AND pquantity>0 ORDER by p.pprice DESC ";
            break;
        }
        case 'productsUser':
            {
                var sql = "SELECT * FROM products WHERE status=1 AND pquantity>0 order by pprice desc";
                break;
            }
        case 'categoryUser':
            {
                //var sql="SELECT c.cname,b.bname,b.bid,c.cid FROM category c,`brand` b WHERE c.cid=b.cid AND b.status=1"
                //var sql="SELECT * FROM category WHERE status=1";
                var sql = "SELECT b.cid,b.bid,c.cname,b.bname FROM category c,`brand` b WHERE c.cid=b.cid AND b.status=1";
                break;
            }
        case 'getCatBrand':
            {
                var sql = "SELECT c.cname,b.bname FROM category c,`brand` b WHERE c.cid=b.cid AND b.status=1";
                break;
            }
    }
    // var sql="SELECT * FROM " + dbtable + " WHERE status=1;"
    con.query(sql, function (err, row) {
        if (err) {
            throw err;
        } else {
            res.json(row);
        }
    })
});

router.get('/loadFromDB1', function (req, res) {
    var dbid = req.query.id;
    var sql = "SELECT * FROM `products` WHERE bid='" + dbid + "' AND status=1 ORDER BY `pprice` DESC ";
    con.query(sql, function (err, row) {
        if (err) {
            throw err;
        } else {
            res.json(row);
        }
    })
});
router.get('/filterwithPrice', function (req, res) {
    var min = req.query.minval;
    var max = req.query.maxval;
    var sql = " SELECT * FROM `products` WHERE status=1 and pprice BETWEEN " + min + " and " + max + " ORDER BY pprice DESC";
    con.query(sql, function (err, row) {
        if (err) {
            throw err;
        } else {
            res.json(row);
        }
    })
});

router.get('/getCatBrand', function (req, res) {
    var data = req.query;
    var sql;
    switch (data.table) {
        case 'category': {
            sql = "select * from category ;"
            break;
        }
        case 'brand': {
            sql = "select * from brand where cid='" + data.cid + "' "
            break;
        }
    }

    con.query(sql, function (err, row) {
        if (err) {
            return console.log(err);
        }
        if (row.length > 0) {
            res.json(row);
        } else {
            res.json('0');
        }

    })
})

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



//////////Cart Functionalities
//Delete cart Data Using User_id
router.get('/deleteCartDettails', function (req, res) {
    var data = req.query;
    var uid = data.uid;
    switch (data.page) {
        case 'DeleteCart': {
            var sql = "DELETE FROM `cart` WHERE uid='" + uid + "' AND export=0";
            break;
        }

    }
    con.query(sql, function (err, row) {
        if (err) {
        } else {
            res.json(data.table);
        }

    })
});
//Proceed To Pay
// router.post('/addcartUser', function (req, res) {
//     var d = req.body;

//     var sql = "INSERT INTO `cart`  SET?";
//     // var post="uid:'"+d.uid+"',pid:'"+d.pid+"', no_of_items:'"+d.no_of_items+"', total:'"+d.total+"', export:"+0+", date:'"+d.date+"',";
//     var post = { uid: d.uid, pid: d.pid, no_of_items: d.no_of_items, total: d.total, export: 0, date: d.date, status: 1 }
//     con.query(sql, post, function (err, result) {
//         if (err) throw err;
//     })


// })
//This is For Product -Details Displaying
router.get('/get/:id', function (req, res) {
    var sql = " SELECT * FROM products p, brand b,category c WHERE p.bid=b.bid AND c.cid=b.cid AND pid='" + req.params.id + "' ";

    con.query(sql, function (err, row) {
        if (err) throw err
        res.json(row);
    })
})
router.get('/token:id', function (req, res) {
    console.log("Email Sending Data");
    console.log(req.url);
    var data = req.url;
    var a = data.split(':');
    console.log(a[1]);
    con.query("SELECT * FROM users where token='" + a[1] + "'", function (err, row) {
        if (err) throw err;
        else if (row[0] != null) {
            console.log("row > 0 ", row);
            var sql = "UPDATE users SET status=1,token='' where token='" + a[1] + "'";

            con.query(sql, function (err, result) {
                if (err) throw err;
                res.redirect("/");
            })
        }
        else {
            console.log("Row of data is ", row);
            res.send(`<script>
            localStorage.setItem('createdUser',JSON.stringify('Praveen'));
            window.location.href="/";
            </script>`);
        }

    })
    // verifies secret and checks exp
    // jwt.verify(a[1], app.get('superSecret'), function(err, decoded) {if (err) {
    //     return res.json({ success: false, message: 'Failed to authenticate token.' });       } else {
    //     // if everything is good, save to request for use in other routes
    //     req.decoded = decoded;         next();
    //   }
    // })

})



//Getting User Details For Cart And preveicous Orders

router.get('/getUserAllDetails', function (req, res) {
    var data = req.query;
    switch (data.page) {
        case 'cart': {
            var sql = "SELECT * FROM `cart` WHERE uid='" + data.uid + "'";
            break;
        }
        case 'prevOrders': {
            var sql = "SELECT * FROM prevorders where uid='" + data.uid + "'";
            break;
        }
    }
    con.query(sql, function (err, row) {
        if (err) throw err;
        res.json(row);
    })
})

router.get('/search', function (req, res) {
    var sql = " SELECT * FROM products p, brand b,category c WHERE (p.bid=b.bid AND c.cid=b.cid) AND (p.pname LIKE '" + req.query.name + "%' OR b.bname LIKE '" + req.query.name + "%' OR c.cname LIKE '" + req.query.name + "%' )";
    con.query(sql, function (err, row) {
        if (err) throw err
        res.json(row);
    })
})

router.post('/cartdata', function (req, res) {
    var d1 = Object.keys(req.body);
    var d = JSON.parse(d1);
    var uid = d[d.length - 1].uid;
    var sql1 = "DELETE FROM `cart` WHERE uid='" + uid + "' ";
    con.query(sql1, function (err, result) {
        if (err) throw err;
    })

    for (i = 0; i < d.length - 1; i++) {
        var sql = "insert into cart SET ?";
        var post = { uid: uid, pname: d[i].pname, pid: d[i].pid, pimg: d[i].pimg, pquantity: d[i].pquantity, pprice: d[i].pprice }
        con.query(sql, post, function (err, result) {
            if (err) throw err;
        })
    }

})


//Proceed To Pay
router.post('/propay1', function (req, res) {

    var d1 = Object.keys(req.body);
    var d = JSON.parse(d1);
    var uid = d[d.length - 1].uid;
    var sql1 = "DELETE FROM `cart` WHERE uid='" + uid + "' ";
    con.query(sql1, function (err, result) {
        if (err) throw err;
    })
    for (i = 0; i < d.length - 1; i++) {
        var sql2 = "SELECT  pquantity FROM products WHERE pid= '" + d[i].pid + "'";
        var quanData = d[i].pquantity;
        var idForP = d[i].pid;
        con.query(sql2, function (err, result1) {
            if (err) throw err;
            var pqu = result1[0].pquantity - quanData;
            var sql2 = "UPDATE `products` SET pquantity=" + pqu + " WHERE pid='" + idForP + "' ";
            con.query(sql2, function (err, result) {
                if (err) throw err;
            })

        })

        var sql = "insert into prevorders SET ?";
        var post = { uid: uid, pid: d[i].pid, pname: d[i].pname, pimg: d[i].pimg, pquantity: d[i].pquantity, pprice: d[i].pprice }
        con.query(sql, post, function (err, result) {
            if (err) throw err;
        })
    }
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
router.get('/forgetPass', function (req, result) {
    var data = req.query;
    console.log("The Data Of forgetPass Is",data);
    switch (data.emailOtp) {
        case 'email': {
            console.log("Your  Email is:", data.email);
            var RandomOtp = Math.floor(100000 + Math.random() * 900000);
            sql = "UPDATE users SET token='" + RandomOtp + "' WHERE email='" + data.email + "'";
            con.query(sql, function (err, row) {
                if (err) throw err;
                console.log("This is For forget:", row.changedRows);
                if (row.changedRows > 0) {
                    result.json(data.email);
                    var mailOptions = {
                        from: 'oak64426442@gmail.com',
                        to: data.email,
                        subject: 'Your Otp is From Fashe-Ecom',
                        text: 'That was easy!',//<a href="localhost:8082/email:'+data.uid+'"></a><form action="https://localhost:8082/email:'+data.uid+'"><input type="submit" value="Active Account" /></form>
                        html: `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta http-equiv="X-UA-Compatible" content="ie=edge">
                    <title>Document</title>
                     <!-- Compiled and minified CSS -->
                     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
                     <!-- Compiled and minified JavaScript -->
                     <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
                    <style>
                    .button { background-color: #4CAF50; /* Green */ border: none; color: white; padding: 16px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; -webkit-transition-duration: 0.4s; /* Safari */ transition-duration: 0.4s; cursor: pointer; }  .button1 { background-color: white; color: black; border: 2px solid #4CAF50; }
                    </style>      
                </head>
                <body>
                    <div class="container">
                    <H1>Welcome ${data.email}</H1>
                    <center><H1>Fesh</H1></center>
                    <blockquote>
                        Fashion is a distinctive and often constant trend in the style in which people present themselves. With Trending collections.
                    </blockquote>
                    <h3>Your Otp is:</h3><br> <p class="flow-text" id="otpForEmail">
                    ${RandomOtp}
                    </p><br>
                </div>
                </body>
                </html>`
                        // '<h1>Hi I am '+data.fname+'</h1><br><h3>i am sending a mail for Confirmation Your acount is valid or not.</h3><a href="http://localhost:8082/email:'+data.uid+'" style="color:blue">Active Account</a><br><br><br><br><br><br><br><br><br><br><br><h2>Thanks&Regards,</h2><br><p>FasheEcom</p>'
                    };
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });
                } else {
                    result.json("invalidEmail");
                }

            })
            break;
        }
        case 'otp': {
            sql = sql = "UPDATE users SET token=''  WHERE email='" + data.email + "' AND token='" + data.otp + "'";
            con.query(sql, function (err, row) {
                if (err) throw err;
                console.log("This is For forget:", row.changedRows);
                if (row.changedRows > 0) {
                    result.json(data.email)
                }
                else {
                    result.json('InvalidOtp');
                }
            })
            break;
        }
        case 'NewPass': {
            var res1='';
            bcrypt.genSalt(12, function (err, salt) {
                bcrypt.hash(data.password, salt, function (err, hash) {
                    if (err) throw err;
                    pass = hash;
                    sql = sql = "UPDATE users SET  password='" + pass + "'  WHERE email='" + data.email + "' ";
                    con.query(sql, function (err, row) {
                        if (err) throw err;
                        console.log("This is Passweord changed:", row.changedRows);
                        if (row.changedRows > 0) {
                            //result.json(data.email)
                            res1=data.email;
                        }
                        else {
                            //result.json('InvalidPassword');
                            res1='InvalidPassword';
                        }
                    })
                })
            })
            result.json(res1);
            console.log('Res1',res1);
            break;

        }
    }






})


module.exports = router;