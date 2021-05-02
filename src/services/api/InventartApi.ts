import axios from 'axios';
import { config } from '../../config';

export class InventartApi {
  BASE_URL = config.apiRoot;
  token?: string;

  constructor();
  constructor(token?: string) {
    this.token = token;
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
  
}
