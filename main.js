(function() {
  // XHR setup via
  // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequestEventTarget/onload#Example

  const xhr = new XMLHttpRequest();
  const method = 'GET';
  const url = 'https://data.baltimorecity.gov/resource/h3fx-54q3.geojson';

  xhr.open(method, url, true);

  xhr.onload = function() {
    const NEIGHBORHOODS = JSON.parse(this.responseText);

    const latEl = document.getElementById('lat');
    const longEl = document.getElementById('long');
    const neighborhoodEl = document.getElementById('neighborhood');

    if (!navigator.geolocation) {
      alert("Sorry, your browser doesn't have geolocation functionality ☹.");
      return;
    } else {
      function geo_success(position) {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        const point = [long, lat];

        latEl.innerHTML = lat;
        longEl.innerHTML = long;

        const answer = NEIGHBORHOODS.features.filter(feature => {
          const polygon = feature.geometry.coordinates[0][0];
          return d3.polygonContains(polygon, point);
        });

        neighborhoodEl.innerHTML = answer[0].properties.label;

        console.log('position is: ', position);
        console.log('ANSWER!!!!!:', answer);
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
