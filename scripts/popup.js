var togglePrivacy = async function () {
  let status = await chrome.storage.sync.get(["privacyStatus"]);
  if (status.privacyStatus === "enabled") {
    chrome.storage.sync.set({ privacyStatus: "disabled" });
  } else {
    chrome.storage.sync.set({ privacyStatus: "enabled" });
    chrome.runtime.sendMessage({ name: "enablePrivacyMode" });
  }
  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.reload(tab.id);
    setTimeout(function() {window.close();}, 1000);
});
};


document.addEventListener("DOMContentLoaded", function () {
  chrome.storage.sync.get({"privacyStatus": 'disabled'}).then((result) => {
    console.log("Value currently is " + result.privacyStatus);
    let toggleButton = document.getElementById("toggleButton");
    if (result.privacyStatus == "enabled")
      toggleButton.checked = true;
    else if (result.privacyStatus == "disabled")
      toggleButton.checked = false;
  
  });
  document
    .getElementById("togglePrivacy")
    .addEventListener("click", togglePrivacy);
});



// $("#togglePrivacy").on("click", function (e) {
//   console.log("togglePrivacy clicked");
//   e.preventDefault();
//   togglePrivacy();
//   // chrome.tabs.getSelected(null, function(tab) {
//   //     chrome.tabs.reload(tab.id);
//   //     setTimeout(function() {window.close();}, 1000);
//   // });
// });

// $("#togglePrivacy").on("click", function (e) {
//   console.log("togglePrivacy clicked");
//   togglePrivacy();
// });

// $(":input:text").keydown(function (e) {
//   var now = new Date().getTime();
// 	var end = (now + 1000);
//   console.log("now: "+now);
//   console.log("End: " + end);
//   while(new Date().getTime() < end){ /* do nothing */ }

//   console.log("keydown");
//   console.log("keycode: " + e.keyCode);
//   console.log("timestamp:" + e.timeStamp);
//   console.log("key: " + e.key);
// });

// $(":input:text").keyup(function(e) {
//   console.log("keyup");
// });

// $('input[type=text], textarea').keyup(function(e) {
//   console.log("keyup2");
// })
