angular.module('dinnerDecisionApp')
.factory("guidGenerator", function () {
    var generatePart = function () {
        var guidPartNumber = (Math.random() * 0x10000) | 0;
        return (guidPartNumber + 0x10000).toString(16).substring(1).toUpperCase();
    };

    return function() {
        return generatePart()
            + generatePart()
            + "-"
            + generatePart()
            + "-"
            + generatePart()
            + "-"
            + generatePart()
            + "-"
            + generatePart()
            + generatePart()
            + generatePart();
    };
})