console.log("content.js loaded");
$(document).keydown(function (e) {
    console.log("keydown");
    console.log("keycode: "+e.keyCode);
    console.log("timestamp:" +e.timeStamp);
    console.log("key: "+e.key);
});


