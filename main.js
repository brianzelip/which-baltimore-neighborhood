import themeHandler from './modules/themeHandler.js';
import storageAvailable from './modules/storageAvailable.js';
import xhrHandler from './modules/xhrHandler.js';
import neighborhoodHandler from './modules/neighborhoodHandler.js';

(function() {
  if (storageAvailable('localStorage')) {
    if (!localStorage.getItem('NEIGHBORHOODS')) {
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
