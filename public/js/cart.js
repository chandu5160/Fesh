var quantity = 1;
var arrayForCart = [];
var ttl;
function addcartforUser(pid, pimg, price, pname) {
    debugger

    var name = pname.replace(/_/g, " ");
    $('.block2-btn-addcart').each(function () {
        var nameProduct = $(this).parent().parent().parent().find('.block2-name').html();
        $(this).on('click', function () {
            swal(nameProduct, "is added to cart !", "success");
        });
    });

    ttl = parseInt($('#header-cart-totalPera').html()) + parseInt(price);
    $('#header-cart-totalPera').html(ttl);

    arrayForCart.push({
        // uid: '',
        pid: pid,
        pimg: pimg,
        pname: name,
        pquantity: quantity,
        pprice: price

    })
    for (i = 0; i < arrayForCart.length; i++) {
        for (j = i + 1; j < arrayForCart.length; j++) {
            if (arrayForCart[i].pid === arrayForCart[j].pid) {
                arrayForCart[i].pquantity += 1;
                arrayForCart.pop(arrayForCart[j]);

            }
        }

    }


    localStorage.setItem('CartOficon', JSON.stringify(arrayForCart));
    //sessionStorage.setItem('CartOficon',JSON.stringify(arrayForCart));
    cartprint();
    cartdata();
}
//pop-up cart print
function cartprint() {
    debugger
    var htmls = '';
    var cartDetails = JSON.parse(localStorage.getItem('CartOficon'));
    if (cartDetails) {
        for (i = 0; i < cartDetails.length; i++) {
            htmls += '<li class="header-cart-item"><div class="header-cart-item-img"><img src="' + cartDetails[i].pimg + '" alt="IMG"></div><div class="header-cart-item-txt"><a href="#" onclick=filldata("' + cartDetails[i].pid + '") class="header-cart-item-name">' + cartDetails[i].pname + '</a><span class="header-cart-item-info">' + cartDetails[i].pquantity + ' x ' + cartDetails[i].pprice + '</span></div></li>';
        }
    }

    $('#header-icons-noti').html(cartDetails.length);
    $('#header-cart-wrapitem').html(htmls);




}
// cart page print
function cartTableData() {
    debugger
    var htmls = '';
    var cartDetails = JSON.parse(localStorage.getItem('CartOficon'));
    ttl = 0;
    for (i = 0; i < cartDetails.length; i++) {
        var p = cartDetails[i].pprice * cartDetails[i].pquantity;
        htmls += `<tr class="table-row">
        <td class="column-1" onclick=cartTrDel("${cartDetails[i].pid}","${cartDetails[i].pquantity}","${cartDetails[i].pprice}")>
        <div class="cart-img-product b-rad-4 o-f-hidden" >
        <img src=" ${cartDetails[i].pimg}" alt="IMG-PRODUCT">
        </div>
        </td>
        <td class="column-2">${cartDetails[i].pname}</td>
        <td class="column-3"><b>&#x20b9</b>${cartDetails[i].pprice}</td>
        <td class="column-4">
        <div class="flex-w bo5 of-hidden w-size17">
        <button class="btn-num-product-down color1 flex-c-m size7 bg8 eff2" onclick="cartud('${cartDetails[i].pid}','minus')">
        <i class="fs-12 fa fa-minus" aria-hidden="true"></i>
        </button>
        <input class="size8 m-text18 t-center num-product" type="number" name="num-product1" value="${cartDetails[i].pquantity}" disabled>
        <button class="btn-num-product-up color1 flex-c-m size7 bg8 eff2" onclick="cartud('${cartDetails[i].pid}','plus')">
        <i class="fs-12 fa fa-plus" aria-hidden="true"></i>
        </button>
        </div>
        </td>
        <td class="column-5"><b>&#x20b9</b>${p}</td>
        </tr>`
        ttl += p;
    }
    $('#header-cart-totalPera').html(ttl);
    $('#CartTableDetails').html(htmls);
}
//increment and decrement in cart
function cartud(x, y) {
    debugger
    // var price;
    var cartDetails = JSON.parse(localStorage.getItem('CartOficon'));
    if (y == 'plus') {
        for (j = 0; j < cartDetails.length; j++) {
            if (cartDetails[j].pid == x) {
                cartDetails[j].pquantity += 1;
                price = parseInt($('#header-cart-totalPera').html()) + parseInt(cartDetails[j].price);
            }
        }
    }
    else {
        for (j = 0; j < cartDetails.length; j++) {
            if (cartDetails[j].pid == x) {
                if (cartDetails[j].pquantity > 1) {
                    cartDetails[j].pquantity -= 1;
                    price = parseInt($('#header-cart-totalPera').html()) - parseInt(cartDetails[j].price);
                }
            }
        }
    }
    $('#header-cart-totalPera').html(price);
    localStorage.setItem('CartOficon', JSON.stringify(cartDetails));
    cartprint();
    cartdata();
    cartTableData();
}
//user side cart delete
function cartTrDel(pid1, qunt, proPrice) {
    var arrayForCart1 = [];
    var cartDetails = JSON.parse(localStorage.getItem('CartOficon'));
    debugger;
    for (i = 0; i < cartDetails.length; i++) {
        if (cartDetails[i].pid != pid1) {
            price1 = cartDetails[i].pprice * cartDetails[i].pquantity;
            arrayForCart1.push(cartDetails[i])
        }
    }
    cartDetails = arrayForCart1;
    localStorage.setItem('CartOficon', JSON.stringify(cartDetails));
    cartprint();
    cartdata();
    cartTableData();

}
//database cart changes
function cartdata() {
    debugger
    var data = {};
    var userifo = JSON.parse(window.localStorage.getItem('userid'));
    if (userifo) {
        var da = JSON.parse(localStorage.getItem('CartOficon'));
        var uid = userifo[0].uid
        da.push({ uid: userifo[0].uid });
        console.log('********************', da)
        var url = '/cartdata',
            type = 'POST',
            dataType = 'json',
            data = JSON.stringify(da),
            page = 'cartdata';
        services(url, type, data, dataType, page);
    }
}
function propay() {
    debugger

    var data = {};
    var userifo = JSON.parse(window.localStorage.getItem('userid'));
    if (userifo) {
        var da = JSON.parse(localStorage.getItem('CartOficon'));
        var uid = userifo[0].uid
        da.push({ uid: userifo[0].uid });
        var url = '/propay1',
            type = 'POST',
            dataType = 'json',
            data = JSON.stringify(da),
            page = 'propay';
        services(url, type, data, dataType, page);
        localStorage.removeItem('CartOficon');
        window.location.href = '/';

    }
    else {
        loginPageForUser('login');

        sessionStorage.setItem('pageInfo', "cart")
    }
}
function cartMerge() {
    debugger
    var UsercartDetails = JSON.parse(localStorage.getItem('GetUserCart'));
    //arrayForCart = JSON.parse(localStorage.getItem('CartOficon'));

    for (i = 0; i < UsercartDetails.length; i++) {
        if (arrayForCart.length > 0) {

            for (j = 0; j < arrayForCart.length; j++) {
                if (UsercartDetails[i].pid == arrayForCart[j].pid) {
                    UsercartDetails[i].pquantity += arrayForCart[j].pquantity;
                    arrayForCart.pop(arrayForCart[j]);
                }
            }
            arrayForCart.push({
                // uid: '',
                pid: UsercartDetails[i].pid,
                pimg: UsercartDetails[i].pimg,
                pname: UsercartDetails[i].pname,
                pquantity: UsercartDetails[i].pquantity,
                pprice: UsercartDetails[i].pprice,
                // total:UsercartDetails[i].total
            })
        }
        else {
            arrayForCart.push({
                // uid: '',
                pid: UsercartDetails[i].pid,
                pimg: UsercartDetails[i].pimg,
                pname: UsercartDetails[i].pname,
                pquantity: UsercartDetails[i].pquantity,
                pprice: UsercartDetails[i].pprice,

            })
        }

    }
    // arrayForCart = UsercartDetails;
    $('#header-cart-totalPera').html(ttl)
    localStorage.setItem('CartOficon', JSON.stringify(arrayForCart));
    cartprint();
    cartdata();
}