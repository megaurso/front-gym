import { useAuth } from "@/contexts/authContext";
import { ModalProps } from "@/interfaces/moda.interface";
import { UserData, userSchema } from "@/schema/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form"
import { useState } from "react";


const UserModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const {registerHome:registerUser} = useAuth()
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<UserData>({
        resolver: zodResolver(userSchema)
    });



    const onFormSubmit = (formData: UserData) => {
        const updatedFormData: UserData = {
            ...formData,
            isAdmin
        };

        registerUser(updatedFormData);
    };

    const handleTipoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        setIsAdmin(selectedValue === "funcionario");
    };

    if (!isOpen) {
        return null;
    }
    const handleCancelClick = () => {
        onClose();
    };    

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-gray-900">
          <div  className="bg-branco-90 rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-4 text-azul">Criar Novo Usuário</h2>
            <form onSubmit={handleSubmit(onFormSubmit)}>
              <div className="mb-4">
                <label className="block text-azul font-medium mb-1">Nome:</label>
                <input type="text" className="w-full  outline-azul px-3 py-2 border rounded" {...register("name")} required/>
                {errors.name && <p>{errors.name.message}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-azul font-medium mb-1">Email:</label>
                <input type="email" className="w-full  outline-azul px-3 py-2 border rounded" {...register("email")} required/>
                {errors.email && <p>{errors.email.message}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-azul font-medium mb-1">Senha:</label>
                <input type="password" className="w-full  outline-azul px-3 py-2 border rounded" {...register("password")} required/>
                {errors.password && <p>{errors.password.message}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-azul font-medium mb-1">CPF:</label>
                <input type="number" className="w-full  outline-azul px-3 py-2 border rounded [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" {...register("cpf")} required/>
                {errors.cpf && <p>{errors.cpf.message}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-azul font-medium mb-1">Tipo:</label>
                <select className="w-full px-3 py-2 outline-azul order rounded" onChange={handleTipoChange}>
                  <option value="aluno">Aluno</option>
                  <option value="funcionario">Funcionário</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-azul font-medium mb-1">Telefone:</label>
                <input type="number" className="w-full  outline-azul px-3 py-2 border rounded [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" {...register("phone")} required/>
                {errors.phone && <p>{errors.phone.message}</p>}
              </div>
              <div className="text-right">
                <button onClick={handleCancelClick} type="button" className="px-4 py-2 mr-2 border rounded  bg-gray-300 text-gray-700">
                  Cancelar
                </button>
                <button type="submit" className="px-4 py-2 border rounded bg-blue-500 text-white">
                  Criar Usuário
                </button>
              </div>
            </form>
          </div>
        </div>
    );
}

export default UserModal