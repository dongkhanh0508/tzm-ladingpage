import { RootState } from './../../app/store';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthRequest } from "models";
import { User } from "models/dto/user";

export interface AuthState {
    isLoggedIn: boolean;
    logging?: boolean;
    currentUser?: User;
}
const initialState: AuthState = {
    isLoggedIn: false,
    logging: false,
    currentUser: undefined
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<AuthRequest>) {
            state.logging = true;
        },
        loginSuccess(state, action: PayloadAction<User>) {
            state.isLoggedIn = true;
            state.logging = false;
            state.currentUser = action.payload;
        },
        loginFailed(state, action: PayloadAction<string>) {
            state.logging = false;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.currentUser = undefined;
        },
    }
});
export const authAction = authSlice.actions;
export const selectAuthLoading = (state: RootState) => state.auth.logging;
const authReducer = authSlice.reducer;
export default authReducer;
