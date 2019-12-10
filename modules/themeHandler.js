'use strict';

import { dataImageUrl } from './topography.js';
import * as ls from './localStorage.js';

document.body.style.backgroundImage = dataImageUrl('dark');
const buttonEl = document.querySelector('button');

buttonEl.addEventListener('click', function() {
  let currentTheme = document.body.className;

  if (currentTheme === 'dark') {
    document.body.className = 'light';
    document.body.style.backgroundImage = dataImageUrl('light');
    setLocalTheme('light');
  } else if (currentTheme === 'light') {
    document.body.className = 'dark';
    document.body.style.backgroundImage = dataImageUrl('dark');
    setLocalTheme('dark');
  }
});

function setLocalTheme(theme) {
  if (ls.isAvailable()) {
    localStorage.setItem('THEME', theme);
  }
}
