(function(window, undefined) {

  // string helper
  if (typeof String.prototype.startsWith != 'function') {
    String.prototype.startsWith = function(str) {
      return this.indexOf(str) === 0;
    };
  }

  // for ios development  
  if (config.enableDebugAlert) {
    window.onerror = function(errorMsg, url, lineNumber) {
      alert(errorMsg + "|" + url + "|" + lineNumber);
    }
  }

  // app
  window.app = window.app || {};
  app.goBack = function(e) {
    var currentPath = location.hash;
    var homePath = '#/game/search';
    var gameShowPath = '#/game/show';
    var gamePlayerShowPath = '#/game/player/show';
    if (e) e.preventDefault();
    if (currentPath.startsWith(homePath)) {
      throw "Back button clicked";
    } else if (currentPath.startsWith(gameShowPath)) {
      location.hash = homePath;
    } else if (currentPath.startsWith(gamePlayerShowPath)) {
      location.hash = gameShowPath;
    } else {
      history.go(-1);
    }

    throw "Back button clicked";
  };
  app.showAds = function() {
    if (app.store.get('disableAds') == true) return;
    app.ads.setupBottomBanner();
  };
  app.initialize = function() {
    app.bindEvents();
  };
  app.bindEvents = function() {
    document.addEventListener('deviceready', app.onDeviceReady, false);
  };
  app.setupAnalytics = function() {
    app.ga = navigator.analytics;
    app.ga.setTrackingId(config.gaTrackingID);
    app.ga.trackUnhandledScriptErrors();

    // track
    app.ga.sendAppView('Home');
  };
  app.onDeviceReady = function() {
    app.setupAnalytics();
    navigator.app && navigator.app.overrideBackbutton(true);
    document.addEventListener("backbutton", app.goBack, false);
    if (config.showAds) app.showAds();
  };
})(window, undefined);

// init
app.initialize();