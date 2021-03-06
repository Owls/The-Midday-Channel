// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

// Get the navbar
var navbar = document.getElementById("navbar");

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky")
    } else {
        navbar.classList.remove("sticky");
    }
}
function smoothScroll(target, time) {
    var margin = ($('#main-header').outerHeight() - 1);
    if (!time) { time = '1000'; }

    if (target === 'toTop') {
        $('html,body').animate({
            scrollTop: 0
        }, time);
    }
    else {
        $('html,body').animate({
            scrollTop: target.offset().top - margin
        }, time);
    }
}

// SCROLL DOWN ARROR BUTTON

var count = 0;

$('#scroll').on("click", function(){

    var sections = $('section');

    //+55px to offset the margin-top
    var $this = $(this),
        top = ($this.offset().top - $(window).scrollTop()) + 55,
        right = $this.offset().right;


    $this.css({
        position: 'fixed',
        top: top,
        right: right
    })
        .animate({
            right: '5%',
            top: '90%'
        }, 600)
        .addClass('clicked');

    var target;

    // END OF ARRAY HAS ALEADY BEEN REACHED
    if (count > (sections.length -1) ) {
        count = -1;

        smoothScroll('toTop');
        $this.removeClass('rotate');
    }
    // JUST REACHED END OF ARRAY
    else {
        target = $(sections[count]);
        if (count === (sections.length -1)) {
            $this.addClass('rotate');
        }
        smoothScroll(target);
    }

    count++;

    $(this).find('.arrow-bounce').removeClass('arrow-bounce');

});