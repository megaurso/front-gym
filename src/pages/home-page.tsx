import CardUser from "@/components/cardUser"
import Card from "@/components/cardUser"
import HeaderHomes from "@/components/headers/header.homes"
import { UserInfoType } from "@/schema/user.schema"
import { getAllUser } from "@/services/api.requsitions"
import { GetServerSideProps } from "next"
import nookies, { parseCookies } from "nookies"
import { useEffect, useState } from "react"
import {LiaSearchSolid} from "react-icons/lia"

const HomePage = () => {
  const cookies = parseCookies()
  const token = cookies["user.token"]
  const userId = cookies["user.user_id"]
  const [users, setUsers] = useState<UserInfoType[]>([]);
  const [search, setSearch] = useState("");
  const [loading,setLoading] = useState(false)

  useEffect(()=>{
    const fetchData =async () => {
      setLoading(true)
      const allUser = await getAllUser(token)
      setUsers(allUser.data)
      setLoading(false)
    }
    fetchData()
  },[token])

    return (
        <div>
            <div className="font-montserrat mt-5 container mx-auto border border-gray-300 p-10 shadow-2xl flex flex-col bg-slate-100">
                <HeaderHomes href={"/profile"} linkText={"Perfil"}/>
                <main className="mt-7 border-t-4 rounded-sm border-blue-400">
                    <section className="flex justify-start space-x-10 shadow-2xl mt-7">
                        <h2 className="text-5xl text-azul mb-7 font-bold">Bem-vindo Bernardo!</h2>
                    </section>
                    <section>
                      <div className="flex items-center justify-between">
                        <div className="border text-7xl text-white rounded-lg p-3 cursor-pointer bg-azul">
                          <LiaSearchSolid/>
                        </div>
                        <input 
                          type="text" 
                          placeholder="Pesquisar cadastro" 
                          className="pl-2 text-3xl w-11/12 h-24 border-2 rounded-md outline-none bg-branco-90 border-aztext-azul" 
                          value={search} 
                          onChange={(e) => setSearch(e.target.value)}
                          />
                      </div>
                      <div className="flex gap-5">
                        <div className="w-10/12 border-2 h-12 p-4 flex justify-between items-center text-2xl text-gray-400 border-azul mt-5 rounded-md">
                          <span className="w-3/6">Nome de cadastro</span>
                          <span className="w-1/6" ><span className="text-azul text-2xl pr-3">|</span>N° de cpf</span>
                          <span className="w-1/6"><span className="text-azul text-2xl pr-3">|</span>Ocupação</span>
                          <span className="w-1/6"><span className="text-azul text-2xl pr-3">|</span>Status</span>
                        </div>
                          <div className="w-2/12 border-2 h-12 flex items-center justify-center text-2xl  text-gray-400 border-azul mt-5 rounded-md">
                            <span>Treino</span>
                          </div> 
                      </div>
                      <div className="flex gap-5">
                        <ul className="w-10/12 border-2 border-azul rounded-md mt-5">
                        {users
                          .filter(
                            (user) =>
                              user.name.toLowerCase().includes(search.toLowerCase()) ||
                              user.cpf.includes(search)
                          )
                          .map((user) => (
                            <li key={user.id}>
                              <CardUser
                                cpf={user.cpf}
                                name={user.name}
                                isAdmin={user.isAdmin}
                                working_out={user.ativo}
                              />
                            </li>
                          ))}
                        </ul>
                          <ul className="w-2/12 border-2 flex flex-col justify-between text-2xl text-gray-400 border-azul mt-5 rounded-md">
                          {users
                          .filter(
                            (user) =>
                              user.name.toLowerCase().includes(search.toLowerCase()) ||
                              user.cpf.includes(search)
                          )
                          .map((user) => (
                            <li className="flex border-b-2 border-azul rounded-sm items-center justify-center w-full h-16" key={user.id}>
                              <button className="text-xl hover:text-2xl">Começar treino</button>
                            </li>
                          ))}
                          </ul> 
                      </div>
                    </section>
                </main>
            </div>
        </div>
    )
}


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


export default HomePage