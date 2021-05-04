import { Permission } from "./Permission";
import { Role } from "./Role";

export class PermissionManager {
  role: string;

  constructor(role: string) {
    this.role = role;
  }

  Check(permission: string): boolean {
    switch (permission) {
      case Permission.APP_ACCESS: return [Role.CURATOR, Role.CONTRIBUTOR, Role.VISITOR, Role.GUEST].includes(this.role);
      case Permission.LIST_DIAGNOSTIC: return [Role.CURATOR, Role.CONTRIBUTOR, Role.VISITOR, Role.GUEST].includes(this.role);
      case Permission.UPLOAD_FILE: return [Role.CURATOR].includes(this.role);
      default: return false;
    }
  }
}
