export interface SessionInterface {
  user?: UserInfoInterface, 
  tenant?: UserTenantInterface
}

export interface UserInfoInterface {
  email: string, 
  first_name: string, 
  last_name: string, 
  default_tenant?: string,
  default_language?: string
}

export interface UserTenantInterface { 
  code: string, 
  short_name: string, 
  long_name: string, 
  role: string
}
