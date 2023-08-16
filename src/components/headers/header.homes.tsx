import { HeaderProps } from "@/interfaces/headerHomes";
import Link from "next/link"
import { destroyCookie } from "nookies";


const HeaderHomes:React.FC<HeaderProps> = ({ href, linkText }) => {

  const handleLogout = () =>{
    destroyCookie(null, "user.token");
  }

    return (
        <header className="flex justify-between w-full mb-4 font-bold">
          <Link href={"/home-page"} className="text-5xl">Bearfit</Link>
          <div className="flex justify-evenly w-2/6">
            <Link href={href} className="buttonHomes">{linkText}</Link>
            <Link href={"/"} onClick={handleLogout} className="buttonHomes">Sair</Link>
          </div>
        </header>
    )
}

export default HeaderHomes