// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.

window.isTestAd = true;

(function () {
    'use strict';

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    FastClick.attach(document.body);

    function onDeviceReady() {

        // Handle the Cordova events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);
        document.addEventListener('showkeyboard', onShowKeyboard.bind(this), false);
        document.addEventListener('hidekeyboard', onHideKeyboard.bind(this), false);
        
        initAd();

        // display a banner at startup
        window.plugins.AdMob.createBannerView();
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };

    function onShowKeyboard() {
        $('#footer').removeClass('footer-normal').addClass('footer-keyboard');
    };

    function onHideKeyboard() {
        setTimeout(function () { $('#footer').removeClass('footer-keyboard').addClass('footer-normal'); }, 50);
    };

    function initAd() {
        if (window.plugins && window.plugins.AdMob) {
            var ad_units = {
                ios: {
                    banner: 'ca-app-pub-9482841268275923/6581127297',
                    interstitial: ''
                },
                android: {
                    banner: 'ca-app-pub-9482841268275923/4475283296',
                    interstitial: ''
                },
                wp8: {
                    banner: 'ca-app-pub-9482841268275923/4475283296',
                    interstitial: ''
                }
            };
            var admobid = "";
            if (/(android)/i.test(navigator.userAgent)) {
                admobid = ad_units.android;
            } else if (/(iphone|ipad)/i.test(navigator.userAgent)) {
                admobid = ad_units.ios;
            } else {
                admobid = ad_units.wp8;
            }

            window.plugins.AdMob.setOptions({
                publisherId: admobid.banner,
                interstitialAdId: admobid.interstitial,
                bannerAtTop: false, // set to true, to put banner at top
                overlap: false, // set to true, to allow banner overlap webview
                offsetTopBar: true, // set to true to avoid ios7 status bar overlap
                isTesting: window.isTestAd, // receiving test ad
                autoShow: true // auto show interstitial ad when loaded
            });

            registerAdEvents();

        } else {
            console.log('admob plugin not ready');
        }
    };


    function registerAdEvents() {
        document.addEventListener('onReceiveAd', function () { });
        document.addEventListener('onFailedToReceiveAd', function (data) { });
        document.addEventListener('onPresentAd', function () { });
        document.addEventListener('onDismissAd', function () { });
        document.addEventListener('onLeaveToAd', function () { });
        document.addEventListener('onReceiveInterstitialAd', function () { });
        document.addEventListener('onPresentInterstitialAd', function () { });
        document.addEventListener('onDismissInterstitialAd', function () { });
    };
})();