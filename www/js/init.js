(function(window, undefined) {
    window.app = {
        goBack: function(e) {
            history.back();
            throw "Back button clicked";
        },
        showAds: function() {
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
        },
        initialize: function() {
            this.bindEvents();
        },
        bindEvents: function() {
            document.addEventListener('deviceready', this.onDeviceReady, false);
        },
        onDeviceReady: function() {
            document.addEventListener("backbutton", app.goBack, false);
            app.showAds();
        }

    }
})(window, undefined);

// init
app.initialize();