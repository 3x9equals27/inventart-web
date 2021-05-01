import axios from 'axios';
import { config } from '../../config';

export class InventartApi {
    BASE_URL = config.apiRoot;
    token?: string;

    constructor();
    constructor(token?: string) {
        this.token = token;
    }

    async authLogin(username:string, password:string): Promise<{ success: boolean, token?: string, error?: string }> {
      return axios.post(`${config.apiRoot}/auth/login`, {
        email: username,
        password: password
      },{
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
}
