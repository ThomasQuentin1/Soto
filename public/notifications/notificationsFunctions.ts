import {toast} from "react-toastify";

export const notifySuccess = (msg: String) => {
    toast.success(msg)
};
export const notifyError = (msg: String) => {
    toast.error(msg)
};