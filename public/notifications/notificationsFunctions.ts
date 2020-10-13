import {toast} from "react-toastify";

export const loginSuccess = (msg: String) => {
    toast.success(msg)
};
export const loginError = (msg: String) => {
    toast.error(msg)
};