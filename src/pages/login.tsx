import CardLogin from "@/components/cardLogin";
import Header from "@/components/headers/hearder";

const Login = () =>{
  return (
    <div className="w-screen h-screen flex  relative bg-cover bg-center bg-no-repeat bg-[url('/happy.jpg')]">
      <div className="container mx-auto p-6 rounded-lg shadow-lg flex flex-col items-center">
        <Header/>
        <CardLogin/>
      </div>
    </div>

  );
}
export default Login