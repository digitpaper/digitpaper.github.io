/*
 * Digit Paper Top Gun
 * Copyright 2017 Chutian Gao
 * Licensed under the Apache 2.0 license (https://digitpaper.github.io/LICENSE)
 */
(function(){

  var snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");

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
  noSleep.enable();

  //var vid = $("#alertSound")[0];

  $("#cautionTitle").hide();

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

      if (avgAcc >= 10 || avgAcc <= -10) {
        snd.play();
        $("#cautionTitle").show();
        setTimeout(function(){ $("#cautionTitle").hide(); }, 3000);
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
