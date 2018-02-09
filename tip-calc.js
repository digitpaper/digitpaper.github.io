/*
 * Digit Paper
 * Copyright 2018 Chutian Gao
 * Licensed under the Apache 2.0 license (https://digitpaper.github.io/LICENSE)
 */
(function(){

  $(window).ready(function(){

    $("#playBtn").click(function(){
      var myPlayer = $("#player")[0];

      if (myPlayer.paused){
        myPlayer.play();
      }
      else {
        myPlayer.pause();
      }
    });
  });


function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};


})();
