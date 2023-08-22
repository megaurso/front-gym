import { HeaderProps } from "@/interfaces/headerHomes";
import Link from "next/link"
import { destroyCookie } from "nookies";
import Image from 'next/image';


const HeaderHomes:React.FC<HeaderProps> = ({ href, linkText }) => {

  const handleLogout = () =>{
    destroyCookie(null, "user.token");
    destroyCookie(null, "user.user_id");
  }

    return (
        <header className="flex justify-between w-full mb-4 font-bold">
          <Link href={"/home-page"}><Image src="logo.svg" alt="logo" width={300} height={300}/></Link>
          <div className="flex w-2/6">
            <Link href={href} className="buttonHomes">{linkText}</Link>
            <div className="pl-3 flex justify-center items-center text-azul text-4xl">|</div>
            <Link href={"/"} onClick={handleLogout} className="buttonHomes">Sair</Link>
          </div>
        </header>
    )
}

export default HeaderHomes