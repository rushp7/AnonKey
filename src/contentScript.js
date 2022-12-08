'use strict';
var $ = require('jquery');
// Content script file will run in the context of web page.
// With content script you can manipulate the web pages using
// Document Object Model (DOM).
// You can also pass information to the parent extension.

// We execute this script by making an entry in manifest.json file
// under `content_scripts` property

// For more information on Content Scripts,
// See https://developer.chrome.com/extensions/content_scripts

// Log `title` of current active web page
const pageTitle = document.head.getElementsByTagName('title')[0].innerHTML;
console.log(
  `Page title is: '${pageTitle}' - evaluated by Chrome extension's 'contentScript.js' file`
);

// Communicate with background file by sending a message
chrome.runtime.sendMessage(
  {
    type: 'GREETINGS',
    payload: {
      message: 'Hello, my name is Con. I am from ContentScript.',
    },
  },
  (response) => {
    console.log(response.message);
  }
);

function sleepRand(time) {
  var now = new Date().getTime();
  var end = now + Math.random() * parseInt(time) + 1;
  while (new Date().getTime() < end) {
    /* do nothing */
  }
}

function sleep(ms) {
  var now = new Date().getTime();
  var end = now + parseInt(ms) + 1;
  while (new Date().getTime() < end) {
    /* do nothing */
  }
}

chrome.runtime.sendMessage(
  {
    type: 'REQUEST_PREDICTION',
    payload: {
      message: 'Hello, my name is Con. Pls give prediction.',
    },
  },
  (response) => {
    console.log(response.message);
    console.log(response.payload);

    function detsleep(keycode) {
      if (keycode == 32) sleep(response.payload[26]);
      else if (keycode >= 65 && keycode <= 90)
        sleep(response.payload[keycode - 65]);
      else sleep(response.payload[26]);
    }
    $(':input:text').keydown(function (e) {
      console.log(e.keyCode);
      detsleep(e.keyCode);
    });
    $(':input:text').keyup(function (e) {
      console.log("2");
      detsleep(e.keyCode);
    });
    $('input[type=text], textarea').keyup(function (e) {
      console.log("3");
      detsleep(e.keyCode);
    });
  }

    
 
);

// $(':input:text').keydown(function (e) {
//   var shouldSleep =
//     Math.round(Math.random()) < 0.5 ? sleepRand(200) : false;
// });

// $(':input:text').keyup(function (e) {
//   var shouldSleep =
//     Math.round(Math.random()) < 0.5 ? sleepRand(200) : false;
// });

// $('input[type=text], textarea').keyup(function (e) {
//   var shouldSleep =
//     Math.round(Math.random()) < 0.5 ? sleepRand(200) : false;
// });

// // Listen for message
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.type === 'COUNT') {
//     console.log(`Current count is ${request.payload.count}`);
//   }

//   // Send an empty response
//   // See https://github.com/mozilla/webextension-polyfill/issues/130#issuecomment-531531890
//   sendResponse({});
//   return true;
// });
