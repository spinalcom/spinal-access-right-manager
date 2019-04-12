"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SpinalAdminInit_1 = require("./SpinalAdminInit");
// @ts-ignore
var angular = require("angular");
exports.default = new Promise(function (resolve, reject) {
    var interval = setInterval(function () {
        var injector = angular
            .element("body > div")
            .injector();
        if (injector) {
            var authService = injector.get("authService");
            var ngSpinalCore = injector.get("ngSpinalCore");
            var SpinalAdmin = new SpinalAdminInit_1.SpinalAdminInit(ngSpinalCore, authService);
            SpinalAdmin.init()
                .then(function () {
                clearInterval(interval);
                resolve();
            }, function (e) {
                clearInterval(interval);
                resolve();
            }).catch(function (e) {
                reject();
                clearInterval(interval);
            });
        }
    }, 2000);
});
//# sourceMappingURL=index.js.map