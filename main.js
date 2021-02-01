var SELECTOR_SCREEN_ELEMENT = '.content';
var SELECTOR_SWITCHER_TV = '.powerbutton';

var isTurnedOn = false;

var timeline;

function buildTimeline() 
{
    timeline = new TimelineMax({
        paused: false
    });

    timeline
        .to(SELECTOR_SCREEN_ELEMENT, .2, {
            width: '100vw',
            height: '2px',
            background: '#ffffff',
            ease: Power2.easeOut
        })
        .to(SELECTOR_SCREEN_ELEMENT, .2, {
            width: '0',
            height: '0',
            background: '#ffffff'
        });
}

function toggleSwitcherTV() 
{
    if (isTurnedOn) {
        timeline.restart();
    }

    if (!isTurnedOn) {
        timeline.reverse();
    }

    isTurnedOn = !isTurnedOn;
}

// Initialize
$(document).ready(buildTimeline);

// Bindings
$(document).on('click', SELECTOR_SWITCHER_TV, function() {
    toggleSwitcherTV();
});

// Adds Sound to pressing Power Button 
const powerbutton = document.querySelector(".powerbutton");

//TV is OFF by Default
let tvon = true;
const gamesound = new Audio("./bkpause.mp3");
gamesound.loop = true
const poweron = new Audio("./turnon.mp3"); 

powerbutton.addEventListener("click", () => 
{
 poweron.play();
 if(tvon)
 {
   tvon = false;
   gamesound.pause();
 }else 
 {
  gamesound.play();
 }
})