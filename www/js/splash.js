window.app = window.app || {};
app.initialize = function() {
  app.bindEvents();
};
app.bindEvents = function() {
  document.addEventListener('deviceready', app.onDeviceReady, false);
};
app.onDeviceReady = function() {
  app.setupAnalytics();
  app.setupLoader();
  app.checkServer();
};
app.setupLoader = function() {
  var line = new ProgressBar.Line('#progress-bar-container', {
    color: 'rgba(68, 68, 68, 0.8)',
    strokeWidth: 2.1,
    trailColor: "rgba(68, 68, 68, 0.2)",
    easing: "easeOut"
  });
  line.animate(1, {
    duration: 3000
  }, function() {
    // Progress bar finished
  });
};
app.enterApp = function() {
  setTimeout(function() {
    location.href = "home.html";
  }, 1500);
};
app.setupAnalytics = function() {
  app.ga = navigator.analytics;
  app.ga.setTrackingId(config.gaTrackingID);
  app.ga.trackUnhandledScriptErrors();
  // track
  app.ga.sendAppView('Loading');
};
app.compareVersion = function(v1s, v2s) {
  var v1a = v1s.split('.');
  var v2a = v2s.split('.');
  var v1 = {
    major: parseInt(v1a[0]),
    minor: parseInt(v1a[1]),
    patch: parseInt(v1a[2])
  };
  var v2 = {
    major: parseInt(v2a[0]),
    minor: parseInt(v2a[1]),
    patch: parseInt(v2a[2])
  };

  // major
  if (v1.major > v2.major) {
    return 1;
  } else if (v1.major < v2.major) {
    return -1;
  } else {
    // minor
    if (v1.minor > v2.minor) {
      return 1;
    } else if (v1.minor < v2.minor) {
      return -1;
    } else {
      // patch
      if (v1.patch > v2.patch) {
        return 1;
      } else if (v1.patch < v2.patch) {
        return -1;
      } else {
        return 0;
      }
    }
  }
};
app.addProgressText = function(text) {
  var textElem = $("#progress-text");
  textElem.append($('<div>').html(text));
};
app.goToStore = function(device) {
  if (device == 'android') {
    cordova.plugins.market.open('com.ty.lolcaf');
  } else if (device == 'ios') {

  } else {

  }
  navigator.app.exitApp();
};
app.checkServer = function() {
  var device = app.device.what();
  app.addProgressText("Checking version ...");
  cordova.getAppVersion.getVersionNumber().then(function(version) {
    app.addProgressText("Current: " + version);
    app.helpers.api.get({
      url: 'version.json',
      success: function(data) {
        var serverAppVersion = data.version[device];
        app.addProgressText("Latest: " + serverAppVersion.full);

        var versionDiff = app.compareVersion(version, serverAppVersion.full);
        if (versionDiff == -1) {
          // local version is old
          serverAppVersion.critical = true;
          if (serverAppVersion.critical) {
            app.addProgressText("New version detected<br>please click here to update");
            var update_btn = $("#update-app-btn");
            update_btn.css("display", "block");
            update_btn.click(function() {
              app.goToStore(device);
            })
          } else {
            var r = confirm("New version is available<br>would you like to update?");
            if (r == true) {
              app.goToStore(device);
            } else {
              app.enterApp();
            }
          }
        } else if (versionDiff == 0) {
          // same version
          app.enterApp();
        } else {
          // local version newer than server? how?
          app.enterApp();
        }
      },
      error: function(err) {
        if (err.status == 0) app.addProgressText("Network unavailable");
        app.ga.sendException(err.status + "", true);
        app.enterApp();
      }
    });
  });
};

app.initialize();