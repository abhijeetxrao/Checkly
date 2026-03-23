import axios from "axios"
import React,{useState} from "react"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

function Register() {
  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const navigateTo = useNavigate();

  const handleSingup = async (e: React.FormEvent<HTMLFormElement>)=>{
    console.log(e);
    e.preventDefault();
    try {
      const {data}=await axios.post("http://localhost:3000/auth/register",{
      username, email, password
    },{
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    },
      
    )
    toast.success(data.message)
    localStorage.setItem("jwt", data.token)
    setEmail("")
    setPassword("")
    setUsername("")
    navigateTo("/login")
    } catch (error:unknown) {
      toast.error(error.response.data.message||"User registration failed!")
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-black text-center text-xl semi-bold mb-4">Signup</h1>
        <form onSubmit={handleSingup}>
          {/* //Username */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold">
              Username: 
            </label>
            <input className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            type='text'
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            placeholder="Type username"
            />
          </div>
          {/* //Email */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold">
              Email: 
            </label>
            <input className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            type='text'
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="Type email"
            />
          </div>
          {/* //Password */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold">
              Password:
            </label>
            <input className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            type='text'
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            placeholder="Type password"
            />
          </div>
          <button type="submit" className="w-full py-3 rounded-lg  bg-blue-500 text-white cursor-pointer">Register</button>
          <p className="w-full text-center text-lg mt-4">Already have an account? <Link to = "/login" className="text-blue-600">Login</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Register