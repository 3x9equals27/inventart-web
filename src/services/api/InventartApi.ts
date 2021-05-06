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
        return { success: true, token: res.data };
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

  async authUserInfo(): Promise<{success:boolean, payload: undefined | UserInfoInterface}> {
    return axios.post(`${config.apiRoot}/auth/user-info`, null, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      },
    })
      .then(res => {
        return {success: true, payload: res.data};
      }).catch(err => {
        return {success: false, payload: undefined};
      });
  }

  async authUserTenant(tenant: string): Promise<{success:boolean, payload: undefined | UserTenantInterface}> {
    return axios.post(`${config.apiRoot}/auth/user-tenant?tenant=${tenant}`, null, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      },
    })
      .then(res => {
        return {success: true, payload: res.data};
      }).catch(err => {
        return {success: false, payload: undefined};
      });
  }

  async authUserTenants(): Promise<{success:boolean, payload: undefined | UserTenantInterface[]}> {
    return axios.post(`${config.apiRoot}/auth/user-tenants`, null, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      },
    })
      .then(res => {
        return {success: true, payload: res.data};
      }).catch(err => {
        return {success: false, payload: undefined};
      });
  }

  async diagnosticoList(): Promise<{success:boolean, payload: any}> {
    return axios.get(`${config.apiRoot}/diagnostic/${this.tenant}/list-all`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      },
    })
      .then(res => {
        return {success: true, payload: res.data};
      }).catch(err => {
        return {success: false, payload: undefined};
      });
  }
  async fileLink(fileGuid: string): Promise<{success:boolean, payload: any}> {
    return axios.get(`${config.apiRoot}/File/link/${fileGuid}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      },
    })
      .then(res => {
        return {success: true, payload: res.data};
      }).catch(err => {
        return {success: false, payload: undefined};
      });
  }
  
}
