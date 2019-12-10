'use strict';

import * as ls from './localStorage.js';
import geo from './geolocationHandler.js';

export default function() {
  const NEIGHBORHOODS =
    this != undefined && this.responseText
      ? JSON.parse(this.responseText)
      : JSON.parse(ls.get('NEIGHBORHOODS'));

  const hoodWrapEl = document.querySelector('[data-hood-wrap]');
  const neighborhoodEl = document.querySelector('[data-neighborhood]');
  const coordinatesWrapperEl = document.querySelector(
    '[data-coordinates-wrapper]'
  );
  const coordinatesEL = document.createElement('pre');
  coordinatesEL.classList.add('small');
  geo({
    NEIGHBORHOODS,
    coordinatesEL,
    hoodWrapEl,
    neighborhoodEl,
    coordinatesWrapperEl
  });

  if (this != undefined && this.setLocalStorage) {
    ls.set('NEIGHBORHOODS', JSON.stringify(NEIGHBORHOODS));
  }
}
