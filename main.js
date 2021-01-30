(function() 
{
    var SELECTOR_SCREEN_ELEMENT = '.tvscreen';
    var SELECTOR_SWITCHER_TV = '.powerbutton';
    
    var isTurnedOn = true;
    
    var timeline;
    
    function buildTimeline() 
    {
      timeline = new TimelineMax
      ({
        paused: true
      });
      
      timeline
      .to(SELECTOR_SCREEN_ELEMENT, .2, 
        {
        width: '100vw',
        height: '2px',
        background: '#ffffff',
        ease: Power2.easeOut
      })
      .to(SELECTOR_SCREEN_ELEMENT, .2, 
        {
        width: '0',
        height: '0',
        background: '#ffffff'
      });
    }
    
    function toggleSwitcherTV() 
    {
      if (isTurnedOn) 
      {
        timeline.restart();
      }
      
      if (!isTurnedOn) 
      {
        timeline.reverse();
      }
      
      isTurnedOn = !isTurnedOn;
    }
    
    // Initialize
    $(document).ready(buildTimeline);
    
    // Bindings
    $(document).on('click', SELECTOR_SWITCHER_TV, function() 
    {
      toggleSwitcherTV();
    });
  })();