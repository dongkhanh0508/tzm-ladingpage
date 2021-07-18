import { storeActions } from './storeSlice';
import { call, put, takeLatest } from "redux-saga/effects";
import { PaginationRequest, Response, Store, StoreType } from 'models';
import storeApi from 'api/storeApi';
import { PayloadAction } from '@reduxjs/toolkit';


function* fetchStore(action: PayloadAction<PaginationRequest>) {
    try {
        const rs: Response<Store> = yield call(storeApi.getAllPaging, action.payload);
        yield put(storeActions.fetchStoreSuccess(rs));
    } catch (error) {
        yield put(storeActions.fetchStoreError(''));
        console.log(error);
    }
}
function* fetchStoreType() {
    try {
        const rs: Array<StoreType> = yield call(storeApi.getStoreTypes);
        yield put(storeActions.fetchStoreTypeSuccess(rs));
    } catch (error) {
        yield put(storeActions.fetchStoreTypeError());
        console.log(error);
    }
}
export default function* storeSaga() {
    //watch fetch student action
    yield takeLatest(storeActions.fetchStores.type, fetchStore);
    yield takeLatest(storeActions.fetchStoreType.type, fetchStoreType);
}