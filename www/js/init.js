(function(window, undefined) {

  // string helper
  if (typeof String.prototype.startsWith != 'function') {
    String.prototype.startsWith = function(str) {
      return this.indexOf(str) === 0;
    };
  }

  // app
  window.app = window.app || {};
  app.goBack = function(e) {
    var currentPath = location.hash;
    var homePath = '#/game/search';
    var gameShowPath = '#/game/show';
    var gamePlayerShowPath = '#/game/player/show';
    if (currentPath.startsWith(homePath)) {
      throw "Back button clicked";
    } else if (currentPath.startsWith(gameShowPath)) {
      location.hash = homePath;
    } else if (currentPath.startsWith(gamePlayerShowPath)) {
      location.hash = gameShowPath;
    }

    if (e) e.preventDefault();
    history.go(-1);
    throw "Back button clicked";
  };
  app.showAds = function() {
    var admobid = {};
    if (/(android)/i.test(navigator.userAgent)) { // for android
      admobid = {
        banner: 'ca-app-pub-3874400567673116/3922360588', // or DFP format "/6253334/dfp_example_ad"
        interstitial: 'ca-app-pub-xxx/yyy'
      };
    } else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) { // for ios
      admobid = {
        banner: 'ca-app-pub-3874400567673116/3922360588', // or DFP format "/6253334/dfp_example_ad"
        interstitial: 'ca-app-pub-xxx/kkk'
      };
    } else { // for windows phone
      admobid = {
        banner: 'ca-app-pub-3874400567673116/3922360588', // or DFP format "/6253334/dfp_example_ad"
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
  };
  app.initialize = function() {
    app.bindEvents();
  };
  app.bindEvents = function() {
    document.addEventListener('deviceready', app.onDeviceReady, false);
  };
  app.onDeviceReady = function() {
    navigator.app.overrideBackbutton(true);
    document.addEventListener("backbutton", app.goBack, false);
    if (config.showAds) app.showAds();
  };
})(window, undefined);

// init
app.initialize();