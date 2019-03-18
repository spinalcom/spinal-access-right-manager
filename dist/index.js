"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('spinal-env-drive-core');
const accesRigthManagerButton_1 = require("./accesRigthManagerButton");
const authService = window.angular.element('body > div').injector().get('authService');
const ngSpinalCore = window.angular.element('body > div').injector().get('ngSpinalCore');
accesRigthManagerButton_1.SpinalAdminInit.init(authService, ngSpinalCore);
//# sourceMappingURL=index.js.map