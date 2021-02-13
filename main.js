var SELECTOR_SCREEN_ELEMENT = '.content';
var SELECTOR_SWITCHER_TV_PWR = '.powerbutton';
var SELECTOR_SWITCHER_TV_VOL_UP = ".volumeupbutton";
var SELECTOR_SWITCHER_TV_VOL_DOWN = ".volumedownbutton";

var isTurnedOn = false;

var timeline;

const gamesound = new Audio("./ASSETS/sscreenII.mp3");
gamesound.loop = false
gamesound.volume = 0.0;

const poweronsound = new Audio("./ASSETS/turnon.mp3");
poweronsound.volume = 0.3;

function BuildTimeline() {
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
        // reset the sound to the beginning
        gamesound.currentTime = 0;
        gamesound.volume = 0;
    } else {
        timeline.reverse();
        poweronsound.play();
        // delay the game sound from playing by 1200ms (1.2s)
        setTimeout(function() {
            gamesound.play();
            // animate the sound from volume 0 to 0.3 over 3000ms (3s)
            $(gamesound).animate({volume: 0.3}, 3000);
        }, 1200);
    }

    isTurnedOn = !isTurnedOn;
}

// Initialize
$(document).ready(BuildTimeline);

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