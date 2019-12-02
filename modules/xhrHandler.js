'use strict';

import neighborhoodHandler from './neighborhoodHandler.js';

// XHR setup via
// https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequestEventTarget/onload#Example

export default function(setLocalStorage) {
  // setLocalStorage is a boolean
  const xhr = new XMLHttpRequest();
  const method = 'GET';
  const url = 'https://data.baltimorecity.gov/resource/h3fx-54q3.geojson';

  // need to pass data to neighborhoodHandler
  // but xhr.onload = neighborhoodHandler(data) won't work,
  // so am adding the data to the xhr object itself which
  // neighborhoodHandler will have access to via `this.setLocalStorage`
  xhr.setLocalStorage = setLocalStorage;

  xhr.open(method, url, true);

  xhr.onload = neighborhoodHandler;

  xhr.send();
}
