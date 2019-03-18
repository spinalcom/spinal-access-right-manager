"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RoleLst_1 = require("./Models/RoleLst");
const Role_1 = require("./Models/Role");
const UserProfile_1 = require("./Models/UserProfile");
const AppProfileLst_1 = require("./Models/AppProfileLst");
const AppProfile_1 = require("./Models/AppProfile");
const spinalEnvDriveCore = require("spinal-env-drive-core");
const spinal_core_connectorjs_type_1 = require("spinal-core-connectorjs_type");
const CONFIG_PATH = "/etc/config/";
const USERS_FILE_PATH = "/etc/users";
const USERS_PROFILE_DIR_NAME = "UserProfileDir";
const ROLE_LST_PATH = CONFIG_PATH + "UserProfileLst";
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
            SpinalAdminInit.initRoleLst(ngSpinalCore)
                .then(SpinalAdminInit.initAppProfileLst.bind(this, ngSpinalCore))
                .then(SpinalAdminInit.initDefaultUser.bind(this, ngSpinalCore));
        });
    }
    ;
    static initRoleLst(ngSpinalCore) {
        return ngSpinalCore.load(ROLE_LST_PATH)
            .then(SpinalAdminInit.onRoleLstLoadSuccessful)
            .catch(SpinalAdminInit.onRoleLstLoadFail.bind(this, ngSpinalCore));
    }
    static initAppProfileLst(ngSpinalCore) {
        return ngSpinalCore.load(APP_PROFILE_LST_PATH)
            .then(SpinalAdminInit.onAppProfileLstLoadSuccessful)
            .catch(SpinalAdminInit.onAppProfileLstLoadFail.bind(this, ngSpinalCore));
    }
    static onRoleLstLoadSuccessful() {
        return Promise.resolve();
    }
    static onRoleLstLoadFail(ngSpinalCore) {
        const userProfileLst = new RoleLst_1.RoleLst();
        for (let i = 0; i < USERS.length; i++) {
            const user = USERS[i];
            //start id = 1
            userProfileLst.users.push(new Role_1.Role(i + 1, user.name, user.description));
        }
        return ngSpinalCore.store(userProfileLst, ROLE_LST_PATH)
            .then(SpinalAdminInit.onRoleLstLoadSuccessful)
            .catch(() => {
            console.log('store rejection from onUserProfileLstLoadFail');
            return Promise.resolve();
        });
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
            .then(SpinalAdminInit.onAppProfileLstLoadSuccessful)
            .catch(() => {
            console.log('store rejection from onAppProfileLstLoadFail');
            return Promise.resolve();
        });
    }
    static getUserProfileDir(ngSpinalCore) {
        return ngSpinalCore.load('/etc')
            .then(etcDir => {
            for (let i = 0; i < etcDir.length; i++) {
                const file = etcDir[i];
                if (file.name === USERS_PROFILE_DIR_NAME)
                    return file;
            }
            const Dir = new spinal_core_connectorjs_type_1.Directory();
            etcDir.add_file(USERS_PROFILE_DIR_NAME, Dir);
            return Dir;
        });
    }
    static initDefaultUser(ngSpinalCore) {
        return SpinalAdminInit.getUserProfileDir(ngSpinalCore)
            .then((dir) => {
            return ngSpinalCore.load(USERS_FILE_PATH)
                .then((users) => {
                const promises = [];
                for (let i = 0; i < users.length; i++) {
                    const user = users[i];
                    if (!dir.has(user.name)) {
                        //6 is the id of default user role. 1 is admin role
                        const type = (user.type == 0) ? 1 : 5;
                        const userProfile = new UserProfile_1.UserProfile([type]);
                        dir.add_file(user.name, userProfile);
                    }
                }
            });
        });
    }
}
exports.SpinalAdminInit = SpinalAdminInit;
//# sourceMappingURL=accesRigthManagerButton.js.map