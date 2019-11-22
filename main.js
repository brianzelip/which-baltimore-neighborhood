import { polygonContains } from 'd3-polygon';

(function() {
  // XHR setup via
  // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequestEventTarget/onload#Example

  const xhr = new XMLHttpRequest();
  const method = 'GET';
  const url = 'https://data.baltimorecity.gov/resource/h3fx-54q3.geojson';

  xhr.open(method, url, true);

  xhr.onload = function() {
    const NEIGHBORHOODS = JSON.parse(this.responseText);

    const neighborhoodEl = document.querySelector('[data-neighborhood]');
    const coordinatesWrapperEl = document.querySelector(
      '[data-coordinates-wrapper]'
    );
    const coordinatesEL = document.createElement('pre');

    if (!navigator.geolocation) {
      alert("Sorry, your browser doesn't have geolocation functionality ☹.");
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

        const hoodName = HOOD[0].properties.label;

        function urlEncode(str) {
          return str.replace(/\s/g, '+');
        }

        coordinatesEL.textContent = coordsAsText;
        neighborhoodEl.setAttribute(
          'href',
          `https://en.wikipedia.org/wiki/Special:Search?search=${urlEncode(
            hoodName
          )}`
        );
        neighborhoodEl.innerHTML = hoodName;
        neighborhoodEl.classList.replace('hide', 'fadein');
        coordinatesWrapperEl.appendChild(coordinatesEL);
        coordinatesWrapperEl.classList.replace('hide', 'fadein');

        coordinatesEL.addEventListener('click', () => {
          if (navigator.clipboard.writeText) {
            navigator.clipboard.writeText(coordsAsText).then(
              function() {
                console.log('Coordinates written to the clipboard!');
              },
              function() {
                console.log('Coordinates failed to write to the clipboard');
              }
            );
          } else {
            console.log('NO navigator.clipboard.writeText');
          }
        });

        console.log('position is: ', position);
        console.log('ANSWER!!!!!:', HOOD);
      }

      function geo_error() {
        alert('Sorry, no position available.');
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
