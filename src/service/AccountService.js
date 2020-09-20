import axios from "axios";
import ApiUrl from "../common/ApiUrl";

export default class AccountService {
    static register(userName, password) {
        return new Promise((resolve, reject) => {
            axios.post(ApiUrl.REGISTER_URL, {
                userName: userName,
                password: password
            }).then(response => {
                resolve(response.data);
            }).catch(reason => {
                reject(reason);
            });
        });
    }

    static login(userName, password) {
        return new Promise((resolve, reject) => {
            axios.post(ApiUrl.LOGIN_URL, {
                userName: userName,
                password: password
            }).then(response => {
                resolve(response.data);
            }).catch(reason => {
                reject(reason);
            });
        });
    }
}