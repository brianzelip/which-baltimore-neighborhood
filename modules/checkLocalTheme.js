'use stric';

import * as ls from './localStorage';

if (ls.isAvailable()) {
  if (ls.get('THEME')) {
    const bodyEl = document.querySelector('body');
    bodyEl.setAttribute('class', ls.get('THEME'));
    console.log('Awesome, localStorage.THEME exists!');
  } else {
    console.log('localStorage.THEME does not yet exist, but soon should.');
  }
}
