
function clickHandler(state) {
    if (state === 1) {
        setCookie('cookieAccept', 'true', 30);
        theCookieIsAccepted = true;
        displayMessage(2);
        location.reload();
    } else if (state === 2) {
        displayMessage(2);
    } else {
    }
}

function displayMessage(state) {
    if (state == 1) {
        document.getElementById('special-cookie-message').style.display = "flex";
    } else if (state == 2) {
        document.getElementById('special-cookie-message').style.display = "none";

    }

}


function listCookies() {
    var theCookies = document.cookie.split(';');
    var aString = '';
    for (var i = 1; i <= theCookies.length; i++) {
        aString += i + ' ' + theCookies[i - 1] + "\n";
    }
    return aString;
}

function getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
            end = dc.length;
        }
    }
    // because unescape has been deprecated, replaced with decodeURI
    //return unescape(dc.substring(begin + prefix.length, end));
    return decodeURI(dc.substring(begin + prefix.length, end));
}

function get_cookies_array() {

    var cookies = {};

    if (document.cookie && document.cookie != '') {
        var split = document.cookie.split(';');
        for (var i = 0; i < split.length; i++) {
            var name_value = split[i].split("=");
            name_value[0] = name_value[0].replace(/^ /, '');
            cookies[decodeURIComponent(name_value[0])] = decodeURIComponent(name_value[1]);
        }
    }

    return cookies;

}


function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}




var theCookieIsAccepted = false;
var cookie = get_cookies_array();
var cookie = cookie.cookieAccept;
if (cookie) {
    if (cookie == 'true') {
        theCookieIsAccepted = true;
    }
} else {
}




jQuery(function () {
    console.log("LOADIED");

    if (theCookieIsAccepted) {

    } else {
        displayMessage(1);
    }
    if (cookie) {
        if (cookie == 'true') {
            displayMessage(2);
            theCookieIsAccepted = true;
        } else {
            displayMessage(1);
        }
    } else {
        displayMessage(1);
    }


    $('#cookieAcceptButton').click(function () {
        clickHandler(1);
    });

    $('#cookieDeclineButton').click(function () {
        clickHandler(2);
    });

});


