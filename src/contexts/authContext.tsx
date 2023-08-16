import api from "@/services/api";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import { ReactNode,createContext, useContext } from "react"
import  Toast  from "../components/toast";
import { LoginData, UserData } from "@/schema/user.schema";



interface Props{
    children: ReactNode
}

interface authProviderData {
    register: (userData: UserData) => void;
    login: (loginData:LoginData) => void;
}

const AuthContext = createContext<authProviderData>({} as authProviderData)

export const AuthProvider = ({children}: Props)=>{
    const router = useRouter()

    const register = (userData:UserData)=>{
        api
        .post("/api/users", userData)
        .then(()=>{
            Toast({message: "Usuario cadastrado!", isSucess:true})
            router.push("/login")
        })
        .catch((err) => {
            console.log(err);
        
            if (err.response && err.response.data && err.response.data.errors) {
                const errorMessage = err.response.data.errors;
        
                if (errorMessage.includes('Email já cadastrado')) {
                    Toast({
                        message: 'O email já está em uso. Por favor, utilize outro email.',
                        isSucess: false
                    });
                } else if (errorMessage.includes('CPF já cadastrado')) {
                    Toast({
                        message: 'O CPF já está em uso. Por favor, utilize outro CPF.',
                        isSucess: false
                    });
                } else {
                    Toast({
                        message: 'Ocorreu um erro: ' + errorMessage,
                        isSucess: false
                    });
                }
            } else {
                Toast({
                    message: 'Ocorreu um erro ao processar a criação. Por favor, tente novamente mais tarde.',
                    isSucess: false
                });
            }
        });
    }
    const login =(loginData:LoginData)=>{
        api
        .post("/api/auth/login",loginData)
        .then((response)=>{
            setCookie(null,"user.token",response.data.token,{
                maxAge:60 * 60,
                path: "/"
            })
            setCookie(null, "user.admin", JSON.stringify(response.data.user), {
                maxAge: 60 * 60,
                path: "/"
            });
        })
        .then(()=>{
            Toast({message:'Seja bem vindo!',isSucess:true})
            router.push("/")
        })
        .catch((err)=>{
            console.log(err)
            Toast({message:"Email ou senha incorretas tente novamente!", isSucess:false})
        });
    }
    return <AuthContext.Provider value={{register,login}}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)