/*
 * Digit Paper
 * Copyright 2018 Chutian Gao
 * Licensed under the Apache 2.0 license (https://digitpaper.github.io/LICENSE)
 */
(function(){

  $(window).ready(function(){

    $("#calcBtn").click(function(){
      var totalCharge = $("#totalCharge").val();
      var numPeople   = $("#numPeople").val();
      var tipRate     = $("#tipRate").val();
    
      var tips = parseFloat(totalCharge) * parseInt(tipRate)/100;
      var totalPay = parseFloat(totalCharge) * (1+ parseInt(tipRate)/100);
      var perPerson = totalPay / parseInt(numPeople);
      
      console.log(tips);
      console.log(totalPay);
      console.log(perPerson);
      
    });
  });


function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};


})();
