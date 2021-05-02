export interface Config {
    appName: string,
    webRoot: string,
    apiRoot: string,
    hopSource: string,
    hopModels: string,
  }

export const config: Config = {
    appName: 'Inventart Web',
    webRoot : process.env.PUBLIC_URL,
    hopSource: process.env.REACT_APP_3DHOP_SOURCE as string,
    hopModels: process.env.REACT_APP_3DHOP_MODELS as string,
    apiRoot: process.env.REACT_APP_API_ENDPOINT as string,
}