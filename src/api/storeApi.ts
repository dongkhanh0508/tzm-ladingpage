import { StoreAttrs } from './../models/dto/attr';
import { Store } from "models";
import axiosClient from "./axiosClient";
import { FetchAttrs } from 'features/template/templateSlice';

const storeApi = {
    getAll(): Promise<Array<Store>> {
        const url = '/stores/brand';
        return axiosClient.get(url);
    },
    getAttr(params: FetchAttrs): Promise<Array<StoreAttrs>> {
        const url = '/stores/' + params.storeId + '/store-type/' + params.typeId + '/attr-group-details';
        return axiosClient.get(url);
    },
}
export default storeApi;