import { TextField } from '@mui/material';
import React, { useState } from 'react';
import { getauthaxios } from '../utility/Request';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    mobile: '',
    role: 'CONTRACTOR'
  });
const [number, setNumber] = useState('')
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    console.log('Form data submitted:', formData);
    const api = getauthaxios();
    const response = await api.post("/auth/register", formData);
    console.log(response.data)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">BIDSURE</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label htmlFor="username" className="block text-gray-700">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="py-3 w-full rounded-md text-gray-700 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="block text-gray-700">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="py-3 w-full rounded-md text-gray-700 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="block text-gray-700">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="py-3 w-full rounded-md text-gray-700 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="form-group">
            <label htmlFor="Phone" className="block text-gray-700">Phone:</label>
            <input
              type="text"
              id='phone'
              value={formData.mobile}
              name='mobile'
              onChange={handleChange}
              required
              className="py-3 w-full rounded-md text-gray-700 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button type="submit" className="w-full bg-[#00df9a] text-black py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;