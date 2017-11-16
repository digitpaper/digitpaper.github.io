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

  var windowW = 0;
  var windowH = 0;

  var cloudTimer;
  var cloudIndex = 0;
  var clouds = [];

  var noSleep = new NoSleep();

  var vid = $("#alertSound")[0];

  $(window).ready(function(){
    $("#stopBtn").hide();
    
    windowW = $(window).width();
    windowH = $(window).height();
  
    $("#startBtn").click(function(){
      //startGame();
      $(this).hide();
      $("#stopBtn").show();
      noSleep.enable();
    });

    $("#stopBtn").click(function(){
      //stopGame();
      $(this).hide();
      $("#startBtn").show();
      noSleep.disable();
    });

    window.ondevicemotion = function(event) {
      ax = event.accelerationIncludingGravity.x
      ay = event.accelerationIncludingGravity.y
      az = event.accelerationIncludingGravity.z
      
      $("#x").html(Math.round(ax));
      $("#y").html(Math.round(ay));
      $("#z").html(Math.round(az));
      var avgAcc = (ax+ay+az)/3; 
      $("#acceleration").html(Math.round(avgAcc));

      if (avgAcc >= 10) {
        vid.play();
      }
    }

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
    });
  });


  function startGame(){
    /*--------- Start Game -----------*/
    cloudTimer = setInterval(function(){
      var cloudID = 'c-'+cloudIndex;
      generateCloud(cloudID);
      clouds.push(cloudID);
      cloudIndex ++;      
      //clearInterval(cloudTimer);
    }, 50);
    /*---------/ Start Game -----------*/
  }

  function stopGame(){
    clearInterval(planeTimer);
    clearInterval(cloudTimer);
    $("#airPlane").hide();
  }

  function generateCloud(cloudID){

    var cloudHTML = '<span class="glyphicon glyphicon-minus cloud" id="'+ cloudID +'" style="position:absolute;"></span>';
    $('body').prepend(cloudHTML);
    
    var cloudT = windowH / 2;
    var cloudL = windowW;
    
    var flowTimer = setInterval(function(){
      cloudL = cloudL - 1;

      if (cloudL <= -5) {
        $('#' + cloudID).remove();
        clouds = removeFromArray(clouds, cloudID);
        clearInterval(flowTimer);
      } else {
        $("#"+cloudID).css({'position': 'absolute', 'top': cloudT +'px', 'left': cloudL +'px'});
      }
    }, 10);
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
