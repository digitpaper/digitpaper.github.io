
(function(){

    $(window).ready(function(){
        $('#athBtn').popover({
        	title: "Add to Home Screen", 
        	content: '1. Click <img src="img/ios-share.svg" width="20px" height="20px"> "Share" <br>2. Click "Add to Home Screen"',
        	html: true, 
        	placement: "top"
        });

        $("#athBtn").click(function(){
			//athSpan.popover("show");
        });
    });
})();
