﻿// Generated by CoffeeScript 1.8.0
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
 */;
var AppRate, Locales, exec;

Locales = require('./locales');

exec = require('cordova/exec');

AppRate = (function () {
    var FLAG_NATIVE_CODE_SUPPORTED, LOCALE_DEFAULT, LOCAL_STORAGE_COUNTER, counter, getAppTitle, getAppVersion, localStorageParam, navigateToAppStore, promptForRatingWindowButtonClickHandler, showDialog, updateCounter;

    function AppRate() { }

    LOCAL_STORAGE_COUNTER = 'counter';

    LOCALE_DEFAULT = 'en';

    FLAG_NATIVE_CODE_SUPPORTED = /(iPhone|iPod|iPad|Android)/i.test(navigator.userAgent.toLowerCase());

    counter = {
        applicationVersion: void 0,
        countdown: 0
    };

    navigateToAppStore = function () {
        if (/(iPhone|iPod|iPad)/i.test(navigator.userAgent.toLowerCase())) {
            exec(null, null, 'AppRate', 'launchAppStore', [AppRate.preferences.storeAppURL.ios]);
        } else if (/(Android)/i.test(navigator.userAgent.toLowerCase())) {
            window.open(AppRate.preferences.storeAppURL.android, '_system');
        } else if (/(BlackBerry)/i.test(navigator.userAgent.toLowerCase())) {
            window.open(AppRate.preferences.storeAppURL.blackberry, '_system');
        } else if (/(IEMobile)/i.test(navigator.userAgent.toLowerCase())) {
            window.open(AppRate.preferences.storeAppURL.windows8, '_system');
        }
        return AppRate;
    };

    promptForRatingWindowButtonClickHandler = function (buttonIndex) {
        switch (buttonIndex) {
            case 1:
                updateCounter('stop');
                break;
            case 2:
                updateCounter('reset');
                break;
            case 3:
                updateCounter('stop');
                navigateToAppStore();
        }
        return AppRate.onButtonClicked(buttonIndex);
    };

    updateCounter = function (action) {
        if (action == null) {
            action = 'increment';
        }
        switch (action) {
            case 'increment':
                if (counter.countdown <= AppRate.preferences.usesUntilPrompt) {
                    counter.countdown++;
                }
                break;
            case 'reset':
                counter.countdown = 0;
                break;
            case 'stop':
                counter.countdown = AppRate.preferences.usesUntilPrompt + 1;
        }
        localStorageParam(LOCAL_STORAGE_COUNTER, JSON.stringify(counter));
        return counter;
    };

    showDialog = function () {
        var localeObj;
        if (counter.countdown === AppRate.preferences.usesUntilPrompt) {
            localeObj = AppRate.preferences.customLocale || Locales.getLocale(AppRate.preferences.useLanguage, AppRate.preferences.displayAppName) || Locales.getLocale(LOCALE_DEFAULT, AppRate.preferences.displayAppName);
            navigator.notification.confirm(localeObj.message, promptForRatingWindowButtonClickHandler, localeObj.title, [localeObj.cancelButtonLabel, localeObj.laterButtonLabel, localeObj.rateButtonLabel]);
        }
        return AppRate;
    };

    localStorageParam = function (itemName, itemValue, action) {
        if (itemValue == null) {
            itemValue = null;
        }
        if (action == null) {
            action = false;
        }
        if (itemValue !== null) {
            action = true;
        }
        switch (action) {
            case true:
                localStorage.setItem(itemName, itemValue);
                break;
            case false:
                return localStorage.getItem(itemName);
            case null:
                localStorage.removeItem(itemName);
        }
        return this;
    };

    getAppVersion = function (successCallback, errorCallback) {
        if (FLAG_NATIVE_CODE_SUPPORTED) {
            exec(successCallback, errorCallback, 'AppRate', 'getAppVersion', []);
        } else {
            successCallback(counter.applicationVersion);
        }
        return AppRate;
    };

    getAppTitle = function (successCallback, errorCallback) {
        if (FLAG_NATIVE_CODE_SUPPORTED) {
            exec(successCallback, errorCallback, 'AppRate', 'getAppTitle', []);
        } else {
            successCallback(AppRate.preferences.displayAppName);
        }
        return AppRate;
    };

    AppRate.init = function () {
        counter = JSON.parse(localStorageParam(LOCAL_STORAGE_COUNTER)) || counter;
        getAppVersion((function (_this) {
            return function (applicationVersion) {
                if (counter.applicationVersion !== applicationVersion) {
                    counter.applicationVersion = applicationVersion;
                    if (_this.preferences.promptAgainForEachNewVersion) {
                        updateCounter('reset');
                    }
                }
                return _this;
            };
        })(this));
        getAppTitle((function (_this) {
            return function (displayAppName) {
                _this.preferences.displayAppName = displayAppName;
                return _this;
            };
        })(this));
        return this;
    };

    AppRate.preferences = {
        useLanguage: null,
        displayAppName: '',
        promptAgainForEachNewVersion: true,
        usesUntilPrompt: 3,
        storeAppURL: {
            ios: void 0,
            android: void 0,
            blackberry: void 0,
            windows8: void 0
        },
        customLocale: null
    };

    AppRate.promptForRating = function () {
        if (this.preferences.useLanguage === null) {
            navigator.globalization.getPreferredLanguage((function (_this) {
                return function (language) {
                    _this.preferences.useLanguage = language.value.split(/-/)[0];
                    return showDialog();
                };
            })(this));
        } else {
            showDialog();
        }
        updateCounter();
        return this;
    };

    AppRate.onButtonClicked = function (buttonIndex) {
        console.log("onButtonClicked->" + buttonIndex);
        return this;
    };

    return AppRate;

})();

AppRate.init();

module.exports = AppRate;
