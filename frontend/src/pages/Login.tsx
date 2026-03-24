import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const api_url = "https://checkly-backend-lnx5.onrender.com"

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigateTo = useNavigate();
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!email || !password) {
    toast.error("All fields are required");
    return;
  }

  try {
    const { data } = await axios.post(
      `${api_url}/auth/login`,
      { email, password },
      { withCredentials: true }
    );

    console.log(data);
    toast.success(data.message||"LoggedIn Successfully!");
    localStorage.setItem("jwt",data.token)
    navigateTo('/todo')
  } catch (error: any) {
    toast.error(error.response?.data.message);
    console.log(error.response?.data); // 🔥 important
  }
};

  return (
    <div>
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-black text-center text-xl semi-bold mb-4">
            Login
          </h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Email:</label>
              <input
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {/* Password */}
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Password:</label>
              <input
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="w-full py-3 rounded-lg  bg-blue-500 text-white cursor-pointer">
              Login
            </button>
            <p className="w-full text-center text-lg mt-4">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
