import axios from 'axios';
import { config } from '../../config';
import { UserTenantInterface, UserInfoInterface } from '../../interfaces/session.interface';

export class InventartApi {
  BASE_URL = config.apiRoot;
  token?: string;
  tenant?: string;

  constructor(token?: string, tenant?: string) {
    this.token = token;
    this.tenant = tenant;
  }

  async authLogin(username: string, password: string): Promise<{ success: boolean, token?: string, error?: string }> {
    return axios.post(`${config.apiRoot}/auth/login`, {
      email: username,
      password: password
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(res => {
        console.warn('Login:loginUser:then', res.data);
        return { success: true, token: res.data as string };
      })
      .catch(err => {
        console.warn('catch', err.response);
        return { success: false, error: err.response.data };
      });
  }

  async authRegister(email: string, password: string, passwordRepeat: string, firstName: string, lastName: string): Promise<{ success: boolean, error?: string }> {
    return axios.post(`${config.apiRoot}/auth/register`, {
      email: email,
      password: password,
      passwordRepeat: passwordRepeat,
      firstName: firstName,
      lastName: lastName
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(res => {
        return { success: true };
      })
      .catch(err => {
        return { success: false, error: err.response.data };
      });
  }

  async authVerify(verificationCode: string): Promise<boolean> {
    return axios.post(`${config.apiRoot}/auth/verify?verificationGuid=${verificationCode}`, null, {
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(res => {
        return true;
      }).catch(err => {
        return false;
      });
  }
  async authResetPasswordStep1(email: string): Promise<boolean> {
    return axios.post(`${config.apiRoot}/auth/password-reset-step1?email=${email}`, null, {
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(res => {
        return true;
      }).catch(err => {
        return false;
      });
  }
  async authResetPasswordStep2a(password_reset_guid: string): Promise<boolean> {
    return axios.post(`${config.apiRoot}/auth/password-reset-step2a?password_reset_guid=${password_reset_guid}`, null, {
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(res => {
        return true;
      }).catch(err => {
        return false;
      });
  }
  async authResetPasswordStep2b(password_reset_guid: string, password: string, passwordRepeat: string): Promise<{ success: boolean, error?: string }> {
    return axios.post(`${config.apiRoot}/auth/password-reset-step2b`, {
      passwordResetGuid: password_reset_guid,
      password: password,
      passwordRepeat: passwordRepeat
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(res => {
        return { success: true };
      })
      .catch(err => {
        return { success: false, error: err.response.data };
      });
  }

  async authUserInfo(): Promise<{ success: boolean, payload: undefined | UserInfoInterface }> {
    return axios.post(`${config.apiRoot}/auth/user-info`, null, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      },
    })
      .then(res => {
        return { success: true, payload: res.data as UserInfoInterface };
      }).catch(err => {
        return { success: false, payload: undefined };
      });
  }

  async authUserTenant(tenant: string): Promise<{ success: boolean, payload: undefined | UserTenantInterface }> {
    return axios.post(`${config.apiRoot}/auth/user-tenant?tenant=${tenant}`, null, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      },
    })
      .then(res => {
        return { success: true, payload: res.data as UserTenantInterface };
      }).catch(err => {
        return { success: false, payload: undefined };
      });
  }

  async authUserTenants(): Promise<{ success: boolean, payload: undefined | UserTenantInterface[] }> {
    return axios.post(`${config.apiRoot}/auth/user-tenants`, null, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      },
    })
      .then(res => {
        return { success: true, payload: res.data as UserTenantInterface[] };
      }).catch(err => {
        return { success: false, payload: undefined };
      });
  }

  async paintingList(): Promise<{ success: boolean, payload: any }> {
    return axios.get(`${config.apiRoot}/painting/${this.tenant}/list-all`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      },
    })
      .then(res => {
        return { success: true, payload: res.data };
      }).catch(err => {
        return { success: false, payload: undefined };
      });
  }
  async paintingCreate(description: string): Promise<{ success: boolean, error?: string, payload?: any }> {
    return axios.post(`${config.apiRoot}/painting/${this.tenant}/create`, {
      description: description
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      },
    })
      .then(res => {
        return { success: true, payload: res.data };
      })
      .catch(err => {
        return { success: false, error: err.response.data };
      });
  }

  async paintingFileUpload(guid: string, file: File): Promise<{ success: boolean, error?: string, payload?: any }> {

    const formData = new FormData();
    formData.append("file", file);

    return axios.post(`${config.apiRoot}/painting/upload?painting=${guid}`, formData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      },
    })
      .then(res => {
        return { success: true, payload: res.data };
      })
      .catch(err => {
        return { success: false, error: err.response.data };
      });
  }

  async userRolesList(): Promise<{ success: boolean, payload: any }> {
    return axios.get(`${config.apiRoot}/user/${this.tenant}/roles`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      },
    })
      .then(res => {
        return { success: true, payload: res.data };
      }).catch(err => {
        return { success: false, payload: undefined };
      });
  }
  async fileLink(fileGuid: string): Promise<{ success: boolean, payload: any }> {
    return axios.get(`${config.apiRoot}/File/link/${fileGuid}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      },
    })
      .then(res => {
        return { success: true, payload: res.data };
      }).catch(err => {
        return { success: false, payload: undefined };
      });
  }
  async userEditSelf(firstName: string, lastName: string, defaultTenant: string | null, defaultLanguage: string): Promise<{ success: boolean, error?: string }> {
    return axios.post(`${config.apiRoot}/user/edit-self`, {
      firstName: firstName,
      lastName: lastName,
      defaultTenant: defaultTenant,
      defaultLanguage: defaultLanguage
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      },
    })
      .then(res => {
        return { success: true };
      })
      .catch(err => {
        return { success: false, error: err.response.data };
      });
  }
  async editUserRole(userGuid: string, nextRole: string): Promise<{ success: boolean, error?: string }> {
    return axios.post(`${config.apiRoot}/user/${this.tenant}/roleChange/${userGuid}/${nextRole}`, {}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      },
    })
      .then(res => {
        return { success: true };
      })
      .catch(err => {
        return { success: false, error: err.response.data };
      });
  }
}
