ResultTxt = {
    'Low': 'Low. Individuals are not affected or experience only insignificant disadvantages, such as re-entering data.',
    'Middel': 'Mediterranean. Individuals can experience serious disadvantages, which can be overcome with any loss to follow, stress, psychological impact, etc.',
    'High': 'High. Individuals can experience serious consequences that they can overcome but with serious consequences such as financial loss, property damage, loss of work, worsening of health, etc.',
    'Very High': 'Very high. Individuals like serious and lasting consequences that are not overcome - bankruptcy, debt, incapacity for work, permanent mental illness or physical illness and death.'
};

$(function () {

    var progressWidth = $('#progress-inner').width();
    var progressHeigh = $('#progress-inner').height();
    setWidth();


    $('select').on('change', function () {

        var SE = parseFloat($('#DPC').val()) * parseFloat($('#IE').val()) + parseFloat($('#CB').val());
        var per;
        var state = 0;
        if (SE < 2) {
            var SEtxt = "Low";
            per = 25;
            state = 0;
        }
        if (SE >= 2 && SE < 3) {
            var SEtxt = "Middel";
            per = 50;
            state = 1;
        }
        if (SE >= 3 && SE < 4) {
            var SEtxt = "High";
            per = 75;
            state = 2;
        }
        if (SE >= 4) {
            var SEtxt = "Very High";
            per = 100;
            state = 3;
        }

        changeBar(per);

        SE = SE.toString();

        if (SE.length == 1) SE = SE + ".00";
        if (SE.length == 3) SE = SE + "0";
        $('#barNumber').text(SE);
        $('#explain').text(ResultTxt[SEtxt]);
        $('#barText strong').text(SEtxt);

    });

    $('button').on('click', function () {
        $('select').prop('selectedIndex', 0);
        $('#DPC').trigger('change');
    });

    $("#jumpDown").click(function () {
        $('html, body').animate({
            scrollTop: $("#calculator").offset().top - 100
        }, 1000);
    });

    $('#DPC').trigger('change');



    $("#progressBar").each(function () {
        var val = $(this).find("#number");
        var per = parseInt(val.text(), 10);
        changeBar(per);
    });

    function setWidth() {
        var bOver = $('.barOverflow');
        var ba = $('.bar');
    }

});

function changeBar(percentage) {
    var bar = $("#progressBar").find("#bar");
    $({ p: 0 }).animate({ p: percentage }, {
        duration: 1000,
        easing: "swing",
        step: function (p) {
            if (p <= 25) {
                bar.css({
                    'border-bottom-color': '#f19833',
                    'border-right-color': '#f19833'
                });
            }
            if (p > 25 && p <= 50) {
                bar.css({
                    'border-bottom-color': '#f17933',
                    'border-right-color': '#f17933'
                });
            }
            if (p > 50 && p <= 75) {
                bar.css({
                    'border-bottom-color': '#f15f33',
                    'border-right-color': '#f15f33'
                });
            }
            if (p > 75 && p <= 100) {
                bar.css({
                    'border-bottom-color': '#f14933',
                    'border-right-color': '#f14933'
                });
            }
            bar.css({
                transform: "rotate(" + (45 + (p * 1.8)) + "deg)"
            });
        }
    });
}


