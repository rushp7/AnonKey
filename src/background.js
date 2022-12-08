'use strict';

// With background scripts you can communicate with popup
// and contentScript files.
// For more information on background script,
// See https://developer.chrome.com/extensions/background_pages

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'GREETINGS') {
    const message = `Hi ${
      sender.tab ? 'Con' : 'Pop'
    }, my name is Bac. I am from Background. It's great to hear from you.`;

    // Log message coming from the `request` parameter
    console.log(request.payload.message);
    // Send a response message
    sendResponse({
      message,
    });
  }
});

import * as tf from "@tensorflow/tfjs";
console.log("This is background service worker - edit me!");

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.type === 'GREETINGS') {
//     const message = `Hi ${
//       sender.tab ? 'Con' : 'Pop'
//     }, my name is Bac. I am from Background. It's great to hear from you.`;

//     // Log message coming from the `request` parameter
//     console.log(request.payload.message);
//     // Send a response message
//     sendResponse({
//       message,
//     });
//   }
// });




  

async function tensorflow() {

  // Load the model.
  const model = await tf.loadGraphModel("http://localhost:8080/model.json");
  let prediciion = model.predict(tf.zeros([1, 1, 27])).dataSync();
  const payload = Array.from(prediciion)

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'REQUEST_PREDICTION') {
      const message = "Hi bit"

      // Log message coming from the `request` parameter
      console.log(request.payload.message);
      // Send a response message
      sendResponse({
        message,
        payload
      });
    }
  })



}
async function loadmodel(){
  const model = await tf.loadGraphModel("http://localhost:8080/model.json");
  let prediciion = model.predict(tf.zeros([1, 1, 27])).dataSync();
  const predArray = Array.from(prediciion)
  console.log(predArray)

}

tensorflow();
