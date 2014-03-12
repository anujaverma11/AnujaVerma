// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require jquery.ui.all
//= require jquery.fullPage

$(document).ready(function() {
  $.fn.fullpage({
    menu: '.navbar',
    verticalCentered: true,
    resize : false,
    anchors:['firstPage', 'secondPage', 'thirdPage', 'fourthPage'],
		navigation: true,
		navigationPosition: 'right',
		navigationTooltips:['firstPageTooltip', 'secondPageTooltip', 'thirdPageTooltip', 'fourthPageTooltip'],
		css3: true
  });
});

//= require turbolinks
//= require bootstrap
//= require_tree .
