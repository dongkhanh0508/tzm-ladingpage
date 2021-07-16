import { AuthRequest } from "models";
import axiosClient from "./axiosClient";

const authApi = {
    authUsernamePass(data: AuthRequest): Promise<string> {
        const url = '/accounts/authenticate-username-pass';
        return axiosClient.post(url, data);
    },
}
export default authApi;