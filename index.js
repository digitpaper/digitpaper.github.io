

(function(){

  $(window).ready(function(){
    $('#athBtn').click(function(){
      $('#athBtn').popover('toggle');
    });

    window.ondevicemotion = function(event) {
      ax = event.accelerationIncludingGravity.x
      ay = event.accelerationIncludingGravity.y
      az = event.accelerationIncludingGravity.z
      rotation = event.rotationRate;
      if (rotation != null) {
        arAlpha = Math.round(rotation.alpha);
        arBeta = Math.round(rotation.beta);
        arGamma = Math.round(rotation.gamma);
        $("#arAlpha").html(arAlpha);
        $("#arBeta").html(arBeta);
        $("#arGamma").html(arGamma);
      }          
    }

    window.ondeviceorientation = function(event) {
      alpha = Math.round(event.alpha);
      beta = Math.round(event.beta);
      gamma = Math.round(event.gamma);
      $("#alpha").html(alpha);
      $("#beta").html(beta);
      $("#gamma").html(gamma);

      fly(beta, gamma);

    }
  });

  function fly(beta, gamma){
    var p = $("#airPlane").position();
    var t = p.top;
    var l = p.left;
    var speedX = 1;
    var speedY = 1;

    if (gamma > 0) {
      l += speedX * gamma/360;
    } else if (gamma < 0) {
      l -= speedX * gamma/360;;
    } else {
      l = l;
    }

    if (l > $( window ).width()) {
      l = 0;
    } 

    if (l < 0) {
      l = $( window ).width();;
    }

    if (beta > 45) {
      t += speedY * beta/360;
    } else if (beta < 45) {
      t -= speedY * beta/360;
    } else {
      t = t;
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
