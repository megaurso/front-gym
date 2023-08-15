import Header from "@/components/hearder";
import { BsWhatsapp } from 'react-icons/bs';
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen h-screen flex  relative bg-cover bg-center bg-no-repeat bg-[url('/happy.jpg')]">
      <div className="container mx-auto p-6 rounded-lg shadow-lg flex flex-col">
        <Header/>
        <div className="flex justify-between h-5/6 w-full items-end">
          <div className="text-yellow-300">
            <p className="uppercase text-5xl font-bold">o melhor!</p>
            <p className="text-3xl">sistema para atender diversos nichos fitness</p>
          </div>
          <div className="flex h-1/5 justify-end space-x-4 items-end text-yellow-300">
            <p className="w-3/5 text-3xl text-end font-montserrat">Encontre nossos planos pelo whatsapp</p>
            <Link className="text-7xl" href="https://wa.me/+5562986240897" target="_blank" rel="noopener noreferrer" >
              <BsWhatsapp />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
