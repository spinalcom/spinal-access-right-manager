import { Model } from 'spinal-core-connectorjs_type';
import { UserProfile } from "./UserProfile";
export declare class UserProfileLst extends Model {
    users: spinal.Lst<UserProfile>;
    constructor();
}
