//First name validation
var member = true;
function fnameval() {
    var fName = $("#fname").val();
    var alphaExp = /^[a-zA-Z ]*$/;
    if (fName == "") {
        $("#errname").html("Please Enter Name Here! A-Z Only");
        member = false;
    }
    else if (!(fName.match(alphaExp))) {
        $("#errname").html("ENTER VALID NAME");
    }
    else {
        $("#errname").html("");
        member = true;
    }
}
//Email validation
function emailval() {

    var mailformat = /^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/;
    var mails = $("#email").val();
    if (mails == "") {
        $("#erremail").html("!Please Enter Emial Ex:example@gmail.com");
        $("#errdetails").html(" ");
        member = false;
    }
    if (!(mailformat.test(mails))) {
        $("#erremail").html("!Please valid Emial Ex:example@gmail.com");
        $("#errdetails").html(" ");
        member = false;
    }
    else {
        $("#errdetails").html(" ");
        $("#erremail").html(" ");
        member = true;

    }
}
//Password validation
function pswval() {
    var pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,32}$/;
    var pwd1 = $("#password").val();
    if (pwd1 == "") {
        $("#errpass").html("Please enter password");
        member = false;
    }
    if (!(pwd1.match(pattern))) {
        $("#errpass").html("!Password Should Having (Alphabets,Numbers,Special Characters)");
        member = false;
    }
    else {
        $("#errpass").html(" ");
        member = true;

    }
}
//Confirm paswwrord
function cpswval() {
    var pwd = $("#password").val();
    var cpwd = $("#cpassword").val();
    if (cpwd == "") {
        $("#errcpass").html("!Please Enter Confirm Password  ");
        member = false;

    }
    else if (pwd != cpwd) {
        $("#errcpass").html("!Password is  Not Matching  ");
        member = false;
    }
    else {
        $("#errcpass").html("");
        member = true;
    }
}
//Phone numkber Validation
function phnval() {
    var contact = $("#phone").val();
    var phoneno = /^\d{10,12}$/;
    if (contact == "") {
        $("#errphone").html("Please Enter Phone Numer with 10 Digits");
        member = false;
    }
    else if (!(contact.match(phoneno))) {
        $("#errphone").html("Please check valid Phone Numer with 10 Digits");
        member = false;

    } else {
        $("#errphone").html("");
        member = true;

    }
}