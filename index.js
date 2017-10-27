window.addEventListener("DOMContentLoaded", function() {
  function setInputToMouse() {
    document.body.setAttribute('input-type', 'mouse')
    document.removeEventListener('mousemove', setInputToMouse);
    document.addEventListener('touchstart', setInputToTouch);
  }

  function setInputToTouch() {
    document.body.setAttribute('input-type', 'touch')
    document.removeEventListener('touchstart', setInputToTouch);
    document.addEventListener('mousemove', setInputToMouse);
  }

  document.addEventListener('mousemove', setInputToMouse);
  document.addEventListener('touchstart', setInputToTouch);

  if (!$E.isDebugMode) { // Can be set to package variable
    let App = new Module.App();
  } else {
    $E.App = new Module.App();
  }
}, false);