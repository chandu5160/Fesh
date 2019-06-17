
(function ($) {
    "use strict";

    /*[ Load page ]
    ===========================================================*/
    
    
    /*[ Back to top ]
    ===========================================================*/
    var windowH = $(window).height()/2;

    $(window).on('scroll',function(){
        if ($(this).scrollTop() > windowH) {
            $("#myBtn").css('display','flex');
        } else {
            $("#myBtn").css('display','none');
        }
    });

    $('#myBtn').on("click", function(){
        $('html, body').animate({scrollTop: 0}, 300);
    });


    /*[ Show header dropdown ]
    ===========================================================*/
    $('.js-show-header-dropdown').on('click', function(){
        $(this).parent().find('.header-dropdown')
    });

    var menu = $('.js-show-header-dropdown');
    var sub_menu_is_showed = -1;

    for(var i=0; i<menu.length; i++){
        $(menu[i]).on('click', function(){ 
            
                if(jQuery.inArray( this, menu ) == sub_menu_is_showed){
                    $(this).parent().find('.header-dropdown').toggleClass('show-header-dropdown');
                    sub_menu_is_showed = -1;
                }
                else {
                    for (var i = 0; i < menu.length; i++) {
                        $(menu[i]).parent().find('.header-dropdown').removeClass("show-header-dropdown");
                    }

                    $(this).parent().find('.header-dropdown').toggleClass('show-header-dropdown');
                    sub_menu_is_showed = jQuery.inArray( this, menu );
                }
        });
    }

    $(".js-show-header-dropdown, .header-dropdown").click(function(event){
        event.stopPropagation();
    });

    $(window).on("click", function(){
        for (var i = 0; i < menu.length; i++) {
            $(menu[i]).parent().find('.header-dropdown').removeClass("show-header-dropdown");
        }
        sub_menu_is_showed = -1;
    });


     /*[ Fixed Header ]
    ===========================================================*/
    var posWrapHeader = $('.topbar').height();
    var header = $('.container-menu-header');

    $(window).on('scroll',function(){

        if($(this).scrollTop() >= posWrapHeader) {
            $('.header1').addClass('fixed-header');
            $(header).css('top',-posWrapHeader); 

        }  
        else {
            var x = - $(this).scrollTop(); 
            $(header).css('top',x); 
            $('.header1').removeClass('fixed-header');
        } 

        if($(this).scrollTop() >= 200 && $(window).width() > 992) {
            $('.fixed-header2').addClass('show-fixed-header2');
            $('.header2').css('visibility','hidden'); 
            $('.header2').find('.header-dropdown').removeClass("show-header-dropdown");
            
        }  
        else {
            $('.fixed-header2').removeClass('show-fixed-header2');
            $('.header2').css('visibility','visible'); 
            $('.fixed-header2').find('.header-dropdown').removeClass("show-header-dropdown");
        } 

    });
    
    /*[ Show menu mobile ]
    ===========================================================*/
    $('.btn-show-menu-mobile').on('click', function(){
        $(this).toggleClass('is-active');
        $('.wrap-side-menu').slideToggle();
    });

    var arrowMainMenu = $('.arrow-main-menu');

    for(var i=0; i<arrowMainMenu.length; i++){
        $(arrowMainMenu[i]).on('click', function(){
            $(this).parent().find('.sub-menu').slideToggle();
            $(this).toggleClass('turn-arrow');
        })
    }

    $(window).resize(function(){
        if($(window).width() >= 992){
            if($('.wrap-side-menu').css('display') == 'block'){
                $('.wrap-side-menu').css('display','none');
                $('.btn-show-menu-mobile').toggleClass('is-active');
            }
            if($('.sub-menu').css('display') == 'block'){
                $('.sub-menu').css('display','none');
                $('.arrow-main-menu').removeClass('turn-arrow');
            }
        }
    });


    /*[ remove top noti ]
    ===========================================================*/
    $('.btn-romove-top-noti').on('click', function(){
        $(this).parent().remove();
    })


    /*[ Block2 button wishlist ]
    ===========================================================*/
    $('.block2-btn-addwishlist').on('click', function(e){
        e.preventDefault();
        $(this).addClass('block2-btn-towishlist');
        $(this).removeClass('block2-btn-addwishlist');
        $(this).off('click');
    });

    /*[ +/- num product ]
    ===========================================================*/
    // $('.btn-num-product-down').on('click', function(e){
    //     e.preventDefault();
    //     var numProduct = Number($(this).next().val());
    //     if(numProduct > 1) $(this).next().val(numProduct - 1);
    //     var a=$(this).parent().parent().prev().html();
    //     var numProduct2 = Number($(this).next().val());
    //     var b=a.split('/b>');
    //     var res=numProduct2*parseFloat(b[1]);
    //    $(this).parent().parent().next().html('<b>₹</b>'+res);
    //    var c=arrayForCart[arrayForCart.length-1].total-parseFloat(b[1]);
    //    //alert(c);
    //    // alert(res);
    // });

    // $('.btn-num-product-up').on('click', function(e){
    //     e.preventDefault();
        
    //     var numProduct = Number($(this).prev().val());
    //     $(this).prev().val(numProduct + 1);
    //     var a=$(this).parent().parent().prev().html();
    //     var numProduct2 = Number($(this).prev().val());
    //     var b=a.split('/b>');
    //     var res=numProduct2*parseFloat(b[1]);
    //    $(this).parent().parent().next().html('<b>₹</b>'+res);
    //    var pname=$(this).parent().parent().prev().prev().html();
    //   // alert(pname);
    //    cartDetails=JSON.parse(sessionStorage.getItem('CartOficon'));
    //    for (i = 0; i < cartDetails.length; i++) {
    //        if(cartDetails[i].pname==pname){
    //         cartDetails[i].pqu+1;
    //        }
    //     }
    //     for (i = 0; i < cartDetails.length; i++) {
    //         //var p = cartDetails[i].price * cartDetails[i].pqu;
    //         // htmls += '<tr class="table-row"><td class="column-1" onclick=cartTrDel("' + arrayForCart[i].pid + '","' + arrayForCart[i].pqu + '","' + arrayForCart[i].price + '")><div class="cart-img-product b-rad-4 o-f-hidden" ><img src="' + arrayForCart[i].img + '" alt="IMG-PRODUCT"></div></td><td class="column-2">' + arrayForCart[i].name + '</td><td class="column-3"><b>&#x20b9</b>' + arrayForCart[i].price + '</td><td class="column-4"><div class="flex-w bo5 of-hidden w-size17"><button class="btn-num-product-down color1 flex-c-m size7 bg8 eff2"><i class="fs-12 fa fa-minus" aria-hidden="true"></i></button><input class="size8 m-text18 t-center num-product" type="number" name="num-product1" value="' + arrayForCart[i].pqu + '"><button class="btn-num-product-up color1 flex-c-m size7 bg8 eff2"><i class="fs-12 fa fa-plus" aria-hidden="true"></i></button></div></td><td class="column-5"><b>&#x20b9</b>' + p + '</td></tr>'
    //         html += '<li class="header-cart-item"><div class="header-cart-item-img"><img src="' + cartDetails[i].img + '" alt="IMG"></div><div class="header-cart-item-txt"><a href="#" onclick=filldata("' + cartDetails[i].pid + '") class="header-cart-item-name">' + cartDetails[i].name + '</a><span class="header-cart-item-info">' + cartDetails[i].pqu + ' x ' + cartDetails[i].price + '</span></div></li>';
    //     }
    //     $('#header-cart-wrapitem').html(html);
    //    var c=arrayForCart[arrayForCart.length-1].total+parseFloat(b[1]);
    //  //  alert(c);
    // });


    /*[ Show content Product detail ]
    ===========================================================*/
    $('.active-dropdown-content .js-toggle-dropdown-content').toggleClass('show-dropdown-content');
    $('.active-dropdown-content .dropdown-content').slideToggle('fast');

    $('.js-toggle-dropdown-content').on('click', function(){
        $(this).toggleClass('show-dropdown-content');
        $(this).parent().find('.dropdown-content').slideToggle('fast');
    });


    /*[ Play video 01]
    ===========================================================*/
    var srcOld = $('.video-mo-01').children('iframe').attr('src');

    $('[data-target="#modal-video-01"]').on('click',function(){
        $('.video-mo-01').children('iframe')[0].src += "&autoplay=1";

        setTimeout(function(){
            $('.video-mo-01').css('opacity','1');
        },300);      
    });

    $('[data-dismiss="modal"]').on('click',function(){
        $('.video-mo-01').children('iframe')[0].src = srcOld;
        $('.video-mo-01').css('opacity','0');
    });

})(jQuery);