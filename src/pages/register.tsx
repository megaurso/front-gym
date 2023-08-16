import CardRegister from "@/components/cardRegister";
import Header from "@/components/hearder";

export default function Home() {
  return (
    <div className="w-screen h-screen flex  relative bg-cover bg-center bg-no-repeat bg-[url('/happy.jpg')]">
      <div className="container mx-auto p-6 rounded-lg shadow-lg flex flex-col items-center">
        <Header/>
        <CardRegister/>
      </div>
    </div>
  );
}
