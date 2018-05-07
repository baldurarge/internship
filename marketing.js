var $cloud1 = $('#cloud1'),
    $cloud2 = $('#cloud2'),
    $cloud3 = $('#cloud3'),
    $rocket = $('#rocket'),


    wHeight = $(window).height();

$(window).on('resize', function () {
    wHeight = $(window).height();
});

/**
 * requestAnimationFrame Shim 
 */
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

/**
 * Scroller
 */

function Scroller() {
    this.latestKnownScrollY = 0;
    this.ticking = false;
    this.triggered = false;
    this.latestKnownScrollBubble = 0;

}

Scroller.prototype = {
    /**
     * Initialize
     */
    init: function () {
        window.addEventListener('scroll', this.onScroll.bind(this), false);
    },

    /**
     * Capture Scroll
     */
    onScroll: function () {
        this.latestKnownScrollY = window.scrollY;
        this.latestKnownScrollBubble = $('#bubble').offset().top;
        this.requestTick();
    },

    /**
     * Request a Tick
     */
    requestTick: function () {
        if (!this.ticking) {
            window.requestAnimFrame(this.update.bind(this));
        }
        this.ticking = true;
    },

    /**
     * Update.
     */
    update: function () {
        var currentScrollY = this.latestKnownScrollY;
        this.ticking = false;
        var bubble = Utils.isElementInView($('#bubble'), false);
        var bubbleScroll = this.latestKnownScrollBubble - $(window).height();




        /**
         * Do The Dirty Work Here
         */
        var slowScroll = currentScrollY / 10,
            medScroll = currentScrollY / 7,
            highScroll = currentScrollY / 3;

        $cloud1.css({
            'transform': 'translate(-59%,-' + slowScroll + 'px)',
            '-moz-transform': 'translate(-59%,-' + slowScroll + 'px)',
            '-webkit-transform': 'translate(-59%,-' + slowScroll + 'px)'
        });
        $cloud2.css({
            'transform': 'translate(-55%,-' + medScroll + 'px)',
            '-moz-transform': 'translate(-55%,-' + medScroll + 'px)',
            '-webkit-transform': 'translate(-55%,-' + medScroll + 'px)'
        });
        $cloud3.css({
            'transform': 'translate(-45%,-' + slowScroll + 'px)',
            '-moz-transform': 'translate(-45%,-' + slowScroll + 'px)',
            '-webkit-transform': 'translate(-45%,-' + slowScroll + 'px)'
        });

        $rocket.css({
            'transform': 'translate(-50%,-' + highScroll + 'px)',
            '-moz-transform': 'translate(-50%,-' + highScroll + 'px)',
            '-webkit-transform': 'translate(-50%,-' + highScroll + 'px)'
        });


        if (bubble) {


            if ((currentScrollY - bubbleScroll) / 300 > 1) {
                var x = 99 / ((currentScrollY - bubbleScroll) / 300);
                var x = x;
                var p = (currentScrollY - bubbleScroll) / 1000;
                if (p < 0.5) {
                    p = 0.5;
                }

                p = p * 100;
                $('#bubble').css({
                    'bottom': '-' + x + 'px',
                    '-webkit-clip-path': 'ellipse(' + p + '% 100% at 50% 0%)',
                    'clip-path': 'ellipse(' + p + '% 100% at 50% 0%)'
                })
            } else {
                // console.log((currentScrollY- bubbleScroll)/600);
            }
        }

    }
};

/**
 * Attach!
 */
var scroller = new Scroller();
scroller.init();




function Utils() {

}

Utils.prototype = {
    constructor: Utils,
    isElementInView: function (element, fullyInView) {
        var pageTop = $(window).scrollTop();
        var pageBottom = pageTop + $(window).height();
        var elementTop = $(element).offset().top;
        var elementBottom = elementTop + $(element).height();

        if (fullyInView === true) {
            return ((pageTop < elementTop) && (pageBottom > elementBottom));
        } else {
            return ((elementTop <= pageBottom) && (elementBottom >= pageTop));
        }
    }
};

var Utils = new Utils();


