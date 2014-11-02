dinner-decision
===============

## Setup
1. Get a Client Id and Client Secret from Foursquare: https://foursquare.com/developers/apps

2. Add a secrets.js file to the root of the DinnerDecisionApp solution that contains:

        var GLOBAL_SECRETS =
        {
            "foursquareClientId": "<YOUR FOURSQUARE CLIENT ID>",
            "foursquareClientSecret": "<YOUR FOURSQUARE CLIENT SECRET>"
        };

## Publish
1. Increment the Version Number and Android Version Code in config.xml.
2. Increment the Version Numbers in about.html.
2. Generate Android keystore
        
        keytool -genkey -v -keystore dinner-decision.keystore -alias dinner-decision -keyalg RSA -keysize 2048 -validity 10000
        
2. Populate ant.properties file with values used during keystore generation.
3. In index.js, set the admob testing parameter to false.
4. Set build configuration to Android Emulator / Distribution.
5. Upload the signed apk from the bin/Android/Distribution folder to the Google Play Store. 
