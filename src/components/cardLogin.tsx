import { useAuth } from "@/contexts/authContext"
import { UserData, loginSchema } from "@/schema/user.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import Link from "next/link"
import { useForm } from "react-hook-form"

const CardLogin =()=>{
    const {register , handleSubmit} = useForm<UserData>({
      resolver:zodResolver(loginSchema)
    })

    const {login} = useAuth()

    const onFormSubmit = (formData: UserData)=>{
      login(formData)
    }
    return (
        <div className="p-6 rounded-3xl backdrop-blur-lg shadow-lg w-80 mt-56 border border-white">
          <Image src={"/logo.svg"} width={100} height={50} alt="logo" className="mb-2"></Image>
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <input className="w-full mb-3 px-3 py-2 border rounded bg-transparent outline-none text-white" type="email" placeholder="Email" {...register("email")} required/>
            <input className="w-full mb-3 px-3 py-2 border rounded bg-transparent outline-none text-white" type="password" placeholder="Password" {...register("password")} required/>
            <Link href={"/register"} className="text-white text-xs flex justify-end mb-2">Não tem uma conta? <span className="pl-1 text-blue-500">Registre agora</span></Link>
            <button className="w-full bg-yellow-300 text-blue-950 py-2 rounded hover:bg-blue-700 hover:text-white transition duration-300" type="submit">Login</button>
          </form>
        </div>
    )
}

export default CardLogin