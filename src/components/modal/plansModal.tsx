import { ModalProps } from "@/interfaces/moda.interface";
import { PlansInfo, plansSchema } from "@/schema/plans.schemas";
import { createPlans, deletePlan, getPlans } from "@/services/api.requsitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import {useForm} from "react-hook-form"

const PlansModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const cookies = parseCookies();
    const token = cookies["user.token"];
    const [loading, setLoading] = useState(false);
    const [plans, setPlans] = useState<PlansInfo[]>([]);


    useEffect(()=>{
        fetchData()
    },[loading])

    const fetchData = async () => {
        setLoading(true)
        const allPlansData = await getPlans(token);
        setPlans(allPlansData.data);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm<PlansInfo>();

    const handleCreatePlan = async (data: any) => {
        try {
            setLoading(true);
            data.price = parseFloat(data.price.replace(",", "."));
            await createPlans(token, data);
            fetchData();
        } catch (error) {
            console.error("Erro ao criar plano:", error);
        } finally {
            setLoading(false);
        }
    };

  
    
    if (!isOpen) {
        return null;
    }

    const handleCancelClick = () => {
        onClose();
        setLoading(false);
    };  

    const handleDeletePlan = async (token:string,userId:string) => {
        try {
            setLoading(true);
            await deletePlan(token,userId)

        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false);
        }
    }

    return(
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-gray-900">
            <div className="bg-branco-90 rounded-lg p-8 w-1/3 h-2/3">
                <div className="flex justify-end">
                    <button onClick={handleCancelClick} type="button" className="flex justify-end items-end px-4 py-2 mr-2 border rounded  bg-gray-300 text-gray-700">
                        X
                    </button>
                </div>
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Criar Novo Plano</h2>
                    <form onSubmit={handleSubmit(handleCreatePlan)}>
                        <div className="mb-4">
                            <label className="block text-azul font-medium mb-1">Nome:</label>
                            <input type="text" className="w-full  outline-azul px-3 py-2 border rounded" {...register("name")} required/>
                            {errors.name && <p>{errors.name.message}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-azul font-medium mb-1">Preço:</label>
                            <input
                            type="number"
                            className="w-full outline-azul px-3 py-2 border rounded [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            {...register("price")}
                        />
                            {errors.price && <p>{errors.price.message}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-azul font-medium mb-1">Validade:</label>
                            <select className="w-full px-3 py-2 outline-azul order rounded"   {...register("validity")} onChange={(e) => setValue("validity", e.target.value as PlansInfo["validity"])}>
                                <option value="Mensal">30 dias</option>
                                <option value="Trimestral">3 meses</option>
                                <option value="Semestral">6 meses</option>
                                <option value="Anual">1 ano</option>
                            </select>
                        </div>
                        <div className="text-right">
                            <button onClick={handleCancelClick} type="button" className="px-4 py-2 mr-2 border rounded  bg-gray-300 text-gray-700">
                            Cancelar
                            </button>
                            <button type="submit" className="px-4 py-2 border rounded bg-blue-500 text-white">
                            Criar Plano
                            </button>
                        </div>
                    </form>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <h2>Planos atuais</h2>
                    <ul className="flex gap-6 w-9/12 overflow-x-auto">
                        {plans.map((plan) => (
                            <li key={plan.id}>
                                <p>{plan.name}</p>
                                <p>R$: {plan.price}</p>
                                <p>{plan.validity}</p>
                                <button onClick={()=> handleDeletePlan(token,plan.id!)}>Deletar plano</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default PlansModal