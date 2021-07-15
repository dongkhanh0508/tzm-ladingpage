import { PayloadAction } from '@reduxjs/toolkit';
import authApi from 'api/authApi';
import { push } from 'connected-react-router';
import { AuthRequest } from 'models';
import { call, fork, put, take } from "redux-saga/effects";
import { authAction } from './authSlice';


function* handleLogin(payload: AuthRequest) {
    try {
        const jwt: string = yield call(authApi.authUsernamePass, payload)

        localStorage.setItem('access_token', jwt);
        yield put(authAction.loginSuccess({
            id: 1,
            name: "khanhnd"
        }));
        yield put(push('/dashboard'));
    } catch (error) {
        yield put(authAction.loginFailed(error.message));
    }
}
function* handleLogout() {
    localStorage.removeItem("access_token");
    yield put(push('/login'));
}
function* watchLoginFlow() {
    while (true) {
        const isLoggedIn = Boolean(localStorage.getItem('access_token'));
        if (!isLoggedIn) {
            const action: PayloadAction<AuthRequest> = yield take(authAction.login.type);
            yield fork(handleLogin, action.payload);
        }

        yield take(authAction.logout.type);
        yield call(handleLogout);
    }

}
export default function* authSaga() {

    yield fork(watchLoginFlow);

}