'use stric';

import * as ls from './localStorage';
import { dataImageUrl } from './topography.js';

if (ls.isAvailable()) {
  if (ls.get('THEME')) {
    const theme = ls.get('THEME');

    document.body.style.backgroundImage = dataImageUrl(theme);
    document.body.setAttribute('class', theme);
    console.log('Awesome, localStorage.THEME exists!');
  } else {
    document.body.style.backgroundImage = dataImageUrl('dark');
    console.log('localStorage.THEME does not yet exist, but soon should.');
  }
}
