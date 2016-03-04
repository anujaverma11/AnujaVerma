$(document).ready(function() {
  if ( $('.fullpage-home').length ) {
    $.fn.fullpage({
      menu: '.navbar',
      verticalCentered: true,
      resize : false,
      anchors:['firstPage', 'secondPage', 'thirdPage', 'fourthPage'],
      navigation: true,
      navigationPosition: 'right',
      navigationTooltips:['Home', 'Skills', 'Projects', 'Contact'],
      css3: true
    });
  }
});
