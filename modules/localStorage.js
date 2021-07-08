'use-strict';

function isAvailable() {
  // via https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#Testing_for_availability

  let storage;
  try {
    storage = window.localStorage;
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === 'QuotaExceededError' ||
        // Firefox
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
  /**
   * use it like:
   *
   * ```js
   if (storageAvailable('localStorage')) {
      // Yippee! We can use localStorage awesomeness
    }
    else {
      // Too bad, no localStorage for us
    }
   * ```
   *
   */
}

function get(item) {
  return localStorage.getItem(item);
}

function set(item, value) {
  localStorage.setItem(item, value);
}

function remove(item) {
  localStorage.removeItem(item);
}

export { isAvailable, get, set, remove };
