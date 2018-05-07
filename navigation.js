$(document).ready(function () {
    console.log("asd");

    var run = 50;
    var navigation = false;
    var langNav = false;
    // left: 37, up: 38, right: 39, down: 40,
    // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
    var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };
    $('#menu-main-navigation li').addClass('slideInRight hide-very-much');



    function preventDefault(e) {
        e = e || window.event;
        if (e.preventDefault)
            e.preventDefault();
        e.returnValue = false;
    }


    function preventDefaultForScrollKeys(e) {
        if (keys[e.keyCode]) {
            preventDefault(e);
            return false;
        }
    }

    function disableScroll() {
        if (window.addEventListener) // older FF
            window.addEventListener('DOMMouseScroll', preventDefault, false);
        window.onwheel = preventDefault; // modern standard
        window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
        window.ontouchmove = preventDefault; // mobile
        document.onkeydown = preventDefaultForScrollKeys;
    }

    function enableScroll() {
        if (window.removeEventListener)
            window.removeEventListener('DOMMouseScroll', preventDefault, false);
        window.onmousewheel = document.onmousewheel = null;
        window.onwheel = null;
        window.ontouchmove = null;
        document.onkeydown = null;
    }

    function showNavigation() {
        run = 50;
        $('#mobileNavigation').removeClass('hide-very-much');
        $('#mobileNavigation').removeClass('slideOutRight');

        setTimeout(function () {
            var n = $('#menu-main-navigation span').length;


            $('#menu-main-navigation li').each(function () {
                hideSingleItem($(this));
            });
            run = 50;
        }, 500);
    }


    function showSmallLang() {
        run = 50;
        $('#smallLangNav').removeClass('hide-very-much');
        $('#smallLangNav').removeClass('slideOutRight');


    }





    function hideNavigation() {
        $('#mobileNavigation').addClass('slideOutRight');
        $('#menu-main-navigation li').each(function () {
            $(this).addClass('hide-very-much');
        });
    }


    function hideSmallLang() {
        $('#smallLangNav').addClass('slideOutRight');
        $('#smallLangNav li').each(function () {
            $(this).addClass('hide-veru-much')
        });
        $('#smallLangNav span').each(function () {
            $(this).addClass('hide-veru-much')
        });
    }




    function hideSingleItem(item) {
        setTimeout(function () {
            item.removeClass('hide-very-much');
        }, run);
        run = run + 50;
    }




    $('#menu-toggle-icon').click(function () {
        if (navigation === true) {
            navigation = false;
            enableScroll();
            hideNavigation();
        } else {
            navigation = true;
            disableScroll();
            showNavigation();
        }
        console.log(navigation);
    });


    $('#langDropdown').click(function () {
        if (langNav === true) {
            langNav = false;
            enableScroll();
            hideSmallLang();
        } else {
            langNav = true;
            disableScroll();
            showSmallLang();
        }
    })

    $('#close-navigation-lang').click(function (evt) {
        $('#langDropdown').trigger("click");
    });

    $('#close-navigation').click(function (evt) {
        $('#menu-toggle-icon').trigger("click");
    });

    $('#mobileNavigation .orange-hr-btn').click(function (evt) {
        $('#menu-toggle-icon').trigger("click");
    });


    $('h1').click(function (evt) {
        console.log("asd");
    })



});

