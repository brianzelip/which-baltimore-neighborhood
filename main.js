(function() {
  const data = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {
          acres: '46.7104316029',
          shape_area: '2034706.40062',
          label: 'Abell',
          shape_leng: '5892.82777754',
          nbrdesc: 'ABELL',
          color_2: '2'
        },
        geometry: {
          type: 'MultiPolygon',
          coordinates: [
            [
              [
                [-76.61113021264933, 39.32343829965781],
                [-76.61167182075991, 39.32342545317174],
                [-76.61219164871255, 39.32340167737693],
                [-76.61241426694825, 39.32339070915425],
                [-76.6126492904304, 39.323379128350005],
                [-76.6127481489348, 39.32337425768202],
                [-76.61320840399523, 39.32335856349929],
                [-76.61324695083864, 39.323888968709284],
                [-76.61328103449621, 39.324376840998305],
                [-76.61329833395845, 39.32463098436392],
                [-76.61331166737024, 39.32480599993532],
                [-76.61332836011924, 39.3250251254909],
                [-76.6133544416925, 39.32542257104887],
                [-76.6133747068281, 39.325755040712046],
                [-76.61338767135811, 39.32593184569077],
                [-76.61339600093392, 39.32610600071865],
                [-76.61340582753225, 39.32631147163638],
                [-76.61341419940955, 39.32647171649756],
                [-76.61342697763641, 39.32671655356927],
                [-76.61344455991933, 39.32702623429525],
                [-76.6134597723198, 39.32720094513829],
                [-76.61348780264323, 39.327522877939714],
                [-76.61350240350504, 39.32778661864494],
                [-76.6135220303609, 39.32814153892228],
                [-76.61352879302498, 39.32832495648008],
                [-76.6128348238981, 39.328349925766716],
                [-76.61218340981281, 39.32838034129068],
                [-76.61162913506607, 39.32839803585529],
                [-76.61123423214453, 39.328416368528664],
                [-76.61108900028205, 39.328405999657676],
                [-76.6107364002135, 39.328433295264084],
                [-76.61066777980498, 39.32843581708082],
                [-76.6102605280342, 39.32845077821117],
                [-76.60969707181765, 39.32847637693575],
                [-76.60943533970395, 39.32849105358769],
                [-76.60942980400628, 39.32831167790705],
                [-76.60942598715376, 39.32798177191411],
                [-76.60941729826642, 39.32722025623513],
                [-76.60941702690555, 39.32719646202042],
                [-76.60941374541432, 39.32703549968518],
                [-76.60941050266423, 39.32680224596426],
                [-76.60940929600196, 39.32671560239657],
                [-76.60940670808826, 39.326412118428486],
                [-76.60940608704772, 39.32613201994383],
                [-76.60940596153765, 39.32607585774097],
                [-76.60940678717812, 39.32579883289147],
                [-76.60940962971254, 39.325561157702445],
                [-76.60940988784574, 39.325539563066336],
                [-76.60940997200555, 39.32538197343383],
                [-76.60941355031159, 39.32511936157612],
                [-76.60941623218031, 39.32478179074604],
                [-76.60941704534042, 39.32435017978602],
                [-76.60942257790198, 39.32406142643989],
                [-76.6094256559672, 39.32390076341392],
                [-76.60942765187782, 39.32379654504898],
                [-76.60943254334217, 39.323588159038316],
                [-76.60943675155697, 39.323408854196074],
                [-76.60955763062171, 39.32344322043878],
                [-76.61000678409661, 39.32344750308809],
                [-76.61060144147106, 39.32345595475556],
                [-76.61113021264933, 39.32343829965781]
              ]
            ]
          ]
        }
      }
    ]
  };
  const point = [-76.62394894614718, 39.28682415080091];
  const polygon = data.features[0].geometry.coordinates[0][0];

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
    const contains = d3.polygonContains(polygon, point);
    console.log('THE BIG QUESTION:::::', contains);
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
