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

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'enablePrivacy') runPrivacy(request.payload.host);
  if (request.type === 'SEND_PREDICTION') alterKeystrokes(request.payload);
});

function alterKeystrokes(prediction) {
  console.log('altering keystrokes');
  console.log(prediction);
  function detsleep(keycode) {
    if (keycode == 32) sleep(prediction[26]);
    else if (keycode >= 65 && keycode <= 90) sleep(prediction[keycode - 65]);
    else sleep(prediction[26]);
  }
  $('input[type=text], textarea').keyup(function (e) {
    detsleep(e.keyCode);
  });
}

function runPrivacy(host) {
  chrome.runtime.sendMessage(
    {
      type: 'REQUEST_PREDICTION',
      payload: {
        message: 'This is Con. Pls give prediction.',
        host: host,
      },
    },
    (response) => {
      console.log(response.message);
    }
  );
}
