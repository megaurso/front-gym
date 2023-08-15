const CardLogin =()=>{
    return (
        <div className="bg-white p-6 rounded-3xl shadow-md w-80 mt-56">
          <h2 className="text-2xl font-semibold mb-4">Login</h2>
          <form>
            <input className="w-full mb-3 px-3 py-2 border rounded" type="email" placeholder="Email" required/>
            <input className="w-full mb-3 px-3 py-2 border rounded" type="password" placeholder="Password" required/>
            <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300" type="submit">Login</button>
          </form>
        </div>
    )
}

export default CardLogin