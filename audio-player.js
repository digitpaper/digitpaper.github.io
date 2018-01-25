/*
 * Digit Paper
 * Copyright 2017 Chutian Gao
 * Licensed under the Apache 2.0 license (https://digitpaper.github.io/LICENSE)
 */
(function(){

  var audioURL = '';
  var playTime = 0;

  $(window).ready(function(){
    audioURL = getUrlParameter('src'); 
    updateSrcAndPlay(audioURL);
  });


function updateSrcAndPlay(sourceUrl) {
    
    $("#player-src").attr("src", sourceUrl);
    
    var audio = $("#player");
    audio[0].pause();
    audio[0].load();//suspends and restores all audio element

    var savedTime = getCookie("src" + sourceUrl);

    audio[0].oncanplaythrough = audio[0].play();

    if (savedTime) {    
      var r = confirm('Resume last track?');
      if (r) {
        playTime = savedTime;
        audio[0].currentTime = savedTime;
        console.log('[Resume] ' + savedTime);
      }
    } else {
      var saveTimeName = 'src' + sourceUrl;
      var savedTime = 0;
      playTime = 0;
      setCookie(saveTimeName, savedTime, 7);
      console.log('[New Play] ' + savedTime);
    }

    updateTimer(sourceUrl, audio[0]);
}


function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};


function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function updateTimer(src, player){
  var saveTimeName = 'src' + src;  
  setInterval(function(){
    var currentTime = player.currentTime;
    setCookie(saveTimeName,currentTime,7)
  }, 3000); // Every 3 seconds
}


})();

