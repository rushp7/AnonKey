// console.log("content.js loaded");
// (() => {
//   chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     let domain = request.domain;
//     console.log("Content domain: " + domain);
//   });

//   function sleepRand(time) {
//     var now = new Date().getTime();
//     var end = now + Math.random() * parseInt(time) + 1;
//     while (new Date().getTime() < end) {
//       /* do nothing */
//     }
//   }

//   sendResponse({ message: "ok" });
//   $(":input:text").keydown(function (e) {
//     var shouldSleep =
//       Math.round(Math.random()) < 0.5 ? sleepRand(request.KP_dwelltime) : false;
//   });

//   $(":input:text").keyup(function (e) {
//     var shouldSleep =
//       Math.round(Math.random()) < 0.5 ? sleepRand(request.KP_gaptime) : false;
//   });

//   $("input[type=text], textarea").keyup(function (e) {
//     var shouldSleep =
//       Math.round(Math.random()) < 0.5 ? sleepRand(request.KP_gaptime) : false;
//   });

//   chrome.runtime.onMessage.addListener(function (
//     request,
//     sender,
//     sendResponse
//   ) {
//     if (request.name == "enablePrivacyMode") {
//       sendResponse({ message: "ok" });
//       $(":input:text").keydown(function (e) {
//         var now = new Date().getTime();
//         var end = now + 1000;
//         console.log("now: " + now);
//         console.log("End: " + end);
//         while (new Date().getTime() < end) {
//           /* do nothing */
//         }

//         console.log("keydown");
//         console.log("keycode: " + e.keyCode);
//         console.log("timestamp:" + e.timeStamp);
//         console.log("key: " + e.key);
//       });

//       $(":input:text").keyup(function (e) {
//         console.log("keyup");
//       });

//       $("input[type=text], textarea").keyup(function (e) {
//         console.log("keyup2");
//       });
//     }
//   });
// })();
