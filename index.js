(function(){

  var alpha = 0;
  var beta = 0;
  var gamma = 0;
  var speedX = 0;
  var speedY = 0;
  var reach = 100;

  var turnT = false;
  var turnL = false;

  var windowW = 0;
  var windowH = 0;
  

  $(window).ready(function(){
    
    windowW = $(window).width();
    windowH = $(window).height();
    $("#airPlane").css({'position': 'absolute', 'top': (windowH/2) +'px', 'left': (windowW/2) +'px'});
    $("#enemyPlane").css({'position': 'absolute', 'top': '60px', 'left': (windowW/2) +'px'});


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

    setInterval(function(){
      enemyFly(turnT, turnL); 
    }, 20);

    setInterval(function(){
      var diceT = Math.floor(Math.random() * 10);
      var diceL = Math.floor(Math.random() * 10);
      if (diceT > 4) {
        turnT = true;
      } else {
        turnT = false;
      }

      if (diceL > 4) {
        turnL = true;
      } else {
        turnL = false;
      }
    }, 1000);

    $('body').click(function(){
      lauchMissle();
    });

  });

  function enemyFly(turnT, turnL){

    var p = $("#enemyPlane").position();
    var t = p.top;
    var l = p.left;    

    if (turnT) {
      t--;
    } else {
      t++;
    }

    if (t > windowH) {
      t = 50;
    } 

    if (t < 50) {
      t = windowH;
    }

    if (turnL) {
      l--;
    } else {
      l++;
    }

    if (l > windowW) {
      l = 0;
    } 

    if (l < 0) {
      l = windowW;
    }

    $("#enemyPlane").css({'position': 'absolute', 'top': t +'px', 'left': l +'px'});
  }

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
    if (beta > 60) {
      t += 1;
    } else if (beta < 0) {
      t -= 1;
    }

    if (t > windowH) {
      t = 50;
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
    reach = 100;

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
