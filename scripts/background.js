chrome.tabs.onUpdated.addListener(async (tabId, tab) => {
let status = await chrome.storage.sync.get(["privacyStatus"]);
if (status.privacyStatus === "enabled") {
  chrome.tabs.sendMessage(
    tabId,
    {
      name: "enablePrivacyMode"
     
    },
    function (response) {}
  );
}
  var url = new URL(tab.url);
  var domain = url.hostname;
  console.log("domain: " + domain);
  chrome.tabs.sendMessage(tabId, {
    domain: domain,
  });
});
