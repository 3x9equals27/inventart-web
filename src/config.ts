export interface Config {
    appName: string,
    webRoot: string,
    apiRoot: string,
    hopSource: string,
    hopModels: string,
    auth0_domain: string,
    auth0_clientId: string,
    auth0_audience: string
  }

export const config: Config = {
    appName: 'Inventart Web',
    webRoot : process.env.PUBLIC_URL,
    hopSource: process.env.REACT_APP_3DHOP_SOURCE as string,
    hopModels: process.env.REACT_APP_3DHOP_MODELS as string,
    apiRoot: process.env.REACT_APP_API_ENDPOINT as string,
    auth0_domain: process.env.REACT_APP_AUTH0_DOMAIN as string,
    auth0_clientId: process.env.REACT_APP_AUTH0_CLIENT_ID as string,
    auth0_audience: process.env.REACT_APP_AUTH0_AUDIENCE as string
}