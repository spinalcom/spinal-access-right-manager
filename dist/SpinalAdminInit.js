"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var spinal_core_connectorjs_type_1 = require("spinal-core-connectorjs_type");
var spinal_model_access_rights_1 = require("spinal-model-access-rights");
var Constants_1 = require("./Constants");
var SpinalAdminInit = /** @class */ (function () {
    /**
     * @param spinalCore {any} connected instance of spinalCore
     * @param authService {any} instance of spinalcom angular authService
     */
    function SpinalAdminInit(spinalCore, authService) {
        this.loadedPromise = {};
        this.roleStored = false;
        this.appProfileStored = false;
        this.appProfileAliasStored = false;
        this.spinalCore = spinalCore;
        this.authService = authService;
    }
    SpinalAdminInit.prototype.init = function () {
        var _this = this;
        return this.authService
            .wait_connect()
            .then(function () {
            return _this.initRoleLst()
                .then(_this.initAppProfileLst.bind(_this, _this.spinalCore))
                .then(_this.initDefaultUser.bind(_this, _this.spinalCore))
                .then(_this.initAppProfileAliasLst.bind(_this, _this.spinalCore))
                .catch(function (e) {
                console.log(e);
            });
        });
    };
    ;
    SpinalAdminInit.prototype.initRoleLst = function () {
        return this.load(Constants_1.ROLE_LST_PATH)
            .then(this.onRoleLstLoadSuccessful.bind(this))
            .catch(this.onRoleLstLoadFail.bind(this, this.spinalCore));
    };
    SpinalAdminInit.prototype.initAppProfileLst = function () {
        return this.load(Constants_1.APP_PROFILE_LST_PATH)
            .then(this.onAppProfileLstLoadSuccessful.bind(this))
            .catch(this.onAppProfileLstLoadFail.bind(this, this.spinalCore));
    };
    SpinalAdminInit.prototype.initAppProfileAliasLst = function () {
        return this.load(Constants_1.ALIAS_APP_PROFILE_LST_PATH)
            .then(this.onAppProfileAliasLoadSuccessful.bind(this))
            .catch(this.onAppProfileAliasLoadFail.bind(this, this.spinalCore));
    };
    SpinalAdminInit.prototype.onRoleLstLoadSuccessful = function () {
        this.roleStored = true;
        return Promise.resolve(true);
    };
    SpinalAdminInit.prototype.onRoleLstLoadFail = function (ngSpinalCore) {
        var roleLst = new spinal_model_access_rights_1.RoleLst();
        for (var i = 0; i < Constants_1.DEFAULT_ROLES.length; i++) {
            var role = Constants_1.DEFAULT_ROLES[i];
            roleLst.roles.push(new spinal_model_access_rights_1.Role(role.name, role.description));
        }
        return ngSpinalCore.store(roleLst, Constants_1.ROLE_LST_PATH)
            .then(this.onRoleLstLoadSuccessful.bind(this))
            .catch(function (e) {
            console
                .error('onUserProfileLstLoadFail: storing of default roles failed', e);
            return Promise.resolve(false);
        });
    };
    SpinalAdminInit.prototype.onAppProfileAliasLoadSuccessful = function () {
        this.appProfileAliasStored = true;
        return Promise.resolve(true);
    };
    SpinalAdminInit.prototype.onAppProfileAliasLoadFail = function (ngSpinalCore) {
        return __awaiter(this, void 0, void 0, function () {
            var appProfileAliasLst, promises, i, i, appProfile;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        appProfileAliasLst = new spinal_model_access_rights_1.AppProfileAliasLst();
                        promises = [];
                        for (i = 0; i < Constants_1.DEFAULT_APP_PROFILE_ALIAS.length; i++) {
                            promises.push(this.getAppProfileFromName(Constants_1.DEFAULT_APP_PROFILE_ALIAS[i].appProfileName));
                        }
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < promises.length)) return [3 /*break*/, 4];
                        return [4 /*yield*/, promises[i]];
                    case 2:
                        appProfile = _a.sent();
                        appProfileAliasLst.aliases.push(new spinal_model_access_rights_1.AppProfileAlias(Constants_1.DEFAULT_APP_PROFILE_ALIAS[i].name, appProfile));
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, ngSpinalCore.store(appProfileAliasLst, Constants_1.ALIAS_APP_PROFILE_LST_PATH)
                            .then(this.onAppProfileAliasLoadSuccessful.bind(this))
                            .catch(function () {
                            return Promise.resolve();
                        })];
                }
            });
        });
    };
    SpinalAdminInit.prototype.onAppProfileLstLoadSuccessful = function () {
        this.appProfileStored = true;
        return Promise.resolve(true);
    };
    SpinalAdminInit.prototype.onAppProfileLstLoadFail = function (ngSpinalCore) {
        return __awaiter(this, void 0, void 0, function () {
            var appProfileLst, promises, i, appProfileConfig, i, roles, appProfileConfig;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        appProfileLst = new spinal_model_access_rights_1.AppProfileLst();
                        promises = [];
                        //get all roles for default app profile config
                        for (i = 0; i < Constants_1.DEFAULT_APP_PROFILE.length; i++) {
                            appProfileConfig = Constants_1.DEFAULT_APP_PROFILE[i];
                            promises.push(this.getRoleFromName(appProfileConfig.roleNames));
                        }
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < promises.length)) return [3 /*break*/, 4];
                        return [4 /*yield*/, promises[i]];
                    case 2:
                        roles = _a.sent();
                        appProfileConfig = Constants_1.DEFAULT_APP_PROFILE[i];
                        appProfileLst.apps
                            .push(new spinal_model_access_rights_1.AppProfile(appProfileConfig.name, appProfileConfig.description, roles ? roles : []));
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, ngSpinalCore.store(appProfileLst, Constants_1.APP_PROFILE_LST_PATH)
                            .then(this.onAppProfileLstLoadSuccessful.bind(this))
                            .catch(function () {
                            return Promise.resolve();
                        })];
                }
            });
        });
    };
    SpinalAdminInit.getUserProfileDir = function (ngSpinalCore) {
        return ngSpinalCore.load('/etc')
            .then(function (etcDir) {
            for (var i = 0; i < etcDir.length; i++) {
                var file = etcDir[i];
                if (file.name === Constants_1.USERS_PROFILE_DIR_NAME)
                    return file;
            }
            var Dir = new spinal_core_connectorjs_type_1.Directory();
            etcDir.add_file(Constants_1.USERS_PROFILE_DIR_NAME, Dir);
            return Dir;
        });
    };
    SpinalAdminInit.prototype.initDefaultUser = function (ngSpinalCore) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, SpinalAdminInit.getUserProfileDir(ngSpinalCore)
                        .then(function (dir) {
                        return ngSpinalCore.load(Constants_1.USERS_FILE_PATH)
                            .then(function (users) { return __awaiter(_this, void 0, void 0, function () {
                            var promises, i, user, role, i, user, roles, userProfile;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        promises = [];
                                        for (i = 0; i < users.length; i++) {
                                            user = users[i];
                                            if (!dir.has(user.name)) {
                                                role = (user.type == 0) ? Constants_1.ADMIN_NAME : Constants_1.DEFAULT_USER_NAME;
                                                promises.push(this.getRoleFromName([role]));
                                            }
                                        }
                                        i = 0;
                                        _a.label = 1;
                                    case 1:
                                        if (!(i < promises.length)) return [3 /*break*/, 4];
                                        user = users[i];
                                        return [4 /*yield*/, promises[i]];
                                    case 2:
                                        roles = _a.sent();
                                        userProfile = new spinal_model_access_rights_1.UserProfile(user.name, roles);
                                        dir.add_file(user.name, userProfile);
                                        _a.label = 3;
                                    case 3:
                                        i++;
                                        return [3 /*break*/, 1];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); });
                    })];
            });
        });
    };
    SpinalAdminInit.prototype.load = function (path) {
        var _this = this;
        if (typeof this.loadedPromise[path] !== 'undefined') {
            return this.loadedPromise[path];
        }
        this.loadedPromise[path] = this.spinalCore.load(path)
            .catch(function (e) {
            _this.loadedPromise[path] = undefined;
            throw new Error("loading error " + path);
        });
        return this.loadedPromise[path];
    };
    SpinalAdminInit.prototype.getRoleFromName = function (names) {
        return this.load(Constants_1.ROLE_LST_PATH)
            .then(function (rolesLst) {
            if (rolesLst) {
                var res = [];
                var roles = rolesLst.roles;
                for (var i = 0; i < roles.length; i++) {
                    if (names.includes(roles[i].name.get()))
                        res.push(roles[i]);
                }
                return res;
            }
            return undefined;
        })
            .catch(function (e) {
            console.log('getRoleFromName error:', e);
            return undefined;
        });
    };
    SpinalAdminInit.prototype.getAppProfileFromName = function (name) {
        return this.load(Constants_1.APP_PROFILE_LST_PATH)
            .then(function (appProfileAlias) {
            if (appProfileAlias) {
                var appProfile = appProfileAlias.apps;
                for (var i = 0; i < appProfile.length; i++) {
                    if (name === appProfile[i].name.get()) {
                        return appProfile[i];
                    }
                }
            }
            return undefined;
        })
            .catch(function (e) {
            console.log('getAppProfileFromName error:', e);
            return undefined;
        });
    };
    return SpinalAdminInit;
}());
exports.SpinalAdminInit = SpinalAdminInit;
//# sourceMappingURL=SpinalAdminInit.js.map