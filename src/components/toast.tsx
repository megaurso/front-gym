import { toast } from "react-toastify";

interface IToastsProps {
    message: string;
    isSucess?: boolean
}

const Toast =({message,isSucess = false}:IToastsProps) =>{
    return isSucess
        ? toast.success(message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
        :   toast.error(message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
}

export default Toast