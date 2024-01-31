import { toast } from "react-toastify";
const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
  };
export function AlertSuccess(content){
    return toast.success(content, ToastObjects);
}
export function AlertWarning(content){
    return toast.warning(content, ToastObjects);
}
export function AlertError(content){
    return toast.error(content, ToastObjects);
}
