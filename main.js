import themeHandler from './themeHandler.js';
import storageAvailable from './storageAvailable.js';
import xhrHandler from './xhrHandler.js';
import neighborhoodHandler from './neighborhoodHandler.js';

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
