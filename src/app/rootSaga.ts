
import adminLevelSaga from "features/admin-level/adminLevelSaga";
import authSaga from "features/auth/authSaga";
import poiBrandsSaga from "features/poi/poiBrandSaga";
import poiSaga from "features/poi/poiSaga";
import storeSaga from "features/store-management/storeSaga";
import templateSaga from "features/template/templateSaga";
import { all } from "redux-saga/effects";

export default function* rootSaga() {
    //console.log('Root saga');
    yield all([authSaga(), templateSaga(), storeSaga(), poiSaga(), adminLevelSaga(), poiBrandsSaga()]);
}