var SELECTOR_SCREEN_ELEMENT = '.content';
var SELECTOR_SWITCHER_TV_PWR = '.powerbutton';
var SELECTOR_SWITCHER_TV_VOL_UP = ".volumeupbutton";
var SELECTOR_SWITCHER_TV_VOL_DOWN = ".volumedownbutton";
var VOLUME_LEVELS = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];
 
var isTurnedOn = false;
 
var timeline;
var level = 4; // 0.3
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
    if(level >= 0 && level < 10) {
        level += 1;
        gamesound.volume = VOLUME_LEVELS[level];
    }
});
$(document).on("click", SELECTOR_SWITCHER_TV_VOL_DOWN, function() {
    if(level > 0 && level <= 10) {
        level -= 1;
        gamesound.volume = VOLUME_LEVELS[level];
    }
});