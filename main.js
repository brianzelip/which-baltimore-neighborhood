import { polygonContains } from 'd3-polygon';

import { dataImageUrl } from './topography.js';

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

    if (!navigator.geolocation) {
      alert(
        "Sorry, the web browser can not get your device's location ☹. Maybe try updating the browser?"
      );
      return;
    } else {
      function geo_success(position) {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        const coordsAsText = `${lat}, ${long}`;
        const point = [long, lat];

        const HOOD = NEIGHBORHOODS.features.filter(feature => {
          const polygon = feature.geometry.coordinates[0][0];
          return polygonContains(polygon, point);
        });

        if (HOOD === []) {
          alert(
            `Sorry, you appear to be outside Baltimore. You should visit, it's a charming place.`
          );
          return;
        }

        const hoodName = HOOD[0].properties.label;

        function urlEncode(str) {
          return str.replace(/\s/g, '+');
        }

        coordinatesEL.textContent = coordsAsText;
        hoodWrapEl.setAttribute(
          'href',
          `https://en.wikipedia.org/wiki/Special:Search?search=${urlEncode(
            hoodName
          )}`
        );
        neighborhoodEl.innerHTML = hoodName;
        hoodWrapEl.classList.replace('hide', 'fadein');
        coordinatesWrapperEl.appendChild(coordinatesEL);
        coordinatesWrapperEl.classList.replace('hide', 'fadein');

        coordinatesEL.addEventListener('click', () => {
          // writeText only works on FF, chrome, android at time of publishing
          navigator.clipboard.writeText(coordsAsText).then(
            function() {
              console.log('Coordinates written to the clipboard!');
            },
            function() {
              console.log('Coordinates failed to write to the clipboard');
            }
          );
        });

        console.log('position is: ', position);
        console.log('ANSWER!!!!!:', HOOD);
      }

      function geo_error() {
        alert(
          `Your position is not available. Maybe try turning on location services for your web browser.`
        );
      }

      var geo_options = {
        enableHighAccuracy: true
      };

      navigator.geolocation.getCurrentPosition(
        geo_success,
        geo_error,
        geo_options
      );
    }
  };

  xhr.send();
})();
