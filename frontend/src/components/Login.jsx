import React, { useState } from 'react';
import { getauthaxios } from '../utility/Request';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [user, setuser] = useState({username: '', password: ''});
  const handlechange=(e)=>{
    const {name,value} = e.target;
    setuser({
      ...user,
      [name]: value,
    });
  } 

  const navigate = useNavigate();
  const handlesubmit=async()=>{
      console.log(user);
      const api = getauthaxios();
      const response = await api.post("/auth/login", user);
      console.log(response.data);
      localStorage.setItem("token", response.data.message);
      navigate("/Home")
  }
  return (
    <div className='bg-black min-h-screen flex items-center justify-center'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
        <h2 className='text-3xl font-bold text-center text-gray-800 mb-6'>BIDSURE</h2>
        <div className="space-y-4">
          <input name='username' onChange={handlechange}
            className="py-3 w-full rounded-md text-gray-700 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            type="text"
            placeholder="Enter Username"
          />
          <input name='password' onChange={handlechange}
            className="py-3 w-full rounded-md text-gray-700 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            type="password"
            placeholder="Enter Password"
          />
          <div className="flex justify-center">
            <button onClick={handlesubmit} className="mt-6 bg-[#00df9a] text-white py-2 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;