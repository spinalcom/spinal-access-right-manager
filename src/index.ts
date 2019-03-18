require('spinal-env-drive-core');
import  {SpinalAdminInit} from './accesRigthManagerButton';

const authService = window.angular.element('body > div').injector().get('authService');
const ngSpinalCore = window.angular.element('body > div').injector().get('ngSpinalCore');


SpinalAdminInit.init(authService, ngSpinalCore);
