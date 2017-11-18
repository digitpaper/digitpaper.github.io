(function(){
  $(window).ready(function(){
    $('#athBtn').click(function(){
      $('#athBtn').popover('toggle');
    });
  });

function post_data(url, data, success_handler, error_handler) {
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

