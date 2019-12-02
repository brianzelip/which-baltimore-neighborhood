import { dataImageUrl } from './topography.js';
import storageAvailable from './storageAvailable.js';
import geo from './geolocation.js';

(function() {
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

  // XHR setup via
  // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequestEventTarget/onload#Example

  const xhr = new XMLHttpRequest();
  const method = 'GET';
  const url = 'https://data.baltimorecity.gov/resource/h3fx-54q3.geojson';

  xhr.open(method, url, true);

  xhr.onload = function() {
    const NEIGHBORHOODS = JSON.parse(this.responseText);

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
  };

  xhr.send();
})();
