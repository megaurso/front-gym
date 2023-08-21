import HeaderHomes from "@/components/headers/header.homes"
import { GetServerSideProps } from "next"
import {BiEdit} from "react-icons/bi"
import nookies, { destroyCookie, parseCookies } from "nookies"
import { use, useEffect, useRef, useState } from "react"
import { PlansInfo } from "@/schema/plans.schemas"
import { deleteUser, editUser, getOnePlan, getPlans, getUser } from "@/services/api.requsitions"
import { InfoUserEdit } from "@/schema/user.schema"
import Toast from "@/components/toast"
import { useRouter } from "next/router"
import PlansModal from "@/components/modal/plansModal"

const Profile = () =>{
    const router = useRouter();
    const cookies = parseCookies()
    const token = cookies["user.token"]
    const userId = cookies["user.user_id"]
    const [plans, setPlans] = useState<PlansInfo[]>([]);
    const [currentPlan, setCurrentPlan] = useState<PlansInfo | null>();
    const [user, setUser] = useState<InfoUserEdit>();
    const [loading,setLoading] = useState(false)
    const [fieldValues, setFieldValues] = useState({
        name: user?.name || "",
        email: user?.email || "",
        cpf: user?.cpf || "",
        phone: user?.phone || "",
        password: "", 
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    useEffect(()=>{
        const fetchData = async () => {
            const allPlans = await getPlans(token)
            const userData = await getUser(token, userId)
            setUser(userData)
            setPlans(allPlans.data)
            if (userData && userData.current_plan) {
                const userPlan = await getOnePlan(token, userData.current_plan);
                
                if (userPlan) {
                  setCurrentPlan(userPlan);
                } 
            } 
        }
        fetchData()
    },[token,loading])
    
    const handlePlanChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedPlanId = e.target.value;
        setLoading(true)

        if (selectedPlanId === "no-plan") {
          setCurrentPlan(null);
        } else {
          const selectedPlan = plans.find((plan) => plan.id === selectedPlanId);
          if (selectedPlan) {
            try {
                const updatedUserFields = {current_plan: selectedPlanId,};
                await editUser(token,userId,updatedUserFields)
                setLoading(false)
                Toast({ message: "Plano editado com sucesso", isSucess: true });
                
            } catch (error) {
                console.log(error)
            }
          }
        }
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

    const handleFieldChange = (field: string, value: string) => {
        setFieldValues((prevFieldValues) => ({
          ...prevFieldValues,
          [field]: value,
        }));
    };

    const handleProfileFieldEdit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        const fieldName = e.currentTarget.getAttribute("data-field");
        const fieldValue = fieldValues[fieldName as keyof typeof fieldValues];

        if (fieldName === "cpf" && fieldValue.length === 10) {
            Toast({ message: "O CPF deve conter 11 dígitos.", isSucess: false });
            return;
        }

        try {
            const updatedUserFields = { [fieldName!]: fieldValues[fieldName as keyof typeof fieldValues] };
            await editUser(token, userId, updatedUserFields);
            Toast({ message: "Campo editado com sucesso", isSucess: true });
          } catch (error) {
            console.log(error);
        }
       
    }

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };
    
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="w-screen h-screen">
            <div className="container mx-auto p-6 rounded-lg shadow-2xl flex flex-col">
                <HeaderHomes href={"/home-page"} linkText={"Inicio"}/>
                <main>
                    <h2 className="text-2xl m-10">Informações da conta</h2>
                    <div className="flex items-center justify-around w-full">
                        <div className="flex flex-col text-2xl">
                            <h3 className="text-3xl">Nome de exibição</h3>
                            <div className="flex pl-1 cursor-pointer"> 
                                <input value={fieldValues.name || user?.name} onChange={(e) => handleFieldChange('name', e.target.value)} />
                                <button data-field="name"  disabled={!fieldValues.name.trim()} onClick={handleProfileFieldEdit} type="button"><BiEdit/></button>
                            </div>
                        </div>
                        <div className="flex flex-col text-2xl">
                            <h3 className="text-3xl">Email de exibição</h3>
                             <div className="pl-1 flex cursor-pointer">
                                <input value={fieldValues.email || user?.email} onChange={(e) => handleFieldChange('email', e.target.value)} />
                                <button data-field="email"  disabled={!fieldValues.email.trim()} onClick={handleProfileFieldEdit} type="button"><BiEdit/></button>
                            </div>
                        </div>
                    </div>
                    <div className="p-3 shadow-lg"></div>
                    <div className="flex mt-5 items-center justify-around w-full">
                        <div className="flex flex-col text-2xl">
                            <h3 className="text-3xl">Cpf do titular</h3>
                            <div className="flex pl-1 cursor-pointer"> 
                                <input  value={fieldValues.cpf || user?.cpf} onChange={(e) => handleFieldChange('cpf', e.target.value)}/>
                                <button data-field="cpf"  disabled={!fieldValues.cpf.trim()} onClick={handleProfileFieldEdit} type="button"><BiEdit/></button>
                            </div>
                        </div>
                        <div className="flex flex-col text-2xl">
                            <h3 className="text-3xl">Telefone</h3>
                            <div className="pl-1 flex cursor-pointer">
                                <input value={fieldValues.phone || user?.phone} onChange={(e) => handleFieldChange('phone', e.target.value)}/>
                                <button data-field="phone"  disabled={!fieldValues.phone.trim()} onClick={handleProfileFieldEdit} type="button"><BiEdit/></button>
                            </div>
                        </div>
                    </div>
                    <div className="p-3 shadow-lg"></div>
                    <div className="flex mt-5 items-center justify-around w-full">
                        <div className="flex flex-col text-2xl">
                            <h3 className="text-3xl">Alterar senha</h3>
                            <div className="flex pl-1 cursor-pointer"> 
                                <input type="password" defaultValue="*********" onChange={(e) => handleFieldChange('password', e.target.value)}/>
                                <button data-field="password"  disabled={!fieldValues.password.trim()} onClick={handleProfileFieldEdit} type="button"><BiEdit/></button>
                            </div>
                        </div>
                        <div className="flex flex-col text-2xl">
                            <h3 className="text-3xl">Cargo</h3>
                            <div className="pl-1 flex cursor-pointer">
                                <input value={user?.isAdmin ? "Funcionário" : "Aluno"} disabled/>
                            </div>
                        </div>
                    </div>
                    <div className="p-3 shadow-lg"></div>
                    <div className="flex flex-col gap-10 mt-5 justify-center items-center">
                        <h3 className="text-3xl">Plano do perfil atual</h3>
                        <select value={currentPlan ? currentPlan.id : "no-plan"} onChange={handlePlanChange}>
                            <option value="no-plan">Cliente não tem plano</option>
                            {plans.map((plan) => (
                                <option
                                    key={plan.id}
                                    value={plan.id}
                                >
                                    {`${plan.name} valor:${plan.price} duração:${plan.validity}`}
                                </option>
                            ))}
                        </select>
                        <button onClick={handleOpenModal} className="bg-amarelo text-branco-90">Planos</button>
                        <button onClick={()=> handleDeleteUser(token)} className="bg-red-500 text-branco-90">Deletar conta</button>
                    </div>
                </main>
            </div>
            <PlansModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>

    )
}

export default Profile

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const cookies = nookies.get(ctx)
    if(!cookies["user.token"]){
      return {
        redirect:{
          destination: "/login",
          permanent: false
        }
      }
    }
    
    return {
      props:{},
    }
}