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
    updateSrc(audioURL);
  });


function updateSrc(sourceUrl) {
    
    $("#player-src").attr("src", sourceUrl);
    
    var audio = $("#player");
    audio[0].pause();
    audio[0].load();//suspends and restores all audio element

    var savedTime = getCookie("src" + sourceUrl);
    if (savedTime) {
      audio[0].currentTime = savedTime;
      playTime = savedTime;
      console.log('[Resume] ' + savedTime);
    } else {
      var saveTimeName = 'src' + sourceUrl;
      var savedTime = 0;
      setCookie(saveTimeName, savedTime, 7);
      console.log('[New Play] ' + savedTime);
    }

    //audio[0].play(); changed based on Sprachprofi's comment below
    audio[0].oncanplaythrough = audio[0].play();    
}


function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};


function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
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


})();

