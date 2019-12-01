import axios, { AxiosRequestConfig, CancelTokenStatic, CancelTokenSource } from 'axios';
import { APP_CONFIG } from '../config/app.config';

export interface IHttpServices {
    httpUnsuscribe: Function;
    httpServicesGet: Function;
}

class HttpServices implements IHttpServices {
    CancelToken: CancelTokenStatic;
    source: CancelTokenSource;
    axiosPostOption: AxiosRequestConfig;

    constructor() {
        this.CancelToken = axios.CancelToken;
        this.source = this.CancelToken.source();
        this.axiosPostOption = {
            withCredentials: true,
            cancelToken: this.source.token
        };
    }

    private getUrl = (endPoint:string): string => {
        let url: string;
        url = APP_CONFIG.API_URL + endPoint;
        return url;
    };

    /************** START API services*********************************************/

    httpUnsuscribe = (componentUnmountedName: string, apiName: string = 'generic') => {
        this.source.cancel(componentUnmountedName + ' component unmounted, ' + apiName + ' API cancelled');
    };

    httpServicesGet = (endPoint: string) => {
        return axios.get(this.getUrl(endPoint), this.axiosPostOption);
    };

    /************** END API services*********************************************/
}

export default HttpServices;
