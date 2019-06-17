//Shashank Funtions
function addCategory() {
    var data = {};
    data.cid = $('#cid').val()
    data.cname = $('#cname').val();
    if(data.cid && data.cname!=""){
    data.table = 'category';
    var url = '/ss',
        type = 'POST',
        dataType = 'json',
        page = 'dashboard';
    services(url, type, data, dataType, page);
    }
    else{
        $('#spanForAddCat').html("Please Enter valid Category Name.")
    }

}
function addbrand() {
    var data = {};
    data.bid = $('#bid').val()
    data.bname = $('#bname').val();
    data.cid = $('#pcategory').val();
    if(data.cid && data.bname!="" && data.bid){
    data.table = 'brand';
    var url = '/ss',
        type = 'POST',
        dataType = 'json',
        page = 'dashboard';
    services(url, type, data, dataType, page);
    }else{
        $('#spanForBrand').html("Please Enter Valid Details");
    }
}
// function addProduct() {
//     var data = {};
//     data.pid = $('#pid').val()
//     data.pname = $('#pname').val()
//     data.pprice = $('#pcost').val()
//     data.pdescription = $('#pdescription').val()
//     data.pquantity = $('#pquantity').val()
//     data.bid = $('#pbrand').val()


//     data.table = 'product';
//     var url = '/signup',
//         type = 'POST',
//         data = data,
//         dataType = 'json',
//         page = 'dashboard';
//     services(url, type, data, dataType, page);
// }
//shahsnk end

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
function deleteRow(tid, table) {
    var data = {};
    data.id = tid;
    data.table = table;
    var url = '/deleteRow',
        type = 'Get',
        dataType = 'json',
        page = 'deleteRowpage';
    services(url, type, data, dataType, page);
}
function edit(tid, table) {
    var page1 = '';
    switch (table) {
        case 'category': {
            $('#dashboard').load('/edtcat');
            page1 = 'editCategory';
            break;
        }
        case 'brand': {
            $('#dashboard').load('/edtbnd');
            page1 = 'editBrand';
            break;
        }
        case 'users': {
            $('#dashboard').load('/edtuser');
            page1 = 'editUsers';
            break;
        }
        case 'products': {
            $('#dashboard').load('/edtpdt');
            page1 = 'editProducts';
            break;
        }
    }
    var data = {};
    data.id = tid;
    data.table = table;

    var url = '/editRow',
        type = 'Get',
        dataType = 'json',
        page = page1;
    services(url, type, data, dataType, page);

}
function update(tableName) {
    var data = {};
    var page1 = '';
    switch (tableName) {
        case 'category': {
            data.cid = $('#cid').val();
            data.cname = $('#cname').val();
            page1 = 'updateCategory';
            break;
        }
        case 'brand': {
            data.bid = $('#bid').val();
            data.bname = $('#bname').val();
            data.cid = $('#pcategory').val();
            page1 = 'updateBrand';
            break;
        }
        case 'products': {
            data.pid = $('#pid').val();
            data.pname = $('#pname').val();
            data.pcost = $('#pcost').val();
            data.bid=$('#pbrand').val();
            data.pquantity=$('#pquantity').val();
            data.pdescription=$('#pdescription').val();
            page1 = 'updateProducts';
            break;
        }
    }

    data.table = tableName;
    var url = '/updateRow',
        type = 'post',
        dataType = 'json',
        page = page1;
    services(url, type, data, dataType, page);

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
// function searchFun(){
   
//         'use strict';
    
//         var LightTableFilter = (function(Arr) {
    
//             var _input;
    
//             function _onInputEvent(e) {
//                 _input = e.target;
//                 var tables = document.getElementsByClassName(_input.getAttribute('data-table'));
//                 Arr.forEach.call(tables, function(table) {
//                     Arr.forEach.call(table.tBodies, function(tbody) {
//                         Arr.forEach.call(tbody.rows, _filter);
//                     });
//                 });
//             }
    
//             function _filter(row) {
//                 var text = row.textContent.toLowerCase(), val = _input.value.toLowerCase();
//                 row.style.display = text.indexOf(val) === -1 ? 'none' : 'table-row';
//             }
    
//             return {
//                 init: function() {
//                     var inputs = document.getElementsByClassName('light-table-filter');
//                     Arr.forEach.call(inputs, function(input) {
//                         input.oninput = _onInputEvent;
//                     });
//                 }
//             };
//         })(Array.prototype);
    
//         document.addEventListener('readystatechange', function() {
//             if (document.readyState === 'complete') {
//                 LightTableFilter.init();
//             }
//         });
    
    
// }
function getCatBrand(UrlcatBrand,page) {

    var data = {};
    data.table=UrlcatBrand;
    data.cid = $('#pcategory').val();
    // alert(data.cid);
    var url = '/getCatBrand',
        type = 'GET',
        dataType = 'json';
        data = data,
        page = page;

    services(url, type, data, dataType, page);

}
function logoutUser() {
    window.sessionStorage.clear();
    window.localStorage.clear();
    window.location.href = "/logout";
}