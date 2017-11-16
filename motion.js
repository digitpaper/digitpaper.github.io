/*
 * Digit Paper Top Gun
 * Copyright 2017 Chutian Gao
 * Licensed under the Apache 2.0 license (https://digitpaper.github.io/LICENSE)
 */
(function(){

  var alpha = 0;
  var beta = 0;
  var gamma = 0;
  var speedX = 0;
  var speedY = 0;
  var reach = 200;

  var windowW = 0;
  var windowH = 0;

  var planeTimer;
  var cloudTimer;

  var cloudIndex = 0;
  var clouds = [];

  var totalHit = 0;
  var missileOnAir = false;

  $(window).ready(function(){
    $("#stopBtn").hide();
    
    windowW = $(window).width();
    windowH = $(window).height();
  
    $("#startBtn").click(function(){
      startGame();
      $(this).hide();
      $("#stopBtn").show();
    });

    $("#stopBtn").click(function(){
      stopGame();
      $(this).hide();
      $("#startBtn").show();
    });

    window.ondeviceorientation = function(event) {
      alpha = Math.round(event.alpha);
      beta = Math.round(event.beta);
      gamma = Math.round(event.gamma);
    }

    $('body').bind("touchstart", function(){
      if (!missileOnAir) {
        lauchMissle();
      }
    });

    $(document).keydown(function(e){

      if (e.keyCode == 37) {
        gamma = -20;
      }
      if (e.keyCode == 38) {
        beta = -10;
      }
      if (e.keyCode == 39) { 
        gamma = 50;
      }
      if (e.keyCode == 40) { 
        beta = 90;
      }
      if (e.keyCode == 32) { 
        if (!missileOnAir) {
          lauchMissle();
        } 
      }
    });
  });


  function startGame(){
    /*--------- Start Game -----------*/
    $("#airPlane").show();
    $("#airPlane").css({'position': 'absolute', 'top': (windowH/2) +'px', 'left': (windowW/2) +'px'});

    planeTimer = setInterval(function(){
      fly(beta, gamma); 
    }, 10);

    cloudTimer = setInterval(function(){
      var cloudID = 'c-'+cloudIndex;
      generateCloud(cloudID);
      clouds.push(cloudID);
      cloudIndex ++;
      if (cloudIndex >= 300) {
        clearInterval(cloudTimer);
      }
    }, 500);
    /*---------/ Start Game -----------*/
  }

  function stopGame(){
    clearInterval(planeTimer);
    clearInterval(cloudTimer);
    $("#airPlane").hide();
  }

  function generateCloud(cloudID){

    var cloudHTML = '<span class="glyphicon glyphicon-cloud cloud" id="'+ cloudID +'" style="position:absolute;"></span>';
    $('body').prepend(cloudHTML);
    
    var cloudT = 50;
    var cloudL = Math.random() * windowW;
    
    var flowTimer = setInterval(function(){
      cloudT = cloudT + 1;
      
      if (cloudL > windowW - 10) {
        cloudL = windowW - 10;
      }

      if (cloudT > windowH - 30) {
        $('#' + cloudID).remove();
        clouds = removeFromArray(clouds, cloudID);
        clearInterval(flowTimer);
      } else {
        $("#"+cloudID).css({'position': 'absolute', 'top': cloudT +'px', 'left': cloudL +'px'});
      }
    }, 10);
  }

  function fly(beta, gamma){
    
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
    reach = 200;

    $("#missile").css({'position': 'absolute', 'top': tP +'px', 'left': lP +'px'});

    var shooting = setInterval(function(){
      missileOnAir = true;
      if (reach <= 0) {
        tP = 0;
        clearInterval(shooting);
        missileOnAir = false;
      }
      tP = tP - 10;
      reach = reach - 10;
      isHit();
      $("#missile").css({'position': 'absolute', 'top': tP +'px', 'left': lP +'px'});
    }, 10);
  }

  function isHit(){
    var pMissile = $("#missile").position();
    var tM = pMissile.top;
    var lM = pMissile.left;

    $(".cloud").each(function(){
      var pCloud = $(this).position();
      var tC = pCloud.top;
      var lC = pCloud.left;
      if (tC <= tM+5 && tC >= tM-5 && lC <= lM+ 10 && lC >= lM-10) {
        var cloudID = $(this).attr('id');      
        $(this).remove();
        clouds = removeFromArray(clouds, cloudID);
        missileOnAir = false;
        totalHit++;
        $("#score").html(totalHit);
      }
    });
  }

  function removeFromArray(arr, niddle){
    arr = arr.filter(function(item) { 
        return item !== niddle
    });
    return arr;
  }

})();

/*
       $("#alpha").html(alpha);
      $("#beta").html(beta);
      $("#gamma").html(gamma);
*/

/*

var turnT = false;
var turnL = false;
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
*/

/*
    setInterval(function(){
      enemyFly(turnT, turnL); 
    }, 20);
*/

/*
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
*/

/*
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
*/
