import { Model } from 'spinal-core-connectorjs_type';
import { Role } from "./UserProfile";
export declare class RoleLst extends Model {
    users: spinal.Lst<Role>;
    constructor();
}
