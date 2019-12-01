import { AxiosResponse } from 'axios';
import HttpServices, { IHttpServices } from './http.services';

export interface IItemServices {
    checkError: Function;
    getError: Function;
    getResult: Function;
    getItemList: Function;
    seatchItem: Function;
    unsuscribe: Function;
}

class ItemServices implements IItemServices {
    httpService: IHttpServices;
    constructor() {
        this.httpService = new HttpServices();
    }

    /************** START Response utilities*********************************************/

    checkError = (res: AxiosResponse): Boolean => {
        if (res.data.error) {
            return true;
        } else {
            return false;
        }
    };

    getError = (res: AxiosResponse) => {
        return {
            code: res.data.error.code,
            message: res.data.error.message
        };
    };

    getResult = (res: AxiosResponse) => {
        return res.data;
    };

    /************** END Response utilities*********************************************/

    /************** START API services*********************************************/

    getItemList = () => {
        const endpoint = 'comments';
        return this.httpService.httpServicesGet(endpoint);
    };

    seatchItem = (q: string) => {
        const endpoint = 'comments?q=' + q;
        return this.httpService.httpServicesGet(endpoint);
    };

    unsuscribe = (componentUnmountedName: string = 'GenericComponent') => {
        this.httpService.httpUnsuscribe(componentUnmountedName, 'Accounts');
    };

    /************** END API services*********************************************/
}

export default ItemServices;
