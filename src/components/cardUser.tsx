import { UserCardProps } from "@/interfaces/user.interface"
import {FaUser} from "react-icons/fa"

const CardUser:React.FC<UserCardProps> = ({name,cpf,isAdmin,working_out}) =>{
    const userStatus = isAdmin ? "Funcionário" : "Aluno";
    const userActivity = working_out ? "Em treino" : "Offline";
    return (
        <div className="flex border border-azul rounded-sm items-start w-full ">
            <div className="w-full border-b-2 h-14 p-5 flex justify-between items-center text-2xl text-gray-400 border-azul mt-2">
                <h3 className="flex text-azul items-center gap-2 w-3/6"><div className="bg-azul rounded-md flex justify-center items-center p-2 text-amarelo text-2xl"><FaUser/></div> {name}</h3>
                <h3 className="w-1/6 text-azul"><span className="text-azul text-2xl pr-3">|</span>{cpf}</h3>
                <h3 className="w-1/6 text-azul"><span className="text-azul text-2xl pr-3">|</span>{userStatus}</h3>
                <h3 className="w-1/6 text-azul"><span className="text-azul text-2xl pr-3">|</span>{userActivity}</h3>
            </div>
        </div>
    )
}

export default CardUser