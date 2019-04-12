export const CONFIG_PATH: string = "/etc/config/";

export const USERS_FILE_PATH: string = "/etc/users";
export const USERS_PROFILE_DIR_NAME: string = "UserProfileDir";
export const ROLE_LST_PATH: string = CONFIG_PATH + "RoleLst";
export const APP_PROFILE_LST_PATH: string = CONFIG_PATH + "AppProfileLst";
export const ALIAS_APP_PROFILE_LST_PATH: string = CONFIG_PATH + "AliasAppProfileLst";

export const ADMIN_NAME: string = 'Admin';
export const ADMIN_DESCRIPTION: string = 'Administrateur de la plateforme' +
  ' spinalcom';


export const INTEGRATOR_NAME: string = 'Intégrateur';
export const INTEGRATOR_DESCRIPTION: string = 'Intégrateur description';

export const MAINTAINER_NAME: string = "Mainteneur";
export const MAINTAINER_DESCRIPTION: string = 'Mainteneur description';

export const ASSET_MANAGER_NAME: string = 'Asset Manager';

export const DEFAULT_USER_NAME: string = 'Basic Utilisateur';
export const DEFAULT_USER_DESCRIPTION: string = 'Defaut utilisateur' +
  ' description';

export const APP_PROFILE_ALIAS_EVERYONE: string = 'EVERYONE';


export const DEFAULT_ROLES = [
  {name: ADMIN_NAME, description: ADMIN_DESCRIPTION},
  {name: INTEGRATOR_NAME, description: INTEGRATOR_DESCRIPTION},
  {name: MAINTAINER_NAME, description: MAINTAINER_DESCRIPTION},
  {name: ASSET_MANAGER_NAME, description: ASSET_MANAGER_NAME},
  {name: DEFAULT_USER_NAME, description: DEFAULT_USER_DESCRIPTION}
];

export interface AppProfileConfig {
  name: string;
  description: string;
  roleNames: string[];
}

export const APP_PROFILE_ADMIN_NAME = 'Admin';
export const APP_PROFILE_INTEGRATOR_NAME = 'Integrator';
export const APP_PROFILE_MAINTAINER_NAME = 'Maintainer';
export const APP_PROFILE_ASSET_MANAGER_NAME = 'Asset_Manager';
export const APP_PROFILE_DEFAULT_USER_NAME = 'Default_User';
export const APP_PROFILE_EVERYONE_NAME = 'EVERYONE';

export const DEFAULT_APP_PROFILE = [
  {
    name: APP_PROFILE_ADMIN_NAME,
    description: 'Only admin allowed',
    roleNames: [ADMIN_NAME]
  },
  {
    name: APP_PROFILE_INTEGRATOR_NAME,
    description: 'Only integrator allowed',
    roleNames: [INTEGRATOR_NAME]
  },
  {
    name: APP_PROFILE_MAINTAINER_NAME,
    description: 'Only maintainer allowed',
    roleNames: [MAINTAINER_NAME]
  },
  {
    name: APP_PROFILE_ASSET_MANAGER_NAME,
    description: 'Only Asset-Manager allowed',
    roleNames: [ASSET_MANAGER_NAME]
  },

  {
    name: APP_PROFILE_DEFAULT_USER_NAME,
    description: 'Only default user allowed',
    roleNames: [DEFAULT_USER_NAME]
  },
  {
    name: APP_PROFILE_EVERYONE_NAME,
    description: 'Everybody is allowed',
    roleNames: [
      ADMIN_NAME,
      INTEGRATOR_NAME,
      MAINTAINER_NAME,
      ASSET_MANAGER_NAME,
      DEFAULT_USER_NAME
    ]
  }
];


export const DEFAULT_APP_PROFILE_ALIAS = [
  {
    name: ADMIN_NAME,
    appProfileName: APP_PROFILE_ADMIN_NAME
  },
  {
    name: INTEGRATOR_NAME,
    appProfileName: APP_PROFILE_INTEGRATOR_NAME
  },
  {
    name: MAINTAINER_NAME,
    appProfileName: APP_PROFILE_MAINTAINER_NAME
  },
  {
    name: ASSET_MANAGER_NAME,
    appProfileName: APP_PROFILE_ASSET_MANAGER_NAME
  },
  {
    name:DEFAULT_USER_NAME,
    appProfileName: APP_PROFILE_DEFAULT_USER_NAME
  },
  {
    name: APP_PROFILE_ALIAS_EVERYONE,
    appProfileName: APP_PROFILE_EVERYONE_NAME
  },
];
