export declare const CONFIG_PATH: string;
export declare const USERS_FILE_PATH: string;
export declare const USERS_PROFILE_DIR_NAME: string;
export declare const ROLE_LST_PATH: string;
export declare const APP_PROFILE_LST_PATH: string;
export declare const ALIAS_APP_PROFILE_LST_PATH: string;
export declare const ADMIN_NAME: string;
export declare const ADMIN_DESCRIPTION: string;
export declare const INTEGRATOR_NAME: string;
export declare const INTEGRATOR_DESCRIPTION: string;
export declare const MAINTAINER_NAME: string;
export declare const MAINTAINER_DESCRIPTION: string;
export declare const ASSET_MANAGER_NAME: string;
export declare const DEFAULT_USER_NAME: string;
export declare const DEFAULT_USER_DESCRIPTION: string;
export declare const APP_PROFILE_ALIAS_EVERYONE: string;
export declare const DEFAULT_ROLES: {
    name: string;
    description: string;
}[];
export interface AppProfileConfig {
    name: string;
    description: string;
    roleNames: string[];
}
export declare const APP_PROFILE_ADMIN_NAME = "Admin";
export declare const APP_PROFILE_INTEGRATOR_NAME = "Integrator";
export declare const APP_PROFILE_MAINTAINER_NAME = "Maintainer";
export declare const APP_PROFILE_ASSET_MANAGER_NAME = "Asset_Manager";
export declare const APP_PROFILE_DEFAULT_USER_NAME = "Default_User";
export declare const APP_PROFILE_EVERYONE_NAME = "EVERYONE";
export declare const DEFAULT_APP_PROFILE: {
    name: string;
    description: string;
    roleNames: string[];
}[];
export declare const DEFAULT_APP_PROFILE_ALIAS: {
    name: string;
    appProfileName: string;
}[];
