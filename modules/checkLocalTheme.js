'use stric';

import storageAvailable from './storageAvailable.js';

if (storageAvailable('localStorage')) {
  if (localStorage.getItem('THEME')) {
    const bodyEl = document.querySelector('body');
    bodyEl.setAttribute('class', localStorage.getItem('THEME'));
    console.log('Awesome, localStorage.THEME exists!');
  }
}
