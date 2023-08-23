import CardUser from "@/components/cardUser"
import HeaderHomes from "@/components/headers/header.homes"
import UserModal from "@/components/modal/userModal"
import { InfoUserEdit, UserInfoType } from "@/schema/user.schema"
import { getAllUser, getUser, startingTraining, stopTraining } from "@/services/api.requsitions"
import { GetServerSideProps } from "next"
import Link from "next/link"
import nookies, { parseCookies } from "nookies"
import { useEffect, useState } from "react"
import {LiaSearchSolid} from "react-icons/lia"

const HomePage = () => {
  const cookies = parseCookies();
  const token = cookies["user.token"];
  const userId = cookies["user.user_id"];
  let currentPage = 1;

  const itemsPerPage = 5;
  const [users, setUsers] = useState<UserInfoType[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingNext, setLoadingNext] = useState(false);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [prevPageUrl, setPrevPageUrl] = useState<string | null>(null);
  const [createdId, setCreatedId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState<InfoUserEdit>();

  useEffect(() => {
    fetchData(currentPage);
    
    const user = async () =>{
      const userData = await getUser(token, userId)
      setUser(userData)
    }
    user()
    

  }, [token,loadingNext,userId]);


  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleStartTraining = async (token:string,id:string) => {
    setLoadingNext(true)
    try {
      const response = await startingTraining(token, id);
      setCreatedId(response.id)
      setLoadingNext(false);
    } catch (error) {
      console.log(error);
    }
  }

  const handleStopTraining =async () => {
    setLoadingNext(true)
    if (createdId !== null) {
      try {
        await stopTraining(token,createdId)
        setCreatedId(null)
        setLoadingNext(false);
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(()=>{
    
  },[loading])
  
  const fetchData = async (page: number) => {
    setLoading(true)
    const allUserData = await getAllUser(token, page);
    setUsers(allUserData.data);
    setNextPageUrl(allUserData.paginate.next_page_url);
    setPrevPageUrl(allUserData.paginate.prev_page_url);
  };

  const handleNextPage = async () => {
    if (nextPageUrl) {
      setLoading(true);
      await fetchData(currentPage + 1);
      setLoading(false);
    }
  };

  const handlePreviousPage = async () => {
    if (prevPageUrl) {
      setLoading(true);
      await fetchData(currentPage - 1);
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.cpf.includes(search)
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedUsers = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage
  );  

  return (
    <div>
      <div className="font-montserrat mt-5 container mx-auto border border-gray-300 p-10 shadow-2xl flex flex-col">
        <HeaderHomes href={"/profile"} linkText={"Perfil"}/>
          <main className="mt-7 border-t-4 rounded-sm border-blue-400">
            <section className="flex justify-between space-x-10 shadow-2xl mt-7">
              <h2 className="text-5xl text-azul mb-7 font-bold">Bem-vindo {user?.name}</h2>
              <button onClick={handleOpenModal} className="mr-5 p-5 h-16 hover:bg-azul hover:text-branco-90 rounded-md flex justify-center items-center bg-branco-90">Criar novo usuário</button>   
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
                        <span className="w-1/6" ><span className="text-azul text-2xl pr-3">|</span>N° de CPF</span>
                        <span className="w-1/6"><span className="text-azul text-2xl pr-3">|</span>Ocupação</span>
                        <span className="w-1/6"><span className="text-azul text-2xl pr-3">|</span>Status</span>
                      </div>
                        <div className="w-2/12 border-2 h-12 flex items-center justify-center text-2xl  text-gray-400 border-azul mt-5 rounded-md">
                          <span>Treino</span>
                        </div> 
                    </div>
                      <div className="flex gap-5">
                        <ul className="w-10/12 border-2 border-azul rounded-md mt-5">
                          {displayedUsers.map((user) => (
                            <li className="hover:border-amarelo hover:border-4" key={user.id}>
                              <Link href={`/profile/${user.id}`}>
                                <CardUser
                                  cpf={user.cpf}
                                  name={user.name}
                                  isAdmin={user.isAdmin}
                                  working_out={user.working_out}
                                />
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <ul className="w-2/12 border-2 flex flex-col justify-between text-2xl text-gray-400 border-azul mt-5 rounded-md">
                          {displayedUsers.map((user) => (
                            <li className="flex border-b-2 border-azul rounded-sm items-center justify-center w-full h-16" key={user.id}>
                              <button onClick={()=> handleStartTraining(token, user.id)} className="text-xl text-amarelo hover:text-2xl">Começar treino</button>
                              <button onClick={handleStopTraining} className="text-xl text-red-600 hover:text-2xl">Parar treino</button>
                            </li>
                          ))}
                        </ul> 
                      </div>
                    <div className="flex justify-center">
                  <div className="mt-5">
                    <button
                      onClick={handlePreviousPage}
                      disabled={!prevPageUrl}
                      className="mr-3 px-4 py-2 rounded-md bg-gray-200  hover:bg-azul hover:text-branco-90"
                    >
                      Página Anterior
                    </button>
                    <button
                      onClick={handleNextPage}
                      disabled={!nextPageUrl}
                      className="ml-3 px-4 py-2 rounded-md bg-gray-200 hover:bg-azul hover:text-branco-90"
                    >
                      Próxima Página
                    </button>
                  </div>
            </div>
          </section>
        </main>
      </div>
      <UserModal isOpen={isModalOpen} onClose={handleCloseModal} />
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