import { config } from '../../config';

export class InventartApi {
    BASE_URL = config.apiRoot;
    token: string;

    constructor(token: string) {
        this.token = token;
    }
}
