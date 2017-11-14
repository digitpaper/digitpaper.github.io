

(function(){

    $(window).ready(function(){
    	$('#athBtn').click(function(){
        	$('#athBtn').popover('toggle');
        });

        window.ondevicemotion = function(event) {
          ax = event.accelerationIncludingGravity.x
          ay = event.accelerationIncludingGravity.y
          az = event.accelerationIncludingGravity.z
          rotation = event.rotationRate;
          if (rotation != null) {
            arAlpha = Math.round(rotation.alpha);
            arBeta = Math.round(rotation.beta);
            arGamma = Math.round(rotation.gamma);
          }
          $("#alpha").html(arAlpha);
        }



    });
})();
