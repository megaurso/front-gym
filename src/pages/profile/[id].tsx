import DeleteUserModal from "@/components/modal/deleteUserModal";
import Toast from "@/components/toast";
import { PlansInfo } from "@/schema/plans.schemas";
import { InfoUserEdit } from "@/schema/user.schema";
import {  editUser, getOnePlan, getPlans, getUser } from "@/services/api.requsitions";
import { GetServerSideProps } from "next"
import Image from "next/image";
import Link from "next/link"
import { useRouter } from "next/router";
import nookies, { destroyCookie, parseCookies } from "nookies"
import { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";

const ProfileUser = () =>{
    const cookies = parseCookies()
    const token = cookies["user.token"]
    const router = useRouter();
    const { id } = router.query;
    const userId = typeof id === 'string' ? id : '';

    const [plans, setPlans] = useState<PlansInfo[]>([]);
    const [user, setUser] = useState<InfoUserEdit>();
    const [loading,setLoading] = useState(false)
    const [currentPlan, setCurrentPlan] = useState<PlansInfo | null>();
    const [fieldValues, setFieldValues] = useState({
        name: user?.name || "",
        email: user?.email || "",
        cpf: user?.cpf || "",
        phone: user?.phone || "",
        password: "", 
    });
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

    useEffect(()=>{
        const fetchData = async () => {
            const allPlans = await getPlans(token)
            const userData = await getUser(token, userId)
            setUser(userData)
            if (allPlans && allPlans.data) {
                setPlans(allPlans.data);
            }

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

    const handleLogout = () =>{
        destroyCookie(null, "user.token");
        destroyCookie(null, "user.user_id");
    }

    const handleOpenModalDelete = () => {
        setIsModalDeleteOpen(true);
    };
    
    const handleCloseModalDelete = () => {
        setIsModalDeleteOpen(false);
    };
    return (
        <div className="w-screen h-screen">
            <div className="container mx-auto p-6 rounded-lg shadow-2xl flex flex-col">
                <header className="flex justify-between w-full mb-4 font-bold items-center">
                    <Image src={"/logo.svg"} width={300} height={300} alt="logo" className="mb-2"></Image>
                    <div className="flex w-2/6">
                        <Link href={"/home-page"} className="buttonHomes">Inicio</Link>
                        <div className="pl-3 flex justify-center items-center text-azul text-4xl">|</div>
                        <Link href={"/"} onClick={handleLogout} className="buttonHomes">Sair</Link>
                    </div>
                </header>
                <main>
                    <div className="border-t-2 mt-5 pt-5 border-t-azul flex items-center justify-between">
                        <h2 className="text-4xl font-bold text-azul">Informações da conta</h2>
                        <button onClick={handleOpenModalDelete} className="text-sm text-branco-90 p-3 rounded-lg hover:bg-red-700 border-2 bg-red-400 flex items-center justify-center">Deletar conta</button>
                    </div>
                    <div className="flex items-center justify-around w-full mt-20">
                        <div className="flex flex-col text-2xl">
                            <h3 className="text-lg text-azul">Nome de exibição</h3>
                            <div className="flex pl-1 border border-azul rounded-md text-azul"> 
                                <input value={fieldValues.name || user?.name} onChange={(e) => handleFieldChange('name', e.target.value)} className="outline-none bg-azul-50 p-1"/>
                                <button data-field="name"  disabled={!fieldValues.name.trim()} onClick={handleProfileFieldEdit} type="button"><BiEdit/></button>
                            </div>
                        </div>
                        <div className="flex flex-col text-2xl">
                            <h3 className="text-lg text-azul">Email</h3>
                             <div className="pl-1 flex border border-azul rounded-md text-azul">
                                <input value={fieldValues.email || user?.email} onChange={(e) => handleFieldChange('email', e.target.value)} className="outline-none bg-azul-50 p-1"/>
                                <button data-field="email"  disabled={!fieldValues.email.trim()} onClick={handleProfileFieldEdit} type="button"><BiEdit/></button>
                            </div>
                        </div>
                    </div>
                    <div className="p-3"></div>
                    <div className="flex mt-5 items-center justify-around w-full">
                        <div className="flex flex-col text-2xl">
                            <h3 className="text-lg text-azul">CPF do titular</h3>
                            <div className="flex pl-1 border border-azul rounded-md text-azul"> 
                                <input  value={fieldValues.cpf || user?.cpf} onChange={(e) => handleFieldChange('cpf', e.target.value)} className="outline-none bg-azul-50 p-1"/>
                                <button data-field="cpf"  disabled={!fieldValues.cpf.trim()} onClick={handleProfileFieldEdit} type="button"><BiEdit/></button>
                            </div>
                        </div>
                        <div className="flex flex-col text-2xl">
                            <h3 className="text-lg text-azul">Alterar senha</h3>
                            <div className="flex pl-1 border border-azul rounded-md text-azul"> 
                                <input type="password" defaultValue="*********" onChange={(e) => handleFieldChange('password', e.target.value)} className="outline-none bg-azul-50 p-1"/>
                                <button data-field="password"  disabled={!fieldValues.password.trim()} onClick={handleProfileFieldEdit} type="button"><BiEdit/></button>
                            </div>
                        </div>                        
                    </div>
                    <div className="p-3"></div>
                    <div className="flex mt-5 items-center justify-around w-full">
                        
                        <div className="flex flex-col text-2xl">
                            <h3 className="text-lg text-azul">Tel. Contato</h3>
                            <div className="pl-1 flex border border-azul rounded-md text-azul">
                                <input value={fieldValues.phone || user?.phone} onChange={(e) => handleFieldChange('phone', e.target.value)} className="outline-none bg-azul-50 p-1"/>
                                <button data-field="phone"  disabled={!fieldValues.phone.trim()} onClick={handleProfileFieldEdit} type="button"><BiEdit/></button>
                            </div>
                        </div>
                        <div className="flex flex-col text-2xl">
                            <h3 className="text-lg text-azul">Ocupação</h3>
                            <div className="pl-1 flex border border-azul rounded-md text-azul">
                                <input value={user?.isAdmin ? "Funcionário" : "Aluno"} disabled className="p-1 mr-5 w-72"/>
                            </div>
                        </div>
                    </div>
                    <div className="p-3 mt-8 shadow-lg"></div>
                    <div className="flex gap-10 mt-5 justify-center w-full">
                        <div className="flex flex-col justify-center items-cejustify-center">
                            <h3 className="text-3xl text-azul font-bold mb-5">Plano do perfil atual</h3>
                            <select className="flex justify-center outline-none items-center border-2 text-azul border-azul rounded-md h-10 " value={currentPlan ? currentPlan.id : "no-plan"} onChange={handlePlanChange}>
                                <option value="no-plan">Cliente não tem plano</option>
                                {plans.map((plan) => (
                                    <option
                                        key={plan.id}
                                        value={plan.id}
                                    >
                                        {`${plan.name}/R$:${plan.price}/${plan.validity}`}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                        </div>
                    </div>
                </main>
            </div>
            <DeleteUserModal isOpen={isModalDeleteOpen} onClose={handleCloseModalDelete} userId={userId}/>
        </div>
    )
}

export default ProfileUser

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