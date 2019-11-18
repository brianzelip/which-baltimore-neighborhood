(function() {
  // XHR setup via
  // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequestEventTarget/onload#Example

  let NEIGHBORHOODS;
  console.log('1', typeof NEIGHBORHOODS);
  const xhr = new XMLHttpRequest();
  const method = 'GET';
  const url = 'https://data.baltimorecity.gov/resource/h3fx-54q3.geojson';

  xhr.open(method, url, false);

  xhr.onload = function() {
    NEIGHBORHOODS = JSON.parse(this.responseText);
    console.log('2', typeof NEIGHBORHOODS);
  };

  xhr.send();
  console.log('3', typeof NEIGHBORHOODS);

  const lat = document.getElementById('lat');
  const long = document.getElementById('long');

  if (!navigator.geolocation) {
    alert('FUCK! NO GEO YO!');
    return;
  } else {
    function geo_success(position) {
      lat.innerHTML = position.coords.latitude;
      long.innerHTML = position.coords.longitude;
      console.log('position is: ', position);
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
})();
