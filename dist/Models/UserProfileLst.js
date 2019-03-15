"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const spinal_core_connectorjs_type_1 = require("spinal-core-connectorjs_type");
class UserProfileLst extends spinal_core_connectorjs_type_1.Model {
    constructor() {
        super();
        this.add_attr({
            users: new spinal_core_connectorjs_type_1.Lst()
        });
    }
}
exports.UserProfileLst = UserProfileLst;
spinal_core_connectorjs_type_1.spinalCore.register_models(UserProfileLst);
//# sourceMappingURL=UserProfileLst.js.map