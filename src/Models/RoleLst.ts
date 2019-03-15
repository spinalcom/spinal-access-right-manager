import { Model, Lst, spinalCore } from 'spinal-core-connectorjs_type';
import { Role } from "./UserProfile";

export class RoleLst extends Model {
  public users: spinal.Lst<Role>;

  constructor() {
    super();
    this.add_attr({
      users: new Lst()
  })
  }
}

spinalCore.register_models(RoleLst);