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
