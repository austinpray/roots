import '../styles/main.scss';

import $ from 'jquery';
import Router from './util/router';

// Import Bootstrap
import "bootstrap-sass/assets/javascripts/bootstrap/transition.js"
import "bootstrap-sass/assets/javascripts/bootstrap/alert.js"
import "bootstrap-sass/assets/javascripts/bootstrap/button.js"
import "bootstrap-sass/assets/javascripts/bootstrap/carousel.js"
import "bootstrap-sass/assets/javascripts/bootstrap/collapse.js"
import "bootstrap-sass/assets/javascripts/bootstrap/dropdown.js"
import "bootstrap-sass/assets/javascripts/bootstrap/modal.js"
import "bootstrap-sass/assets/javascripts/bootstrap/tooltip.js"
import "bootstrap-sass/assets/javascripts/bootstrap/popover.js"
import "bootstrap-sass/assets/javascripts/bootstrap/scrollspy.js"
import "bootstrap-sass/assets/javascripts/bootstrap/tab.js"
import "bootstrap-sass/assets/javascripts/bootstrap/affix.js"

// Use this variable to set up the common and page specific functions. If you
// rename this variable, you will also need to rename the namespace below.
var Sage = {
  // All pages
  'common': {
    init: function() {
      // JavaScript to be fired on all pages
    },
    finalize: function() {
      // JavaScript to be fired on all pages, after page specific JS is fired
    }
  },
  // Home page
  'home': {
    init: function() {
      // JavaScript to be fired on the home page
    },
    finalize: function() {
      // JavaScript to be fired on the home page, after the init JS
    }
  },
  // About us page, note the change from about-us to about_us.
  'about_us': {
    init: function() {
      // JavaScript to be fired on the about us page
    }
  }
};

// Load Events
$(document).ready(new Router(Sage).loadEvents);
