window.app = window.app || {};
app.ads = app.ads || {};
app.ads.setupBottomBanner = function() {
  var admobid = {};
  var device = app.device.what();
  if (device == "android") {
    admobid = {
      banner: 'ca-app-pub-3874400567673116/3922360588',
      interstitial: 'ca-app-pub-xxx/yyy'
    };
  } else if (device == "ios") {
    admobid = {
      banner: 'ca-app-pub-3874400567673116/3922360588',
      interstitial: 'ca-app-pub-xxx/kkk'
    };
  } else {
    // probably windows phone
    admobid = {
      banner: 'ca-app-pub-3874400567673116/3922360588',
      interstitial: 'ca-app-pub-xxx/kkk'
    };
  }

  if (AdMob) {
    AdMob.createBanner({
      adId: admobid.banner,
      position: AdMob.AD_POSITION.BOTTOM_CENTER,
      autoShow: true
    });
  }
}