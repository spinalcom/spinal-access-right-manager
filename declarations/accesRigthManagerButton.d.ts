import * as spinalEnvDriveCore from "spinal-env-drive-core";
export declare class SpinalAdminInit extends spinalEnvDriveCore.SpinalDrive_App {
    constructor();
    action(obj: any): void;
    init(authService: any, ngSpinalCore: any): void;
    static initRoleLst(ngSpinalCore: any): Promise<void>;
    static initAppProfileLst(ngSpinalCore: any): Promise<void>;
    static onRoleLstLoadSuccessful(): Promise<void>;
    static onRoleLstLoadFail(ngSpinalCore: any): Promise<void>;
    static onAppProfileLstLoadSuccessful(): Promise<void>;
    static onAppProfileLstLoadFail(ngSpinalCore: any): Promise<void>;
    static getUserProfileDir(ngSpinalCore: any): any;
    static initDefaultUser(ngSpinalCore: any): any;
}
