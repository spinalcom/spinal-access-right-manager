import { Directory } from "spinal-core-connectorjs_type";

import {
  AppProfile,
  AppProfileLst,
  AppProfileAlias,
  AppProfileAliasLst,
  Role,
  RoleLst,
  UserProfile,
} from "spinal-model-access-rights";

import {
  ADMIN_NAME,
  ALIAS_APP_PROFILE_LST_PATH,
  APP_PROFILE_LST_PATH,
  AppProfileConfig,
  DEFAULT_APP_PROFILE,
  DEFAULT_APP_PROFILE_ALIAS,
  DEFAULT_ROLES,
  DEFAULT_USER_NAME,
  ROLE_LST_PATH,
  USERS_FILE_PATH,
  USERS_PROFILE_DIR_NAME
} from "./Constants";


export class SpinalAdminInit {

  private loadedPromise: { [key: string]: Promise<any> } = {};
  private spinalCore: any;
  private authService: any;
  private roleStored: boolean = false;
  private appProfileStored: boolean = false;
  private appProfileAliasStored: boolean = false;


  /**
   * @param spinalCore {any} connected instance of spinalCore
   * @param authService {any} instance of spinalcom angular authService
   */
  constructor(spinalCore: any, authService: any) {
    this.spinalCore = spinalCore;
    this.authService = authService;
  }

  init(): Promise<void> {
    return this.authService
      .wait_connect()
      .then(() => {
        return this.initRoleLst()
          .then(this.initAppProfileLst.bind(this, this.spinalCore))
          .then(this.initDefaultUser.bind(this, this.spinalCore))
          .then(this.initAppProfileAliasLst.bind(this, this.spinalCore))

          .catch((e) => {
            console.log(e);
          })
      })
  };

  initRoleLst(): Promise<void> {
    return this.load(ROLE_LST_PATH)
      .then(this.onRoleLstLoadSuccessful.bind(this))
      .catch(this.onRoleLstLoadFail.bind(this, this.spinalCore));
  }

  initAppProfileLst(): Promise<void> {
    return this.load(APP_PROFILE_LST_PATH)
      .then(this.onAppProfileLstLoadSuccessful.bind(this))
      .catch(this.onAppProfileLstLoadFail.bind(this, this.spinalCore));
  }

  initAppProfileAliasLst(): Promise<boolean> {
    return this.load(ALIAS_APP_PROFILE_LST_PATH)
      .then(this.onAppProfileAliasLoadSuccessful.bind(this))
      .catch(this.onAppProfileAliasLoadFail.bind(this, this.spinalCore));
  }

  onRoleLstLoadSuccessful(): Promise<boolean> {
    this.roleStored = true;
    return Promise.resolve(true);
  }

  onRoleLstLoadFail(ngSpinalCore): Promise<boolean> {
    const roleLst: RoleLst = new RoleLst();
    for (let i = 0; i < DEFAULT_ROLES.length; i++) {
      const role = DEFAULT_ROLES[i];
      roleLst.roles.push(new Role(role.name, role.description));
    }
    return ngSpinalCore.store(roleLst, ROLE_LST_PATH)
      .then(this.onRoleLstLoadSuccessful.bind(this))
      .catch((e) => {
        console
          .error('onUserProfileLstLoadFail: storing of default roles failed', e);
        return Promise.resolve(false);
      });
  }

  onAppProfileAliasLoadSuccessful(): Promise<boolean> {
    this.appProfileAliasStored = true;
    return Promise.resolve(true);
  }

  async onAppProfileAliasLoadFail(ngSpinalCore): Promise<boolean> {
    const appProfileAliasLst = new AppProfileAliasLst();
    const promises = [];

    for (let i = 0; i < DEFAULT_APP_PROFILE_ALIAS.length; i++) {
      promises.push(this.getAppProfileFromName(DEFAULT_APP_PROFILE_ALIAS[i].appProfileName));
    }
    for (let i = 0; i < promises.length; i++) {
        const appProfile = await promises[i];
        appProfileAliasLst.aliases.push(new AppProfileAlias(DEFAULT_APP_PROFILE_ALIAS[i].name, appProfile))
    }

    return ngSpinalCore.store(appProfileAliasLst, ALIAS_APP_PROFILE_LST_PATH)
      .then(this.onAppProfileAliasLoadSuccessful.bind(this))
      .catch(() => {
        return Promise.resolve();
      })
  }

  onAppProfileLstLoadSuccessful(): Promise<boolean> {
    this.appProfileStored = true;
    return Promise.resolve(true);
  }

  async onAppProfileLstLoadFail(ngSpinalCore): Promise<void> {
    const appProfileLst: AppProfileLst = new AppProfileLst();
    const promises = [];
    //get all roles for default app profile config
    for (let i = 0; i < DEFAULT_APP_PROFILE.length; i++) {
      const appProfileConfig: AppProfileConfig = DEFAULT_APP_PROFILE[i];
      promises.push(this.getRoleFromName(appProfileConfig.roleNames));
    }
    //create and push the default app profile
    for (let i = 0; i < promises.length; i++) {
      const roles = await promises[i];
      const appProfileConfig: AppProfileConfig = DEFAULT_APP_PROFILE[i];
      appProfileLst.apps
        .push(new AppProfile(
          appProfileConfig.name,
          appProfileConfig.description,
          roles ? roles : []
          )
        );
    }

    return ngSpinalCore.store(appProfileLst, APP_PROFILE_LST_PATH)
      .then(this.onAppProfileLstLoadSuccessful.bind(this))
      .catch(() => {

        return Promise.resolve();
      })
  }

  static getUserProfileDir(ngSpinalCore) {
    return ngSpinalCore.load('/etc')
      .then(etcDir => {
        for (let i = 0; i < etcDir.length; i++) {
          const file = etcDir[i];
          if (file.name === USERS_PROFILE_DIR_NAME)
            return file;
        }
        const Dir = new Directory();
        etcDir.add_file(USERS_PROFILE_DIR_NAME, Dir);
        return Dir;
      })
  }

  async initDefaultUser(ngSpinalCore) {
    return SpinalAdminInit.getUserProfileDir(ngSpinalCore)
      .then((dir) => {
        return ngSpinalCore.load(USERS_FILE_PATH)
          .then(async (users) => {
            const promises = [];
            for (let i = 0; i < users.length; i++) {
              const user = users[i];
              if (!dir.has(user.name)) {
                //4 is the id of default user role. 0 is admin role
                const role: string = (user.type == 0) ? ADMIN_NAME : DEFAULT_USER_NAME;
                promises.push(this.getRoleFromName([role]))
              }
            }
            for (let i = 0; i < promises.length; i++) {
              const user = users[i];
              const roles = await promises[i];
              const userProfile: UserProfile = new UserProfile(user.name, roles);
              dir.add_file(user.name, userProfile);
            }
          })
      });
  }

  load(path: string) {
    if (typeof this.loadedPromise[path] !== 'undefined') {

      return this.loadedPromise[path];
    }

    this.loadedPromise[path] = this.spinalCore.load(path)
      .catch(e => {
        this.loadedPromise[path] = undefined;
        throw new Error(`loading error ${path}`);
      });
    return this.loadedPromise[path];
  }

  getRoleFromName(names: string[]): Promise<Role> {
    return this.load(ROLE_LST_PATH)
      .then((rolesLst: RoleLst) => {
        if (rolesLst) {
          const res = [];
          const roles: spinal.Lst<Role> = rolesLst.roles;
          for (let i = 0; i < roles.length; i++) {
            if (names.includes(roles[i].name.get()))
              res.push(roles[i]);
          }
          return res;
        }
        return undefined;
      })
      .catch((e) => {
        console.log('getRoleFromName error:', e);
        return undefined;
      });
  }

  getAppProfileFromName(name: string): Promise<AppProfile> {
    return this.load(APP_PROFILE_LST_PATH)
      .then((appProfileAlias: AppProfileLst) => {
        if (appProfileAlias) {
          const appProfile: spinal.Lst<AppProfile> = appProfileAlias.apps;
          for (let i = 0; i < appProfile.length; i++) {
            if (name === appProfile[i].name.get()) {
              return appProfile[i];
            }
          }
        }
        return undefined;
      })
      .catch((e) => {
        console.log('getAppProfileFromName error:', e);
        return undefined;
      });
  }
}


