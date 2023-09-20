'use strict';

import './popup.css';
var $ = require('jquery');

(function () {
  $('.effect1').on('click', function (e) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      //get tab hostname
      var url = new URL(tabs[0].url);
      var hostname = url.hostname;

      chrome.storage.sync.remove(hostname, function () {
        console.log('removed' + hostname);
        chrome.tabs.reload(tabs[0].id);
        setTimeout(function() {window.close();}, 1000);
      });
    });
  });
})();
