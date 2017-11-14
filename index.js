

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

    if (gamma > 0) {
      l ++;
    } else if (gamma < 0) {
      l --;
    } else {
      l = l;
    }

    if (l > $( window ).width()) {
      l = $( window ).width();
    } 

    if (l < 0) {
      l = 0;
    }

    if (beta > 0) {
      t ++;
    } else if (beta < 0) {
      t --;
    } else {
      t = t;
    }

    if (t > $( window ).height()) {
      t = $( window ).height();
    } 

    if (t < 0) {
      t = 0;
    }

    $("#airPlane").css({'position': 'absolute', 'top': t +'px', 'left': l +'px'});
  }

})();
