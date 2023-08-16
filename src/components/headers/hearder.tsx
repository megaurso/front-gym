import Link from "next/link"

const Header = () =>{
    return (
        <header className="flex justify-between w-full mb-4 font-bold">
          <Link href={"/"} className="text-white text-5xl">Bearfit</Link>
          <div className="flex justify-between w-2/6">
            <Link href={"/"} className="button">Inicio</Link>
            <Link href={"/login"} className="button">Login</Link>
            <Link href={"/register"} className="button">Registro</Link>
          </div>
        </header>
    )
}

export default Header