'use strict';

import { polygonContains } from 'd3-polygon';

export default function(dataObj) {
  if (!navigator.geolocation) {
    alert(
      "Sorry, the web browser can not get your device's location ☹. Maybe try updating the browser?"
    );
    return;
  } else {
    const {
      NEIGHBORHOODS,
      coordinatesEL,
      hoodWrapEl,
      neighborhoodEl,
      coordinatesWrapperEl
    } = dataObj;

    function geo_success(position) {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      const coordsAsText = `${lat}, ${long}`;
      const point = [long, lat];

      const HOOD = NEIGHBORHOODS.features.filter(feature => {
        const polygon = feature.geometry.coordinates[0][0];
        return polygonContains(polygon, point);
      });

      if (!Array.isArray(HOOD) || !HOOD.length) {
        alert(
          `It appears you're not in Baltimore. You should visit when you get the chance, it's a charming place!`
        );
        return;
      }

      const hoodName = HOOD[0].properties.label;

      function encodeHoodName(name) {
        return name
          .concat(', Baltimore')
          .replace(/\s/g, '+')
          .replace(/,/g, '%2C');
      }

      coordinatesEL.textContent = coordsAsText;
      hoodWrapEl.setAttribute(
        'href',
        `https://en.wikipedia.org/wiki/Special:Search?search=${encodeHoodName(
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
}
