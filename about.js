(function(){
  $(window).ready(function(){
    $('#athBtn').click(function(){
      $('#athBtn').popover('toggle');
    });

	var action = getUrlParameter('action');

	$("h1").html(action);

  });

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};


function post_data(url, data, success_handler, error_handler) {

	/*
var success_handler = fucntion(){};
    var error_handler = fucntion(){};
    var url = '';
    var data = {

    };
    post_data(url);
	*/
    $.ajax({
      url: url,
      type: 'POST',
      contentType: 'application/json; charset=UTF-8',
      dataType: 'json',
      data: JSON.stringify(data),
      success: function(response) {
        success_handler(response);
      },
      error: function() {
        error_handler();
      }
    });
  }
})();

