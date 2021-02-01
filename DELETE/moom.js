var SELECTOR_SCREEN_ELEMENT = '.content';
var SELECTOR_SWITCHER_TV_PWR = '.powerbutton';
var SELECTOR_SWITCHER_TV_VOL_UP = ".volumeupbutton";
var SELECTOR_SWITCHER_TV_VOL_DOWN = ".volumedownbutton";
 
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
 
function ToggleTV() {
    if (isTurnedOn) {
        timeline.restart();
        gamesound.pause();
    } else {
        timeline.reverse();
        poweron.play();
        gamesound.play();
    }
 
    isTurnedOn = !isTurnedOn;
}
 
// Initialize
$(document).ready(buildTimeline);
 
// Bindings
$(document).on('click', SELECTOR_SWITCHER_TV_PWR, function() {
    ToggleTV();
});
$(document).on("click", SELECTOR_SWITCHER_TV_VOL_UP, function() {
    // round to first decimal place, javascript is really weird...
    gamesound.volume = Math.round(gamesound.volume * 10) / 10;
    if(gamesound.volume < 1.0) {
        gamesound.volume += 0.1;
    }
});
$(document).on("click", SELECTOR_SWITCHER_TV_VOL_DOWN, function() {
    // round to first decimal place, javascript is really weird...
    gamesound.volume = Math.round(gamesound.volume * 10) / 10;
    if(gamesound.volume > 0) {
        gamesound.volume -= 0.1;
    }
});