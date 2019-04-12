"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIG_PATH = "/etc/config/";
exports.USERS_FILE_PATH = "/etc/users";
exports.USERS_PROFILE_DIR_NAME = "UserProfileDir";
exports.ROLE_LST_PATH = exports.CONFIG_PATH + "RoleLst";
exports.APP_PROFILE_LST_PATH = exports.CONFIG_PATH + "AppProfileLst";
exports.ALIAS_APP_PROFILE_LST_PATH = exports.CONFIG_PATH + "AliasAppProfileLst";
exports.ADMIN_NAME = 'Admin';
exports.ADMIN_DESCRIPTION = 'Administrateur de la plateforme' +
    ' spinalcom';
exports.INTEGRATOR_NAME = 'Intégrateur';
exports.INTEGRATOR_DESCRIPTION = 'Intégrateur description';
exports.MAINTAINER_NAME = "Mainteneur";
exports.MAINTAINER_DESCRIPTION = 'Mainteneur description';
exports.ASSET_MANAGER_NAME = 'Asset Manager';
exports.DEFAULT_USER_NAME = 'Basic Utilisateur';
exports.DEFAULT_USER_DESCRIPTION = 'Defaut utilisateur' +
    ' description';
exports.APP_PROFILE_ALIAS_EVERYONE = 'EVERYONE';
exports.DEFAULT_ROLES = [
    { name: exports.ADMIN_NAME, description: exports.ADMIN_DESCRIPTION },
    { name: exports.INTEGRATOR_NAME, description: exports.INTEGRATOR_DESCRIPTION },
    { name: exports.MAINTAINER_NAME, description: exports.MAINTAINER_DESCRIPTION },
    { name: exports.ASSET_MANAGER_NAME, description: exports.ASSET_MANAGER_NAME },
    { name: exports.DEFAULT_USER_NAME, description: exports.DEFAULT_USER_DESCRIPTION }
];
exports.APP_PROFILE_ADMIN_NAME = 'Admin';
exports.APP_PROFILE_INTEGRATOR_NAME = 'Integrator';
exports.APP_PROFILE_MAINTAINER_NAME = 'Maintainer';
exports.APP_PROFILE_ASSET_MANAGER_NAME = 'Asset_Manager';
exports.APP_PROFILE_DEFAULT_USER_NAME = 'Default_User';
exports.APP_PROFILE_EVERYONE_NAME = 'EVERYONE';
exports.DEFAULT_APP_PROFILE = [
    {
        name: exports.APP_PROFILE_ADMIN_NAME,
        description: 'Only admin allowed',
        roleNames: [exports.ADMIN_NAME]
    },
    {
        name: exports.APP_PROFILE_INTEGRATOR_NAME,
        description: 'Only integrator allowed',
        roleNames: [exports.INTEGRATOR_NAME]
    },
    {
        name: exports.APP_PROFILE_MAINTAINER_NAME,
        description: 'Only maintainer allowed',
        roleNames: [exports.MAINTAINER_NAME]
    },
    {
        name: exports.APP_PROFILE_ASSET_MANAGER_NAME,
        description: 'Only Asset-Manager allowed',
        roleNames: [exports.ASSET_MANAGER_NAME]
    },
    {
        name: exports.APP_PROFILE_DEFAULT_USER_NAME,
        description: 'Only default user allowed',
        roleNames: [exports.DEFAULT_USER_NAME]
    },
    {
        name: exports.APP_PROFILE_EVERYONE_NAME,
        description: 'Everybody is allowed',
        roleNames: [
            exports.ADMIN_NAME,
            exports.INTEGRATOR_NAME,
            exports.MAINTAINER_NAME,
            exports.ASSET_MANAGER_NAME,
            exports.DEFAULT_USER_NAME
        ]
    }
];
exports.DEFAULT_APP_PROFILE_ALIAS = [
    {
        name: exports.ADMIN_NAME,
        appProfileName: exports.APP_PROFILE_ADMIN_NAME
    },
    {
        name: exports.INTEGRATOR_NAME,
        appProfileName: exports.APP_PROFILE_INTEGRATOR_NAME
    },
    {
        name: exports.MAINTAINER_NAME,
        appProfileName: exports.APP_PROFILE_MAINTAINER_NAME
    },
    {
        name: exports.ASSET_MANAGER_NAME,
        appProfileName: exports.APP_PROFILE_ASSET_MANAGER_NAME
    },
    {
        name: exports.DEFAULT_USER_NAME,
        appProfileName: exports.APP_PROFILE_DEFAULT_USER_NAME
    },
    {
        name: exports.APP_PROFILE_ALIAS_EVERYONE,
        appProfileName: exports.APP_PROFILE_EVERYONE_NAME
    },
];
//# sourceMappingURL=Constants.js.map