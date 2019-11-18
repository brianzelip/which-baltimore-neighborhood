(function() {
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
