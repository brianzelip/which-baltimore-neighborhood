import initTheme from './modules/initTheme.js';
import themeHandler from './modules/themeHandler.js';
import * as ls from './modules/localStorage.js';
import xhrHandler from './modules/xhrHandler.js';
import neighborhoodHandler from './modules/neighborhoodHandler.js';

(function() {
  if (ls.isAvailable()) {
    // Delete old data
    if (ls.get('NEIGHBORHOODS')) {
      ls.remove('NEIGHBORHOODS');
    }
    if (!ls.get('NEIGHBORHOODSv2')) {
      console.log(
        'localstorage.NEIGHBORHOODSv2 does not yet exist, but soon should.'
      );
      xhrHandler(true);
    } else {
      console.log('Awesome, localstorage.NEIGHBORHOODSv2 exists!');
      neighborhoodHandler();
    }
  } else {
    xhrHandler(false);
  }
})();
