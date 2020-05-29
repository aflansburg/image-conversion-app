const CloudmersiveImageApiClient = require('cloudmersive-image-api-client');

const API_KEY: string = '4e7119c6-a345-40a4-af43-bb3ec5ee2756';

export default class CloudmersiveService {
  public convertImage(file: string, cb: Function) {
    const defaultClient = CloudmersiveImageApiClient.ApiClient.instance;
    const Apikey = defaultClient.authentications['Apikey'];
    Apikey.apiKey = API_KEY;

    const imageConvertApi = new CloudmersiveImageApiClient.ConvertApi();
    return imageConvertApi.convertToPng(file, cb);
  }
}
