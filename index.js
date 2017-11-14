
(function(){

    $(window).ready(function(){
        $("#athBtn").click(function(){
        	$("#popOver").popover();
        });

        $('[data-toggle="popover"]').popover();
    });
})();
