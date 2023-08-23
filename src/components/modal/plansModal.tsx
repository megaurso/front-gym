import { ModalProps } from "@/interfaces/moda.interface";
import { PlansInfo, plansSchema } from "@/schema/plans.schemas";
import { createPlans, deletePlan, getPlans } from "@/services/api.requsitions";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import {useForm} from "react-hook-form"

const PlansModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const router = useRouter();
    const cookies = parseCookies();
    const token = cookies["user.token"];
    const [plansLoaded, setPlansLoaded] = useState(false);
    const [plans, setPlans] = useState<PlansInfo[]>([]);

    useEffect(() => {
        if (isOpen && !plansLoaded) {
          fetchData();
          setPlansLoaded(true);
        }
    }, [isOpen, plansLoaded]);

    const fetchData = async () => {
        const allPlansData = await getPlans(token);
    
        if (allPlansData && allPlansData.data) {
            setPlans(allPlansData.data);
        } else {
            setPlans([]);
        }
    
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm<PlansInfo>();

    const handleCreatePlan = async (data: any) => {
        try {
            setPlansLoaded(true);

            data.price = parseFloat(data.price.replace(",", "."));
            await createPlans(token, data);
            fetchData();
        } catch (error) {
            console.error("Erro ao criar plano:", error);
        }finally{
            setPlansLoaded(false);
        }
    };

    if (!isOpen) {
        return null;
    }

    const handleCancelClick = () => {
        onClose();
        router.reload()
    };  

    const handleDeletePlan = async (token:string,userId:string) => {
        try {
            setPlansLoaded(true);
            await deletePlan(token,userId)

        } catch (error) {
            
            console.log(error)
        }finally{
            setPlansLoaded(false);
        }
    }

    return(
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-gray-900">
            <div className="bg-white rounded-lg p-8 w-1/4 h-2/3">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-4xl font-extrabold text-azul">Novo plano</h2>
                    <button onClick={handleCancelClick} type="button" className="text-5xl font-extrabold rounded text-azul">
                        X
                    </button>
                </div>
                <div>
                    <form onSubmit={handleSubmit(handleCreatePlan)}>
                        <div className="mb-4">
                            <label className="block text-azul mb-1">Modalidade:</label>
                            <input type="text" className="w-full text-azul outline-azul  bg-azul-50 px-3 py-2 border rounded" {...register("name")} required/>
                            {errors.name && <p>{errors.name.message}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-azul mb-1">Preço:</label>
                            <input
                            type="number"
                            className="w-full text-azul outline-azul  bg-azul-50 px-3 py-2 border rounded [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            {...register("price")}
                        />
                            {errors.price && <p>{errors.price.message}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-azul mb-1">Validade:</label>
                            <select className="w-full text-azul appearance-none cursor-pointer px-3 py-2 outline-azul  bg-azul-50 order rounded"   {...register("validity")} onChange={(e) => setValue("validity", e.target.value as PlansInfo["validity"])}>
                                <option value="Mensal">30 dias</option>
                                <option value="Trimestral">3 meses</option>
                                <option value="Semestral">6 meses</option>
                                <option value="Anual">1 ano</option>
                            </select>
                        </div>
                        <div className="text-right mb-2 ">
                            <button onClick={handleCancelClick} type="button" className="px-4 py-2 mr-2 border rounded text-azul hover:text-amarelo hover:bg-azul-50">
                            Cancelar
                            </button>
                            <button type="submit" className="px-4 py-2 border rounded bg-azul text-white hover:text-amarelo hover:bg-blue-800">
                            Criar Plano
                            </button>
                        </div>
                    </form>
                </div>
                <h2 className="text-azul text-2xl font-extrabold mb-2">Planos existentes</h2>
                <div className="justify-center items-center">
                    <ul className="flex overflow-x-auto border border-azul rounded-md p-1 h-40 gap-2">
                        {plans.map((plan) => (
                            <li className=" font-semibold w-36 text-azul flex flex-col items-center justify-center border-r-2 rounded-sm border-azul p-4" key={plan.id}>
                                <p>{plan.name}</p>
                                <p className="text-base">R$:{plan.price}</p>
                                <p className="text-sm mb-3">{plan.validity}</p>
                                <button className="leading-4 hover:text-red-600" onClick={()=> handleDeletePlan(token,plan.id!)}>Deletar plano</button>
                            </li>
                            
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default PlansModal