'use strict';

import { dataImageUrl } from './topography.js';

document.body.style.backgroundImage = dataImageUrl('dark');
const buttonEl = document.querySelector('button');

buttonEl.addEventListener('click', function() {
  let currentTheme = document.body.className;

  if (currentTheme === 'dark') {
    document.body.className = 'light';
    document.body.style.backgroundImage = dataImageUrl('light');
  } else if (currentTheme === 'light') {
    document.body.className = 'dark';
    document.body.style.backgroundImage = dataImageUrl('dark');
  }
});
