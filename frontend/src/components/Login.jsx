import React from 'react';

const Login = () => {
  return (
    <div className='bg-black min-h-screen flex items-center justify-center'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
        <h2 className='text-3xl font-bold text-center text-gray-800 mb-6'>BIDSURE</h2>
        <div className="space-y-4">
          <input
            className="py-3 w-full rounded-md text-gray-700 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            type="email"
            placeholder="Enter Email"
          />
          <input
            className="py-3 w-full rounded-md text-gray-700 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            type="password"
            placeholder="Enter Password"
          />
          <div className="flex justify-center">
            <button className="mt-6 bg-[#00df9a] text-white py-2 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;