

(function(){

  var alpha = 0;
  var beta = 0;
  var gamma = 0;
  var speedX = 0;
  var speedY = 0;

  $(window).ready(function(){
    $('#athBtn').click(function(){
      $('#athBtn').popover('toggle');
    });

    window.ondevicemotion = function(event) {
      ax = event.accelerationIncludingGravity.x
      ay = event.accelerationIncludingGravity.y
      az = event.accelerationIncludingGravity.z
      //rotation = event.rotationRate;
      
      $("#arAlpha").html(Math.round(ax));
      $("#arBeta").html(Math.round(ay));
      $("#arGamma").html(Math.round(az));
    }

    window.ondeviceorientation = function(event) {
      alpha = Math.round(event.alpha);
      beta = Math.round(event.beta);
      gamma = Math.round(event.gamma);
      
      $("#alpha").html(alpha);
      $("#beta").html(beta);
      $("#gamma").html(gamma);      
    }

    setInterval(function(){
      fly(beta, gamma); 
    }
      , 30);
  });

  function fly(beta, gamma){
    
    var p = $("#airPlane").position();
    var t = p.top;
    var l = p.left;

    // X
    if (gamma > 0) {
      l += 1;
    } else if (gamma < 0) {
      l -= 1;
    }

    if (l > $( window ).width()) {
      l = 0;
    } 

    if (l < 0) {
      l = $( window ).width();;
    }

    if (beta > 0) {
      t += 1;
    } else if (beta < 0) {
      t -= 1;
    }

    if (t > $( window ).height()) {
      t = 0;
    } 

    if (t < 0) {
      t = $( window ).height();
    }

    $("#airPlane").css({'position': 'absolute', 'top': t +'px', 'left': l +'px'});
  }

})();
