var StatusManger = function() {
  var $display = $('#connection-status');
  var timeoutHandle;

  function setStatus(newStatus, timeout) {
    if (timeoutHandle)
      clearTimeout(timeoutHandle);
    $display.text(newStatus);
    $display.removeClass('hidden');
    timeoutHandle = setTimeout(function(){
      $display.addClass('hidden');
    }, timeout);
  }

  return {
    set: setStatus
  };
}

var STATUS = new StatusManger();
