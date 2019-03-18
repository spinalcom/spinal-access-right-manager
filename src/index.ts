require('spinal-env-drive-core');
import  {SpinalAdminInit} from './accesRigthManagerButton';
const angular = require('angular');

const interval = setInterval(() => {
  if (angular.element('body > div').injector()){
    const authService = angular.element('body > div').injector().get('authService');
    const ngSpinalCore = angular.element('body > div').injector().get('ngSpinalCore');
    SpinalAdminInit.init(authService, ngSpinalCore);

    clearInterval(interval)
  }
});