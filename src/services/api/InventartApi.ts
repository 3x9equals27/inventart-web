import axios, { AxiosResponse } from 'axios';
import { TFunction } from 'react-i18next';
import { config } from '../../config';
import { ApiResponse } from '../../interfaces/api.interface';

export class InventartApi {
  BASE_URL = config.apiRoot;
  t: TFunction;
  token?: string;
  tenant?: string;

  constructor(t: TFunction, token?: string, tenant?: string) {
    this.t = t;
    this.token = token;
    this.tenant = tenant;
  }

  private async get(url: string): Promise<ApiResponse> {
    return axios.get(`${config.apiRoot}/${url}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      },
    })
      .then(res => this.successHandler(res))
      .catch(err => this.errorHandler(err));
  }
  private async post(url: string, data: any = null): Promise<ApiResponse> {
    return axios.post(`${config.apiRoot}/${url}`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      },
    })
      .then(res => this.successHandler(res))
      .catch(err => this.errorHandler(err));
  }
  private successHandler(res: AxiosResponse<unknown, any>): ApiResponse {
    return {
      success: true,
      payload: res.data
    };
  }
  private errorHandler(error: any): ApiResponse {
    let errorCode: string = error.response.data;
    let translatedErrorCode: string = this.t([`api-error:${errorCode}`, 'api-error:generic']);
    let result: ApiResponse = {
      success: false,
      payload: errorCode,
      errorMessage: translatedErrorCode
    };
    console.warn('api errorHandler', result);
    return result;
  }

  public async authLogin(username: string, password: string): Promise<ApiResponse> {
    return this.post('auth/login', {
      email: username,
      password: password
    });
  }

  async authRegister(email: string, password: string, passwordRepeat: string, firstName: string, lastName: string): Promise<ApiResponse> {
    return this.post(`auth/register`, {
      email: email,
      password: password,
      passwordRepeat: passwordRepeat,
      firstName: firstName,
      lastName: lastName
    });
  }

  async authVerify(verificationCode: string): Promise<ApiResponse> {
    return this.post(`auth/verify?verificationGuid=${verificationCode}`);
  }
  async authResetPasswordStep1(email: string): Promise<ApiResponse> {
    return this.post(`auth/password-reset-step1?email=${email}`);
  }
  async authResetPasswordStep2a(password_reset_guid: string): Promise<ApiResponse> {
    return this.post(`auth/password-reset-step2a?password_reset_guid=${password_reset_guid}`);
  }
  async authResetPasswordStep2b(password_reset_guid: string, password: string, passwordRepeat: string): Promise<ApiResponse> {
    return this.post(`auth/password-reset-step2b`, {
      passwordResetGuid: password_reset_guid,
      password: password,
      passwordRepeat: passwordRepeat
    });
  }

  async authUserInfo(): Promise<ApiResponse> {
    return this.post(`auth/user-info`);
  }

  async authUserTenant(tenant: string): Promise<ApiResponse> {
    return this.post(`auth/user-tenant?tenant=${tenant}`);
  }

  async authUserTenants(): Promise<ApiResponse> {
    return this.post(`auth/user-tenants`);
  }

  async paintingList(): Promise<ApiResponse> {
    return this.get(`painting/${this.tenant}/list-all`);
  }
  async paintingCreate(description: string): Promise<ApiResponse> {
    return this.post(`painting/${this.tenant}/create`, {
      description: description
    });
  }
  async paintingFileUpload(guid: string, file: File): Promise<ApiResponse> {
    const formData = new FormData();
    formData.append("file", file);
    return this.post(`painting/upload?painting=${guid}`, formData);
  }

  async userRolesList(): Promise<ApiResponse> {
    return this.get(`user/${this.tenant}/roles`);
  }
  async fileLink(fileGuid: string): Promise<ApiResponse> {
    return this.get(`file/link/${fileGuid}`);
  }
  async userEditSelf(firstName: string, lastName: string, defaultTenant: string | null, defaultLanguage: string): Promise<ApiResponse> {
    return this.post(`user/edit-self`, {
      firstName: firstName,
      lastName: lastName,
      defaultTenant: defaultTenant,
      defaultLanguage: defaultLanguage
    });
  }
  async editUserRole(userGuid: string, nextRole: string): Promise<ApiResponse> {
    return this.post(`user/${this.tenant}/roleChange/${userGuid}/${nextRole}`);
  }
}
