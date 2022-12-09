'use strict';

// With background scripts you can communicate with popup
// and contentScript files.
// For more information on background script,
// See https://developer.chrome.com/extensions/background_pages

import * as tf from '@tensorflow/tfjs';
console.log('This is background service worker');

function computePrediction(model, host, tabId) {
  chrome.storage.sync.get([host], function (result) {
    function sendPrediction(prediction) {
      chrome.tabs.sendMessage(tabId, {
        type: 'SEND_PREDICTION',
        payload: prediction,
      });
    }

    if (result[host] != undefined) {
      console.log('Website already exists. Returning prediction');
      sendPrediction(result[host]);
    } else {
      console.log('New website. Generating new prediction');
      let prediciion = model
        .predict(tf.randomUniform([1, 1, 27], 0, 1))
        .dataSync();
      const payload = Array.from(prediciion);
      chrome.storage.sync.set({ [host]: payload }).then(() => {
        console.log('Prediction is set to ' + payload);
        sendPrediction(payload);
      });
    }
  });
}

async function tensorflow() {
  // Load the model.
  const model = await tf.loadGraphModel('http://localhost:8080/model.json');
  console.log('Model loaded');

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'REQUEST_PREDICTION') {
      //tab id
      const tabId = sender.tab.id;
      const message = 'Hi bit, computing prediction';
      // Log message coming from the `request` parameter
      console.log(request.payload.message);
      console.log('host in tf: ' + request.payload.host);
      computePrediction(model, request.payload.host, tabId);
      // Send a response message
      sendResponse({
        message: message
      });
    }
  });
}
tensorflow();

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status !== 'complete') return;
  //get hostname
  let hostname = new URL(tab.url).hostname;
  // Enable Privacy
  chrome.tabs.sendMessage(tabId, {
    type: 'enablePrivacy',
    payload: { host: hostname },
  });
});

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

//   function generateNewPrediction() {
//     //get tab id
//     const tabId = sender.tab.id;
//     //get hostname
//     let hostname = new URL(sender.tab.url).hostname;
//     chrome.tabs.sendMessage(tabId, {
//       type: 'REQUEST_PREDICTION',
//       payload: { host: hostname },
//     });
//   }
//   if (request.type === 'regeneratePrediction') {
//     //get tab id
//     const tabId = sender.tab.id;
//     //get hostname
//     let hostname = new URL(sender.tab.url).hostname;
//   }
// });
