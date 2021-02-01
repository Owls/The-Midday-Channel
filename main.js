var SELECTOR_SCREEN_ELEMENT = '.content';
var SELECTOR_SWITCHER_TV = '.powerbutton';
 
var isTurnedOn = false;
 
var timeline;
const gamesound = new Audio("./bkpause.mp3");
gamesound.loop = true
gamesound.volume = 0.3;
const poweron = new Audio("./turnon.mp3");
 
function buildTimeline() {
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
 
function toggleSwitcherTV() {
    if (isTurnedOn) {
        timeline.restart();
        gamesound.pause();
    }
 
    if (!isTurnedOn) {
        timeline.reverse();
        poweron.play();
        gamesound.play();
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