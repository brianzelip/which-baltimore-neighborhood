'use strict';

import neighborhoodHandler from './neighborhoodHandler.js';

// XHR setup via
// https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequestEventTarget/onload#Example

export default function(setLocalStorage) {
  // setLocalStorage is a boolean
  const xhr = new XMLHttpRequest();
  const method = 'GET';
  const url =
    'https://opendata.baltimorecity.gov/egis/rest/services/Hosted/Neighborhoods/FeatureServer/0/query?where=1%3D1&outFields=name&outSR=4326&f=geojson';

  // need to pass data to neighborhoodHandler
  // but xhr.onload = neighborhoodHandler(data) won't work,
  // so am adding the data to the xhr object itself which
  // neighborhoodHandler will have access to via `this.setLocalStorage`
  xhr.setLocalStorage = setLocalStorage;

  xhr.open(method, url, true);

  xhr.onload = neighborhoodHandler;

  xhr.send();
}
