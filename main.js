import checkLocalTheme from './modules/checkLocalTheme.js';
import themeHandler from './modules/themeHandler.js';
import * as ls from './modules/localStorage.js';
import xhrHandler from './modules/xhrHandler.js';
import neighborhoodHandler from './modules/neighborhoodHandler.js';

(function() {
  if (ls.isAvailable()) {
    if (!ls.get('NEIGHBORHOODS')) {
      console.log(
        'localstorage.NEIGHBORHOODS does not yet exist, but soon should.'
      );
      xhrHandler(true);
    } else {
      console.log('Awesome, localstorage.NEIGHBORHOODS exists!');
      neighborhoodHandler();
    }
  } else {
    xhrHandler(false);
  }
})();
