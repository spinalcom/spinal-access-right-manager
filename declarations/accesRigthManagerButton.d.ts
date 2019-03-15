declare const spinalEnvDriveCore: any;
export declare class SpinalAdminInit extends spinalEnvDriveCore.SpinalDrive_App {
    constructor();
    action(obj: any): void;
    init(authService: any, ngSpinalCore: any): void;
    static initUserProfileLst(ngSpinalCore: any): Promise<void>;
    static initAppProfileLst(ngSpinalCore: any): Promise<void>;
    static onUserProfileLstLoadSuccessful(userProfileLst: any): Promise<void>;
    static onUserProfileLstLoadFail(ngSpinalCore: any): Promise<void>;
    static onAppProfileLstLoadSuccessful(): Promise<void>;
    static onAppProfileLstLoadFail(ngSpinalCore: any): Promise<void>;
}
export {};
