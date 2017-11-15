(function(){

  var alpha = 0;
  var beta = 0;
  var gamma = 0;
  var speedX = 0;
  var speedY = 0;
  var reach = 200;

  var windowW = 0;
  var windowH = 0;
  

  $(window).ready(function(){
    
    windowW = $(window).width;
    windowH = $(window).height;
    $("#airPlane").css({'position': 'absolute', 'top': (windowH/2) +'px', 'left': (windowW/2) +'px'});

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
    }, 10);

    $('body').click(function(){
      lauchMissle();
    });

  });

  function fly(beta, gamma){

    /* 
     * v=v+at ?
     */
    
    var p = $("#airPlane").position();
    var t = p.top;
    var l = p.left;

    // X
    if (gamma > 15) {
      l += 1;
    } else if (gamma < -15) {
      l -= 1;
    }

    if (l > windowW) {
      l = 0;
    } 

    if (l < 0) {
      l = windowW;
    }

    // Y
    if (beta > 70) {
      t += 1;
    } else if (beta < 0) {
      t -= 1;
    }

    if (t > windowH) {
      t = 0;
    } 

    if (t < 0) {
      t = windowH;
    }

    $("#airPlane").css({'position': 'absolute', 'top': t +'px', 'left': l +'px'});
  }

  function lauchMissle(){
    var pPlane = $("#airPlane").position();
    var tP = pPlane.top;
    var lP = pPlane.left;
    reach = 200;

    $("#missile").css({'position': 'absolute', 'top': tP +'px', 'left': lP +'px'});

    var shooting = setInterval(function(){      
      if (reach <=0 ) {
        tP = 0;
        clearInterval(shooting);       
      }
      tP = tP - 10;
      reach = reach - 10;
      $("#missile").css({'position': 'absolute', 'top': tP +'px', 'left': lP +'px'});
    }, 10);
  }

})();
