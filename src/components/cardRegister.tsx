
const RegisterLogin =()=>{
    return (
        <div className="p-6 rounded-3xl backdrop-blur-lg shadow-lg w-80 mt-40 brightness-110 border border-white">
          <h2 className="text-2xl text-yellow-300 font-semibold mb-4">Bearfit</h2>
          <form>
            <input className="w-full mb-3 px-3 py-2 border rounded bg-transparent outline-none text-white" placeholder="Name" required/>
            <input className="w-full mb-3 px-3 py-2 border rounded bg-transparent outline-none  text-white" type="email" placeholder="Email" required/>
            <input className="w-full mb-3 px-3 py-2 border rounded bg-transparent outline-none  text-white" type="password" placeholder="Password" required/>
            <input className="w-full mb-3 px-3 py-2 border rounded bg-transparent outline-none  text-white"  placeholder="Cpf" type="text" required/>
            <input className="w-full mb-3 px-3 py-2 border rounded bg-transparent outline-none  text-white"  placeholder="Telefone" type="text" required/>
            <button className="w-full bg-yellow-300 text-blue-950 py-2 rounded hover:bg-blue-700 hover:text-white transition duration-300" type="submit">Registrar</button>
          </form>
        </div>
    )
}

export default RegisterLogin