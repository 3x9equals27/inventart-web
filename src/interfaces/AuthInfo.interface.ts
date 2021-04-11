import { AuthRoles } from "./AuthRoles.interface";

export interface AuthInfo {
    roles: AuthRoles,
    token: string
}