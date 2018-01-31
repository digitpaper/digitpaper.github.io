/*
 * Digit Paper
 * Copyright 2017 Chutian Gao
 * Licensed under the Apache 2.0 license (https://digitpaper.github.io/LICENSE)
 */
(function(){

  var audioURL = '';
  var isIos = false;


  $(window).ready(function(){

    $("#playBtn").hide();

    audioURL = getUrlParameter('src'); 
    updateSrcAndPlay(audioURL);
    isIos = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);

    if (isIos) {
      $("#playBtn").show();
    }

    $("#playBtn").click(function(){
      var myPlayer = $("#player")[0];

      if (myPlayer.paused){
        updateSrcAndPlay(audioURL);
      }
      else {
          myPlayer.pause();
      }
    });

  });


function updateSrcAndPlay(sourceUrl) {
    
    var audio = $("#player");

    audio[0].src = sourceUrl;
    audio[0].load();

    var savedTime = localStorage.getItem("src-" + sourceUrl);

    if (savedTime) {
      audio[0].currentTime = savedTime;
    }

    audio[0].oncanplaythrough = audio[0].play();
    updateTimer(sourceUrl, audio[0]);
}


function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

function updateTimer(src, player){
  var saveTimeName = 'src-' + src;  
  setInterval(function(){
    var currentTime = player.currentTime;
    localStorage.setItem(saveTimeName, currentTime)
  }, 3000); // Every 3 seconds
}


})();

