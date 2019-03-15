import { UserProfileLst } from "./Models/UserProfileLst";
import { UserProfile } from "./Models/UserProfile";
import { AppProfileLst } from "./Models/AppProfileLst";
import { AppProfile } from "./Models/AppProfile";

import * as spinalEnvDriveCore from "spinal-env-drive-core";

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
  {name: ADMIN_NAME, description: ADMIN_DESCRIPTION},
  {name: INTEGRATOR_NAME, description: INTEGRATOR_DESCRIPTION},
  {name: MAINTAINER_NAME, description: MAINTAINER_DESCRIPTION},
  {name: ASSET_MANAGER_NAME, description: ASSET_MANAGER_NAME},
  {name: DEFAULT_USER_NAME, description: DEFAULT_USER_DESCRIPTION}
];

export class SpinalAdminInit extends spinalEnvDriveCore.SpinalDrive_App {
  constructor() {
    super(
      "Init",
      "init",
      15,
      "crop",
      "init system"
    );
  }

  action(obj: any): void {
    const authService = obj.scope.injector.get('authService');
    const ngSpinalCore = obj.scope.injector.get('ngSpinalCore');
    this.init(authService, ngSpinalCore);
  }

  init(authService: any, ngSpinalCore: any): void {
    authService
      .wait_connect()
      .then(() => {
        SpinalAdminInit.initUserProfileLst(ngSpinalCore)
          .then(SpinalAdminInit.initAppProfileLst.bind(this,ngSpinalCore))

      })
  };

  static initUserProfileLst(ngSpinalCore) : Promise<void> {
    return ngSpinalCore.load(USER_PROFILE_LST_PATH)
      .then(SpinalAdminInit.onUserProfileLstLoadSuccessful)
      .catch(SpinalAdminInit.onUserProfileLstLoadFail.bind(this,ngSpinalCore));
  }

  static initAppProfileLst(ngSpinalCore) : Promise<void> {
    return ngSpinalCore.load(APP_PROFILE_LST_PATH)
      .then(SpinalAdminInit.onAppProfileLstLoadSuccessful)
      .catch(SpinalAdminInit.onAppProfileLstLoadFail.bind(this,ngSpinalCore));
  }

  static onUserProfileLstLoadSuccessful() : Promise<void>{
    return Promise.resolve();
  }

  static onUserProfileLstLoadFail(ngSpinalCore) : Promise<void> {
    const userProfileLst: UserProfileLst = new UserProfileLst();
    for (let i = 0; i < USERS.length; i++) {
      const user = USERS[i];
      //start id = 1
      userProfileLst.users.push(new UserProfile(i + 1, user.name, user.description));
    }
    return ngSpinalCore.store(userProfileLst, USER_PROFILE_LST_PATH)
      .then(SpinalAdminInit.onUserProfileLstLoadSuccessful)
      .catch(() => {
        console.log('store rejection from onUserProfileLstLoadFail');
        return Promise.resolve();
      })
  }

  static onAppProfileLstLoadSuccessful() : Promise<void>{
    return Promise.resolve();
  }

  static onAppProfileLstLoadFail(ngSpinalCore) : Promise<void> {

    const appProfileLst: AppProfileLst = new AppProfileLst();
    for (let i = 0; i < 32; i++) {
      appProfileLst.apps
        .push(new AppProfile(i + 1,
          'id des profile utilisateur en binair inverser')
        );
    }

    return ngSpinalCore.store(appProfileLst, APP_PROFILE_LST_PATH)
      .then(SpinalAdminInit.onAppProfileLstLoadSuccessful)
      .catch(() => {
        console.log('store rejection from onAppProfileLstLoadFail');
        return Promise.resolve();
      })
  }
}
