import { AppProfile, Role } from "spinal-model-access-rights";
export declare class SpinalAdminInit {
    private loadedPromise;
    private spinalCore;
    private authService;
    private roleStored;
    private appProfileStored;
    private appProfileAliasStored;
    /**
     * @param spinalCore {any} connected instance of spinalCore
     * @param authService {any} instance of spinalcom angular authService
     */
    constructor(spinalCore: any, authService: any);
    init(): Promise<void>;
    initRoleLst(): Promise<void>;
    initAppProfileLst(): Promise<void>;
    initAppProfileAliasLst(): Promise<boolean>;
    onRoleLstLoadSuccessful(): Promise<boolean>;
    onRoleLstLoadFail(ngSpinalCore: any): Promise<boolean>;
    onAppProfileAliasLoadSuccessful(): Promise<boolean>;
    onAppProfileAliasLoadFail(ngSpinalCore: any): Promise<boolean>;
    onAppProfileLstLoadSuccessful(): Promise<boolean>;
    onAppProfileLstLoadFail(ngSpinalCore: any): Promise<void>;
    static getUserProfileDir(ngSpinalCore: any): any;
    initDefaultUser(ngSpinalCore: any): Promise<any>;
    load(path: string): Promise<any>;
    getRoleFromName(names: string[]): Promise<Role>;
    getAppProfileFromName(name: string): Promise<AppProfile>;
}
