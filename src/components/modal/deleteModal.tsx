import { ModalDeleteProps } from "@/interfaces/moda.interface";
import { deleteUser } from "@/services/api.requsitions";
import { useRouter } from "next/router";
import { destroyCookie, parseCookies } from "nookies";

const DeleteModal: React.FC<ModalDeleteProps> =({isOpen, onClose,userId})=>{
    const cookies = parseCookies();
    const router = useRouter();
    const token = cookies["user.token"];

    if (!isOpen) {
        return null;
    }

    const handleCancelClick = () => {
        onClose();
    };  

    const handleDeleteUser = async (token:string) => {
        try {
            destroyCookie(null, "user.token");
            destroyCookie(null, "user.user_id");
            await deleteUser(token,userId)
            router.push('/login');

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-gray-900">
            <div className="bg-white rounded-lg p-8 flex flex-col items-end justify-end">
                <button onClick={handleCancelClick} type="button" className="mb-1 text-2xl font-extrabold rounded text-azul">
                    X
                </button>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl  font-extrabold text-azul">Deseja deletar sua conta?</h2>
                </div>
                <div className="flex items-center justify-center w-full">
                    <button onClick={handleCancelClick} className="text-sm text-amarelo bg-azul p-3 rounded-lg hover:bg-blue-600 w-full border-2 flex items-center justify-center">Cancelar</button>
                    <button onClick={()=> handleDeleteUser(token)} className="text-sm text-branco-90 p-3 rounded-lg hover:bg-red-700 border-2 bg-red-400 w-full flex items-center justify-center">Deletar conta</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal