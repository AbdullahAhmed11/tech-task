import '@testing-library/jest-dom';
import 'whatwg-fetch';

window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener: function() {},
    removeListener: function() {}
  };
}