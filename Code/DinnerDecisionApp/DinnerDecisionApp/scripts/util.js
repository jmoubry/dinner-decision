var util = {
    compareObjectNames: function (a, b) {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    }
};

Array.prototype.sum = function () {
    return this.reduce(function (a, b) { return a + b; });
}