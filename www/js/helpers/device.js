window.app = window.app || {};
app.device = app.device || {};
app.device.what = function() {
  var d = "";
  if (/(android)/i.test(navigator.userAgent)) {
    d = "android";
  } else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
    d = "ios";
  } else {
    d = "other";
  }
  return d;
}