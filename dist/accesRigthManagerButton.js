"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserProfileLst_1 = require("./Models/UserProfileLst");
const UserProfile_1 = require("./Models/UserProfile");
const AppProfileLst_1 = require("./Models/AppProfileLst");
const AppProfile_1 = require("./Models/AppProfile");
const spinalEnvDriveCore = require('spinal-env-drive-core');
const CONFIG_PATH = "/etc/config/";
const USER_PROFILE_LST_PATH = CONFIG_PATH + "UserProfileLst";
const APP_PROFILE_LST_PATH = CONFIG_PATH + "AppProfileLst";
const ADMIN_NAME = 'Admin';
const ADMIN_DESCRIPTION = 'Administrator of the spinal platform';
const INTEGRATOR_NAME = 'Intégrateur';
const INTEGRATOR_DESCRIPTION = 'Intégrateur description';
const MAINTAINER_NAME = "Mainteneur";
const MAINTAINER_DESCRIPTION = 'Mainteneur description';
const ASSET_MANAGER_NAME = 'Asset Manager';
const DEFAULT_USER_NAME = 'Basic Utilisateur';
const DEFAULT_USER_DESCRIPTION = 'Defaut utilisateur description';
const USERS = [
    { name: ADMIN_NAME, description: ADMIN_DESCRIPTION },
    { name: INTEGRATOR_NAME, description: INTEGRATOR_DESCRIPTION },
    { name: MAINTAINER_NAME, description: MAINTAINER_DESCRIPTION },
    { name: ASSET_MANAGER_NAME, description: ASSET_MANAGER_NAME },
    { name: DEFAULT_USER_NAME, description: DEFAULT_USER_DESCRIPTION }
];
class SpinalAdminInit extends spinalEnvDriveCore.SpinalDrive_App {
    constructor() {
        super("Init", "init", 15, "crop", "init system");
    }
    action(obj) {
        const authService = obj.scope.injector.get('authService');
        const ngSpinalCore = obj.scope.injector.get('ngSpinalCore');
        this.init(authService, ngSpinalCore);
    }
    init(authService, ngSpinalCore) {
        authService
            .wait_connect()
            .then(() => {
            SpinalAdminInit.initUserProfileLst(ngSpinalCore)
                .then(SpinalAdminInit.initAppProfileLst(ngSpinalCore));
        });
    }
    ;
    static initUserProfileLst(ngSpinalCore) {
        return ngSpinalCore.load(USER_PROFILE_LST_PATH)
            .then(SpinalAdminInit.onUserProfileLstLoadSuccessful)
            .catch(SpinalAdminInit.onUserProfileLstLoadFail(ngSpinalCore));
    }
    static initAppProfileLst(ngSpinalCore) {
        return ngSpinalCore.load(APP_PROFILE_LST_PATH)
            .then(SpinalAdminInit.onAppProfileLstLoadSuccessful)
            .catch(SpinalAdminInit.onAppProfileLstLoadFail(ngSpinalCore));
    }
    static onUserProfileLstLoadSuccessful(userProfileLst) {
        return Promise.resolve();
    }
    static onUserProfileLstLoadFail(ngSpinalCore) {
        const userProfileLst = new UserProfileLst_1.UserProfileLst();
        for (let i = 0; i < USERS.length; i++) {
            const user = USERS[i];
            //start id = 1
            userProfileLst.users.push(new UserProfile_1.UserProfile(i + 1, user.name, user.description));
        }
        return ngSpinalCore.store(userProfileLst, USER_PROFILE_LST_PATH)
            .then(SpinalAdminInit.onUserProfileLstLoadSuccessful);
    }
    static onAppProfileLstLoadSuccessful() {
        return Promise.resolve();
    }
    static onAppProfileLstLoadFail(ngSpinalCore) {
        const appProfileLst = new AppProfileLst_1.AppProfileLst();
        for (let i = 0; i < 32; i++) {
            appProfileLst.apps
                .push(new AppProfile_1.AppProfile(i + 1, 'id des profile utilisateur en binair inverser'));
        }
        return ngSpinalCore.store(appProfileLst, APP_PROFILE_LST_PATH)
            .then(SpinalAdminInit.onAppProfileLstLoadSuccessful);
    }
}
exports.SpinalAdminInit = SpinalAdminInit;
//# sourceMappingURL=accesRigthManagerButton.js.map