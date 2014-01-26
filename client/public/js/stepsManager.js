var StepsManger = function() {
  var $display = $('#pregame');

  function goToStep(id) {
    $('#step1, #step2, #step3, #step4').hide(0);
    $('#step'+id).show(0);
  }

  function boot() {
    $('#step2, #step3, #step4').hide(0);
  }

  return {
    goTo: goToStep,
    boot: boot
  };
}

var STEPS = new StepsManger();
