angular.module('dinnerDecisionApp')
.service('guestStaticService', function () {
    var guestList = [];

    var create = function (newGuest) {
        guestList.push({
            name: newGuest
        });
    }

    var getAll = function () {
        return guestList;
    }

    var del = function (guest) {
        guestList.splice(guestList.indexOf(guest), 1);
    }

    var delAll = function () {
        guestList.length = 0;
    }

    return {
        create: create,
        getAll: getAll,
        del: del,
        delAll: delAll
    };

});