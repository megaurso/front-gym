import Card from "@/components/cardUser"
import HeaderHomes from "@/components/headers/header.homes"
import { GetServerSideProps } from "next"
import nookies from "nookies"


const HomePage = () => {

    return (
        <div className="w-screen h-screen">
            <div className="container mx-auto p-6 rounded-lg shadow-lg flex flex-col">
                <HeaderHomes href={"/profile"} linkText={"Perfil"}/>
                <main className="mt-20">
                    <section className="flex justify-start space-x-10 shadow-2xl">
                        <h2 className="text-5xl">Bem vindo Bernardo!</h2>
                    </section>
                    <section>
                      <input type="text" placeholder="Procurar usuário" className="w-full h-10 border border-gray-500" />
                      <Card/>
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