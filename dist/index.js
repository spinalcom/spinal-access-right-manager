"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('spinal-env-drive-core');
const SpinalAccesRightsService_1 = require("./SpinalAccesRightsService");
const angular = require('angular');
const interval = setInterval(() => {
    if (angular.element('body > div').injector()) {
        const authService = angular.element('body > div').injector().get('authService');
        const ngSpinalCore = angular.element('body > div').injector().get('ngSpinalCore');
        SpinalAccesRightsService_1.SpinalAdminInit.init(authService, ngSpinalCore);
        clearInterval(interval);
    }
});
//# sourceMappingURL=index.js.map