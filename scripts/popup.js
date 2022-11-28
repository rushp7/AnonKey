let enabled = false;

var togglePrivacy = function () {
  if (!enabled) {
    alert("Privacy is now enabled");
    enabled = true;
    // setEnabledPrivacy();
    // removeWhitelistSite(siteURL);
  } else {
    alert("Privacy is now disabled");
    enabled = false;
    // setDisabledPrivacy();
    // whitelistSite(siteURL);
  }
};

$("#togglePrivacy").on("click", function (e) {
  console.log("togglePrivacy clicked");
  e.preventDefault();
  togglePrivacy();
  // chrome.tabs.getSelected(null, function(tab) {
  //     chrome.tabs.reload(tab.id);
  //     setTimeout(function() {window.close();}, 1000);
  // });
});

$(":input:text").keydown(function (e) {
  var now = new Date().getTime();
	var end = (now + 1000);
  console.log("now: "+now);
  console.log("End: " + end);
  while(new Date().getTime() < end){ /* do nothing */ }


  console.log("keydown");
  console.log("keycode: " + e.keyCode);
  console.log("timestamp:" + e.timeStamp);
  console.log("key: " + e.key);
});

$(":input:text").keyup(function(e) {
  console.log("keyup");
});

$('input[type=text], textarea').keyup(function(e) {
  console.log("keyup2");
});
