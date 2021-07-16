
import authSaga from "features/auth/authSaga";
import templateSaga from "features/template/templateSaga";
import { all } from "redux-saga/effects";

export default function* rootSaga() {
    //console.log('Root saga');
    yield all([authSaga(), templateSaga()]);
}