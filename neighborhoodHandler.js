'use strict';

import geo from './geolocation.js';

export default function() {
  const NEIGHBORHOODS =
    this != undefined && this.responseText
      ? JSON.parse(this.responseText)
      : JSON.parse(localStorage.getItem('NEIGHBORHOODS'));

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
    localStorage.setItem('NEIGHBORHOODS', JSON.stringify(NEIGHBORHOODS));
  }
}
