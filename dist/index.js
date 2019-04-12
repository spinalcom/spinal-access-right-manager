"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("spinal-env-drive-core");
var SpinalAdminInit_1 = require("./SpinalAdminInit");
// @ts-ignore
var angular = require("angular");
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
        }, function (e) {
            clearInterval(interval);
        }).catch(function (e) {
            clearInterval(interval);
        });
    }
}, 2000);
//# sourceMappingURL=index.js.map