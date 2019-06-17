
var product_id = [];


function signupsajax() {
    fnameval();
    emailval();
    pswval();
    cpswval();
    phnval();
    if (member) {
        var data = {};
        data.uid = $('#uid').val();
        // Math.random().toString(36).replace(/[^1-9]+/g, '').substr(0, 9);
        //console.log(c);
        data.fname = $('#fname').val();
        data.phone = $('#phone').val();
        data.email = $('#email').val();
        data.password = $('#password').val();
        var url = '/signup',
            type = 'POST',
            dataType = 'json',
            page = 'signup';
        services(url, type, data, dataType, page);

    }
    else {
        $("#errdetails").html("Please Enter Valid Details");
    }

}
function isData(m) {
    var data = {};
    if (m == 'email') {
        data.email = $('#email').val();
    }
    else if (m == 'phone') {
        data.phone = $('#phone').val();
    }
    //data.email=$(m).val();
    //console.log(data.details);
    var url = '/isdata',
        type = 'POST',
        dataType = 'json',
        page = 'isdata';
    services(url, type, data, dataType, page);

}
function loginajax() {
    var data = {};
    data.email = $('#email').val();
    data.password = $('#password').val();
    var url = '/retrive',
        type = 'POST',
        dataType = 'json',
        page = 'login';
    services(url, type, data, dataType, page);
}
function isUser() {
    var userForIndex = JSON.parse(window.localStorage.getItem('userid'));
    var adminForIndex = JSON.parse(window.localStorage.getItem('adminid'));
    var CreatedUser = JSON.parse(window.localStorage.getItem('createdUser'));
    if (adminForIndex) {
        window.location.href = "/admin";
    }
    else if (userForIndex) {
        $('#logoutUserIndex').show();
        $('#loginUserIndex').hide();
        $('#login_UserIndex').hide();
        $('#logout_UserIndex').hide();
        $('#lblUser').html(userForIndex[0].fname);

    }
    else if (CreatedUser) {
        alert("Please Register again Your link is Expired");
        localStorage.removeItem('createdUser');
    }
    else {

        localStorage.removeItem('CartOficon');

    }
}
function loadFromDB(tblName, page) {
    var data = {};
    data.which = tblName;
    var url = '/loadFromDB',
        type = 'Get',
        dataType = 'json',
        page = page;
    services(url, type, data, dataType, page);
}

function loadFromDB1(tblName, id, page, ) {
    var data = {};
    data.id = id;
    data.table = tblName;
    var url = '/loadFromDB1',
        type = 'Get',
        dataType = 'json',
        page = page;
    services(url, type, data, dataType, page);
}
function filterPrice() {
    var data = {};
    $('#spanForFilter').html('');
    data.minval = $('#value-lower').html();
    data.maxval = $('#value-upper').html();
    debugger
    if (data.minval && data.maxval) {
        $('#spanForFilter').html('');
        var url = '/filterwithPrice',
            type = 'Get',
            dataType = 'json',
            page = 'getProducts';
        services(url, type, data, dataType, page);
    }
    else {
        $('#spanForFilter').html("Plese select Proper value");
    }
}
function generateID(name, fid, table) {
    data = {};
    data.id = 'id',
        data.table = table;
    $.ajax({
        url: '/genid',
        type: 'post',
        data: data,
        dataType: 'json',

        success: function (data1) {
            console.log('success', data1);
            idGen(data1);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('error', errorThrown);

        }
    });
    function idGen(lastID) {
        if (lastID == null) {
            var a = 1;
        }
        else {
            var a = lastID + 1;
        }
        var id = name + a;
        // Math.floor(Math.random() * 10) + 1;
        document.getElementById(fid).value = id;
        //$(fid).val(id);
        // Math.random().toString(36).replace(/[^1-9]+/g, '').substr(0, 9);
        //console.log(c);
    }
}
function filldata(m) {
    $("#s1").load('/pdtdtls');
    // var path=window.location.href.split('?');
    var id = m;
    console.log(id, 'smmmmmmm');
    var url = '/get/' + id,
        type = 'GET', data = '',
        dataType = 'json',
        page = 'productsViews';
    services(url, type, data, dataType, page);
}
function loginPageForUser(pageForwhat) {
    switch (pageForwhat) {
        case 'inout': {
            $('#logoutUserIndex').hide();
            $('#loginUserIndex').hide();
            $('#login_UserIndex').hide();
            $('#logout_UserIndex').show();
            $('#s1').load('/login')
            break;
        }

        case 'login': {
            $('#logoutUserIndex').hide();
            $('#loginUserIndex').hide();
            $('#login_UserIndex').hide();
            $('#logout_UserIndex').show();
            $('#s1').load('/login')
            break;
        }

        case 'signUp': {
            $('#logoutUserIndex').hide();
            $('#loginUserIndex').hide();
            $('#login_UserIndex').show();
            $('#logout_UserIndex').hide();
            $('#s1').load('/signup')
            break;
        }
    }

}
$('#seachItems').on('keyup', function (e) {
    var data = {};
    data.name = e.target.value;
    var url = '/search',
        type = 'GET',
        dataType = 'json';
    data = data,
        page = 'getProducts';

    services(url, type, data, dataType, page);
})
function getUserCartDetails(table, page) {
    debugger
    var jsondata = JSON.parse(window.localStorage.getItem('userid'));
    if (jsondata) {
        data = {};
        data.uid = jsondata[0].uid,
            data.page = table;
        var url = '/getUserAllDetails',
            type = 'get',
            data = data,
            dataType = 'json',
            page = page;
        services(url, type, data, dataType, page);
    }
}
function logoutUser() {
    // window.sessionStorage.removeItem('pageInfo');
    // window.sessionStorage.removeItem('userid');
    // window.localStorage.removeItem('GetUserCart');
    // window.localStorage.removeItem('CartOficon');
    window.sessionStorage.clear();
    window.localStorage.clear();
    window.location.href = "/logout";
}

function forgetPass(emailOrOtp) {
    var data = {};
    var page='';
    switch (emailOrOtp) {
        case 'email': {
            data.email = $('#emailInputForget').val();
            page='ForgetPass';
            data.emailOtp = emailOrOtp;
                services('/forgetPass', 'GET', data, 'json', page);
            break;
        }
        case 'otp': {
            debugger
            data.email = $('#emailForOtp').val();
            data.otp = $('#emailOtpText').val();
            page='ForgetOtp';
            data.emailOtp = emailOrOtp;
                services('/forgetPass', 'GET', data, 'json', page);
            break;
        }
        case 'NewPass': {
            debugger
            password = $('#newPassForget').val();
            cpassword = $('#cnewPassForget').val();
            $('#spngeneratePass').html('');
            if(password=='' || cpassword ==''){
                $('#spngeneratePass').html("Please Enter The password in Both");
            }
            else if(password == cpassword){
                debugger
                $('#spngeneratePass').html('');
                data.email = $('#emailForGen').val();
                data.password=password;
                page='ForgetGenPass';
                data.emailOtp = emailOrOtp;
                services('/forgetPass', 'GET', data, 'json', page);
                
            }
            else
            {
                $('#spngeneratePass').html("Passord Not matching");
            }
            break;
        }
    }
    
}