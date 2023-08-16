import HeaderHomes from "@/components/headers/header.homes"
import { GetServerSideProps } from "next"
import {BiEdit} from "react-icons/bi"
import nookies from "nookies"

const Profile = () =>{
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
                                <input defaultValue="Bernardo" />
                                <BiEdit/>
                            </div>
                        </div>
                        <div className="flex flex-col text-2xl">
                            <h3 className="text-3xl">Email de exibição</h3>
                             <div className="pl-1 flex cursor-pointer">
                                <input defaultValue="email12345@.com" />
                                <BiEdit/>
                            </div>
                        </div>
                    </div>
                    <div className="p-3 shadow-lg"></div>
                    <div className="flex mt-5 items-center justify-around w-full">
                        <div className="flex flex-col text-2xl">
                            <h3 className="text-3xl">Cpf do titular</h3>
                            <div className="flex pl-1 cursor-pointer"> 
                                <input defaultValue="56245687615" />
                                <BiEdit/>
                            </div>
                        </div>
                        <div className="flex flex-col text-2xl">
                            <h3 className="text-3xl">Telefone do titular</h3>
                            <div className="pl-1 flex cursor-pointer">
                                <input defaultValue="62986240897" />
                                <BiEdit/>
                            </div>
                        </div>
                    </div>
                    <div className="p-3 shadow-lg"></div>
                    <div className="flex mt-5 items-center justify-around w-full">
                        <div className="flex flex-col text-2xl">
                            <h3 className="text-3xl">Alterar senha</h3>
                            <div className="flex pl-1 cursor-pointer"> 
                                <input defaultValue="*********" />
                                <BiEdit/>
                            </div>
                        </div>
                        <div className="flex flex-col text-2xl">
                            <h3 className="text-3xl">Cargo</h3>
                            <div className="pl-1 flex cursor-pointer">
                                <input defaultValue="Administrador" />
                                <BiEdit/>
                            </div>
                        </div>
                    </div>
                    <div className="p-3 shadow-lg"></div>
                    <div className="flex flex-col mt-5 justify-center items-center">
                        <h3 className="text-3xl">Plano do perfil atual</h3>
                        <select className="text-3xl appearance-none mt-5">
                            <option>Arrumar emprego!</option>
                        </select>
                    </div>
                </main>
            </div>
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
      props:{}
    }
}