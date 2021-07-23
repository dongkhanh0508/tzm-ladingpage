import { PayloadAction } from '@reduxjs/toolkit';
import authApi from 'api/authApi';
import { push } from 'connected-react-router';
import { AuthRequest, User } from 'models';
import { call, fork, put, take } from "redux-saga/effects";
import { authAction } from './authSlice';
import jwtDecode, { JwtPayload } from "jwt-decode";


function* handleLogin(payload: AuthRequest) {
    try {
        const jwt: string = yield call(authApi.authUsernamePass, payload)
        const decoded = jwtDecode<JwtPayload>(jwt);
        // const ccc = process.env.REACT_APP_API_URL;
        const test = process.env.NAME_IDENTIFIER;
        console.log(test);

        const id = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
        const user: Promise<User> = yield call(authApi.getMe, id);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('access_token', jwt);
        localStorage.setItem('time_expire', decoded.exp?.toString() || '');

        yield put(push('/dashboard'));
    } catch (error) {
        yield put(authAction.loginFailed(error.message));
    }
}
function* handleLogout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    localStorage.removeItem("time_expire");
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