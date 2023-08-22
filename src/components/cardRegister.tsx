import { UserData, userSchema } from "@/schema/user.schema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuth } from "@/contexts/authContext"

const CardRegister =()=>{
    const {register , handleSubmit,formState: { errors }} = useForm<UserData>({
      resolver:zodResolver(userSchema)
    })

    const {register:registerUser} = useAuth()

    const onFormSubmit = (formData: UserData)=>{
      formData.isAdmin = true
      registerUser(formData)
    } 

    return (
        <div className="p-6 rounded-3xl backdrop-blur-lg shadow-lg w-80 mt-40 brightness-110 border border-white">
          <h2 className="text-2xl text-yellow-300 font-semibold mb-4">Bearfit</h2>
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <input className="w-full mb-3 px-3 py-2 border rounded bg-transparent outline-none text-white" placeholder="Name" {...register("name")} required/>
            {errors.name && <p className="text-amarelo mb-2">{errors.name.message}</p>}
            <input className="w-full mb-3 px-3 py-2 border rounded bg-transparent outline-none  text-white" type="email" placeholder="Email" {...register("email")} required/>
            {errors.email && <p className="text-amarelo mb-2">{errors.email.message}</p>}
            <input className="w-full mb-3 px-3 py-2 border rounded bg-transparent outline-none  text-white" type="password" placeholder="Password" {...register("password")} required/>
            {errors.password && <p className="text-amarelo mb-2">{errors.password.message}</p>}
            <input className="w-full mb-3 px-3 py-2 border rounded bg-transparent outline-none  text-white"  placeholder="Cpf" type="text" {...register("cpf")} required/>
            {errors.cpf && <p className="text-amarelo mb-2">{errors.cpf.message}</p>}
            <input className="w-full mb-3 px-3 py-2 border rounded bg-transparent outline-none  text-white"  placeholder="Telefone" type="text" {...register("phone")} required/>
            <button className="w-full bg-yellow-300 text-blue-950 py-2 rounded hover:bg-blue-700 hover:text-white transition duration-300" type="submit">Registrar</button>
          </form>
        </div>
    )
}

export default CardRegister

