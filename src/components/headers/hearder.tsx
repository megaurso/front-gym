import Link from "next/link"
import Image from 'next/image';

const Header = () =>{
    return (
        <header className="flex justify-between w-full mb-4 font-bold">
          <Link href={"/home-page"}><Image src="logo.svg" alt="logo" width={300} height={300}/></Link>
          <div className="flex justify-between w-2/6">
            <Link href={"/"} className="button">Inicio</Link>
            <Link href={"/login"} className="button">Login</Link>
            <Link href={"/register"} className="button">Registro</Link>
          </div>
        </header>
    )
}

export default Header