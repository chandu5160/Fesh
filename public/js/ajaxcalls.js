
//All Ajax Calls
function services(url, type, data, dataType, page) {
    $.ajax({
        url: url,
        type: type,
        data: data,
        dataType: dataType,

        success: function (data1) {
            console.log('success', data1);
            success_data(data1, page);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('error', errorThrown);

        }
    });
}


//Ajax Call Success funtion
function success_data(success_data, page) {
    debugger
    switch (page) {
        case 'signup': {
            console.log('success', success_data);
            //swal(success_data[0].uid, "Data Inserted SuccessFully!", "success");
            alert("Send Email To " + success_data.uid+"For Confirmation" );
            $('#s1').load('/login');
            break;
        }
        case 'login': {
            console.log('success', success_data);
            if (success_data == 'admin') {
                console.log('Admin Page Opened');
                window.localStorage.setItem('adminid', JSON.stringify(success_data));
                isUser();
                window.location.href = "/admin";
            }
            else if (success_data == '0') {
                $('#errdetails').html("Invalid Email (or) Password");
            }
            else if (sessionStorage.getItem('pageInfo')) {
                window.localStorage.setItem('userid', JSON.stringify(success_data));
                console.log('success', success_data[0].fname);
                isUser();
                window.location.href = "/";
                // window.sessionStorage.removeItem('pageInfo');
                // cartDetailsUser();
                // $('#s1').load('/cart');
            }
            else {
                window.localStorage.setItem('userid', JSON.stringify(success_data));
                console.log('success', success_data[0].fname);
                $('#s1').load('/home');
                isUser();
                loadFromDB('categoryUser', 'getCategory');
                loadFromDB('productsUser', 'getProducts');
                getUserCartDetails('cart','getUsercartDetails');
               
                
            }
            //window.location.href = "/" ;
          
            break;
        }
        case 'isdata': {
            console.log('success', success_data);
            $('#errdetails').html(success_data);

            break;
        }
        case 'dashboard': {
            console.log('Admin Page Opened');
            window.location.href = "/admin";
            break;
        }
        case 'brand': {
            if (success_data != "") {

                var options = '<option value="null">Choose an option</option>';
                $.each(success_data, function (i, value) {
                    console.log(value);
                    options += "<option value='" + value.bid + "'>" + value.bname + "</option>";
                });
                option = options;
                $('#pbrand').html(options);
            }
            break;
        }
        case 'category1': {
            if (success_data != "") {
                var options = '<option value="null">Choose an option</option>';
                $.each(success_data, function (i, value) {
                    console.log(value);
                    options += "<option value='" + value.cid + "'>" + value.cname + "</option>";
                });
                option = options;
                $('#pcategory').html(options);
            }
            break;
        }
        case 'editCategory': {
            console.log(success_data);
            $("#cid").val(success_data[0].cid);
            $("#cname").val(success_data[0].cname);
            break;
        }
        case 'editBrand': {
            console.log(success_data);
            $("#bid").val(success_data[0].bid);
            $("#bname").val(success_data[0].bname);
            ////remove selected one
            getCatBrand("category","category1");
            $('option:selected', 'select[id="pcategory"]').removeAttr('selected');
            //Using the value//select[id="pcategory"]
            $('#pcategory').find('option[value="' + success_data[0].cid + '"]').attr("selected", true);
            break;
        }
        case 'editProducts': {
            console.log(success_data);
            $("#pid").val(success_data[0].pid);
            $("#pname").val(success_data[0].pname);
            $("#pcost").val(success_data[0].pprice);
            $("#pquantity").val(success_data[0].pquantity);
            $("#pdescription").val(success_data[0].pdescription);
            $('#pimg').attr('src', success_data[0].pimg);
            $('#pimg1').attr('src', success_data[0].pimg1);
            $('#pimg2').attr('src', success_data[0].pimg2);
            $('#pimg3').attr('src', success_data[0].pimg3);



            break;
        }
        case 'editUsers': {
            console.log(success_data);
            $("#bid").val(success_data[0].bid);
            $("#bname").val(success_data[0].bname);
            break;
        }
        case 'loadCategoryDB': {
            var tr = ' ';
            var tbl = 'category';
            debugger;
            $.each(success_data, function (i, value) {
                //cls="grade"+String.fromCharCode(k);
                tr += '<tr class="gradeX" role="row"><td class="sorting_1">' + value.cid + '</td><td>' + value.cname + '</td><td>' + value.status + '</td><td class="center"><input type="button" class="  bg1 bo-rad-23 hov1 m-text3 trans-0-4" value="edit" onclick=edit("' + value.cid + '","' + tbl + '")>&nbsp<input type="button" class="  bg1 bo-rad-23 hov1 m-text3 trans-0-4" value="delete" onclick=deleteRow("' + value.cid + '","' + tbl + '")></td></tr>';
            });
            $('#dataTables-example_category tbody').html(tr);
            break;
        }
        case 'loadUserDB': {
            var tr = ' ';
            var tbl = 'users';

            $.each(success_data, function (i, value) {
                //cls="grade"+String.fromCharCode(k);
                tr += '<tr class="gradeX" role="row"><td class="sorting_1">' + value.uid + '</td><td>' + value.fname + '</td><td>' + value.email + '</td><td>' + value.phone + '</td><td class="center"><input type="button" class="  bg1 bo-rad-23 hov1 m-text3 trans-0-4" value="edit" onclick=edit("' + value.uid + '","' + tbl + '")>&nbsp<input type="button" class="  bg1 bo-rad-23 hov1 m-text3 trans-0-4" value="delete" onclick=deleteRow("' + value.uid + '","' + tbl + '")></td></tr>';
            });
            $('#dataTables-example_users tbody').html(tr);
            break;
        }
        case 'loadBrandDB': {
            var tr = ' ';
            var tbl = 'brand';
            debugger;
            $.each(success_data, function (i, value) {
                //cls="grade"+String.fromCharCode(k);
                tr += '<tr class="gradeX" role="row"><td class="sorting_1">' + value.bid + '</td><td>' + value.bname + '</td><td>' + value.cname + '</td><td>' + value.status + '</td><td class="center"><input type="button" class="  bg1 bo-rad-23 hov1 m-text3 trans-0-4" value="edit" onclick=edit("' + value.bid + '","' + tbl + '");getCatBrand("category","category1");>&nbsp<input type="button" class="  bg1 bo-rad-23 hov1 m-text3 trans-0-4" value="delete" onclick=deleteRow("' + value.bid + '","' + tbl + '")></td></tr>';
            });
            $('#dataTables-example_brand tbody').html(tr);
            break;
        }
        case 'loadProductsDB': {
            var tr = ' ';
            var tbl = 'products';
            debugger;
            $.each(success_data, function (i, value) {
                //cls="grade"+String.fromCharCode(k);/uploads/front-1550733565127.jpg///' + value.pimg + 'images/uploads/front-1550733565127.jpg
                tr += '<tr class="gradeX" role="row"><td class="sorting_1"><img src="' + value.pimg + '" alt="" border=3 height=50 width=50></img></td><td>' + value.pname + '</td><td>' + value.pprice + '</td><td>' + value.pdescription + '</td><td>' + value.pquantity + '</td><td>' + value.bname + '</td><td class="center"><input type="button" class="  bg1 bo-rad-23 hov1 m-text3 trans-0-4" value="edit" onclick=edit("' + value.pid + '","' + tbl + '");getCatBrand("category","category1");getCatBrand("brand","brand");>&nbsp<input type="button" class="  bg1 bo-rad-23 hov1 m-text3 trans-0-4" value="delete" onclick=deleteRow("' + value.pid + '","' + tbl + '")></td></tr>';
            });
            $('#dataTables-example_products tbody').html(tr);
            break;
        }
        case 'deleteRowpage': {
            if (success_data == 'users') {
                //swal( "User Deleted Successfully!", "success");
                alert(' User Deleted Successfully');
                window.location.href = "/admin";
                $('#dashboard').load('/viewusr');
                loadFromDB('users', 'loadUserDB');

            }
            else if (success_data == 'category') {
                // swal( "Category Deleted Successfully!", "success");
                alert(' Category Deleted Successfully');
                window.location.href = "/admin";
                $('#dashboard').load('/viewcat');
                loadFromDB('category', 'loadCategoryDB');

            }
            else if (success_data == 'brand') {
                // swal( "Brand Deleted Successfully!", "success");
                alert('Brand Deleted Successfully');
                window.location.href = "/admin";
                $('#dashboard').load('/viewbnd');
                loadFromDB('brand', 'loadBrandDB');

            }
            else if (success_data == 'products') {
                // swal( "Brand Deleted Successfully!", "success");
                alert('Brand Deleted Successfully');
                window.location.href = "/admin";
                $('#dashboard').load('/viewprd');
                loadFromDB('products', 'loadProductsDB');

            }
            break;
        }
        case 'updateCategory': {
            alert(' Category Updated Successfully');
            window.location.href = "/admin";
            $('#dashboard').load('/viewcat');
            loadFromDB('category', 'loadCategoryDB');

        }
        case 'updateBrand': {
            alert('Brand Updated Successfully');
            window.location.href = "/admin";
            $('#dashboard').load('/viewbnd');
            loadFromDB('brand', 'loadBrandDB');
        }
        case 'updateProducts': {
            alert('Products Updated Successfully');
            window.location.href = "/admin";
            $('#dashboard').load('/viewbnd');
            loadFromDB('products', 'loadProductsDB');
        }

        case 'getProducts': {
            var htmls = '';
            var pname = '';
            $.each(success_data, function (i, value) {
                pname = value.pname.replace(/ /g, "_");
                // htmls += '<div class="col-sm-12 col-md-6 col-lg-4 p-b-50"><div class="block2"><div class="block2-img wrap-pic-w of-hidden pos-relative block2-labelnew"><img src="' + value.pimg + '" alt="IMG-PRODUCT"><div class="block2-overlay trans-0-4"><a href="#" class="block2-btn-addwishlist hov-pointer trans-0-4"><i class="icon-wishlist icon_heart_alt" aria-hidden="true"></i><i class="icon-wishlist icon_heart dis-none" aria-hidden="true"></i></a><div class="block2-btn-addcart w-size1 trans-0-4"><button class="flex-c-m size1 bg4 bo-rad-23 hov1 s-text1 trans-0-4" onclick="addcartforUser()">Add to Cart</button></div></div></div><div class="block2-txt p-t-20"><a href="product-detail.html" class=" dis-block s-text3 p-b-5 m-text15 ">' + value.pname + '</a><span class="block2-price m-text6 p-r-5"><b>&#x20b9</b>' + value.pprice + '</span></div></div></div>';
                htmls += '<div class="col-sm-12 col-md-6 col-lg-4 p-b-50"><div class="block2"><div class="block2-img wrap-pic-w of-hidden pos-relative"><img src="' + value.pimg + '" alt="IMG-PRODUCT"><div class="block2-overlay trans-0-4"><a href="#" class="block2-btn-addwishlist hov-pointer trans-0-4"><i class="icon-wishlist icon_heart_alt" aria-hidden="true"></i><i class="icon-wishlist icon_heart dis-none" aria-hidden="true"></i></a><div class="block2-btn-addcart w-size1 trans-0-4"><!-- Button --><button class="flex-c-m size1 bg4 bo-rad-23 hov1 s-text1 trans-0-4" onclick=addcartforUser("' + value.pid + '","' + value.pimg + '","' + value.pprice + '","' + pname + '")>Add to Cart</button></div></div></div><div class="block2-txt p-t-20"><a href="#" onclick=filldata("' + value.pid + '"); class="block2-name dis-block s-text3 p-b-5">' + value.pname + '</a><span class="block2-price m-text6 p-r-5"><b>&#x20b9</b>' + value.pprice + '</span></div></div></div>'
            })
            //   htmls +="<script type='text/javascript'>$('.block2-btn-addcart').each(function () {var nameProduct = $(this).parent().parent().parent().find('.block2-name').html();$(this).on('click', function () {swal(nameProduct, 'is added to cart !', success');});});$('.block2-btn-addwishlist').each(function () {var nameProduct = $(this).parent().parent().parent().find('.block2-name').html();$(this).on('click', function () {swal(nameProduct, 'is added to wishlist !', 'success');});});</script>"
            // funforPrice();
            $('#items').html(htmls);
            $('#value-lower').html("");
            $('#value-upper').html("");
            var minval = success_data[success_data.length - 1].pprice;
            var maxval = success_data[0].pprice;
            $('#value-lower').html(minval);
            $('#value-upper').html(maxval);
            funforPrice();


            break;
        }
        case 'getCategory': {//Write Html Code For The Bellow Code  Thanku
            var htmls = '';
            var dt = [];
            var obj = success_data;
            console.log(obj);
            for (i = 0; i < obj.length; i++) {
                dt.push(obj[i].cname)
            }
            dt = dt.filter(function (item, index, inputArray) {
                return inputArray.indexOf(item) == index;
            });
            for (i = 0; i < dt.length; i++) {
                var category = dt[i];
                htmls += "<li><a href='#'>" + dt[i] + "</a><ul class='sub_menu'>";
                for (j = 0; j < obj.length; j++) {
                    if (obj[j].cname == dt[i]) {
                        htmls += '<li><a href="#" onclick=loadFromDB1("products","' + obj[j].bid + '","getProducts");>' + obj[j].bname + '</a></li>';
                    }
                }
                htmls += '</ul></li>';
            }
            $('#sideCategories').html(htmls);
            break;
        }
        case 'productsViews': {
            var pname = success_data[0].pname.replace(/ /g, "_");
            $('#1').html('<img src="' + success_data[0].pimg + '" height="80%" width="80%" >');
            $('#2').html('<img src="' + success_data[0].pimg3 + '" height="80%" width="80%">');
            $('#3').html('<img src="' + success_data[0].pimg2 + '" height="80%" width="80%">');
            $("#productdescription").html(success_data[0].pdescription);
            $("#productName").html(success_data[0].pname);
            $("#productprice").html(success_data[0].pprice);
            $("#b1").html(success_data[0].bname);
            $("#c1").html(success_data[0].cname);
            $('#prd123').html(`<button class="flex-c-m sizefull bg1 bo-rad-23 hov1 s-text1 trans-0-4" 
            onclick=addcartforUser('${success_data[0].pid}','${success_data[0].pimg}','${success_data[0].pprice}','${pname}')>
             Add to Cart</button>`);
             $('#prd1234').html(`<button class="flex-c-m sizefull bg1 bo-rad-23 hov1 s-text1 trans-0-4" 
             onclick="addcartforUser('${success_data[0].pid}','${success_data[0].pimg}','${success_data[0].pprice}','${pname}');$('#s1').load('/cart');">
              Buy Now</button>`);
            console.log("success545498525852", success_data)
            break;
        }
        case 'getUsercartDetails': {
            debugger
            console.log('This is The Get User cart Details');
            console.log(success_data);
            localStorage.setItem('GetUserCart', JSON.stringify(success_data));
            cartMerge();
        }
        case 'preord': {
            var htmls = '';

            for (i = 0; i < success_data.length; i++) {
                htmls += `<tr class="table-row">
                            <td class="column-1">
                                 <div class="cart-img-product b-rad-4 o-f-hidden">
                                   <img src="${success_data[i].pimg}" alt="IMG-PRODUCT">
                                </div>
                             </td>
                             <td class="column-2">${success_data[i].pname}</td>
                             <td class="column-3">${success_data[i].pprice}</td>
                             <td class="column-4">
                                 <div class="flex-w t-center of-hidden w-size17">
              

                                    <input class="size m-text18 t-center  num-product" type="number" name="num-product1" value="${success_data[i].pquantity}" disabled>

              
                                 </div>
                            </td>
                            <td class="column-5">${success_data[i].date}</td>
                            </tr>`

            }
            $('#previousorderDetails').html(htmls);
        }
        case  'ForgetPass':{
            if(success_data=="invalidEmail"){
                $('#spnForgetEmail').html("!Invalid Email Id. ");
            }
            else {
                console.log("success_data:",success_data);
                $('#1').hide();$('#2').show();
                $('#emailForOtp').val(success_data);
                //$('#2').hide();$('#1').hide();$('#3').show();
            }
           
            break;
        }
        case 'ForgetOtp':{
            if(success_data=="InvalidOtp"){
                $('#spnForgetOtp').html("!Invalid Otp. ");
            }
            else{
                debugger
                $('#emailForGen').val(success_data);
                $('#2').hide();$('#1').hide();$('#3').show();
            }
            break;
        }
        case 'ForgetGenPass':{
            if(success_data=="InvalidPassword"){
                $('#spngeneratePass').html("!oops Somthing Went Wrong ");
            }
            else{
                alert("Your PassWord Successfully Changed.");
                window.location.href="/";
            }
            break;
        }
    }

}
function funforPrice(minval, maxval) {
    var filterBar = document.getElementById('filter-bar');
    minval = parseInt(document.getElementById('value-lower').innerHTML);
    //alert("min value is"+minval);
    maxval = parseInt(document.getElementById('value-upper').innerHTML);
    //alert("max value is"+maxval);
    noUiSlider.create(filterBar, {
        start: [minval, maxval],
        connect: true,
        range: {
            'min': minval,
            'max': maxval
        }
    });

    var skipValues = [
        document.getElementById('value-lower'),
        document.getElementById('value-upper')
    ];

    filterBar.noUiSlider.on('update', function (values, handle) {
        skipValues[handle].innerHTML = Math.round(values[handle]);
    });
}
function cartDetailsUser() {
    if (window.sessionStorage.getItem('pageInfo')) {
        $('#s1').load('/cart');
        window.sessionStorage.removeItem('pageInfo');
    }

}
