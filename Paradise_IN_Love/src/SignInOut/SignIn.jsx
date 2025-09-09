import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const API_URL = import.meta.env.VITE_RENDER;
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_URL}/user/login`, {
        email: formData.email,
        password: formData.password,
      }, {
        withCredentials: true, // Important to send/receive cookies
      });

      if (res.data.success) {
        toast.success(res.data.message || 'Login successful!');
        // Redirect after 1.5 seconds
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        toast.error(res.data.message || 'Login failed!');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed!');
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="flex flex-col md:flex-row w-full max-w-3xl bg-white rounded-lg shadow-md overflow-hidden">

        {/* Left Side */}
        <div className="md:w-2/5 w-full flex flex-col justify-between p-6 bg-gray-200 text-gray-800">
          <div>
            <h1 className="text-2xl font-bold mb-2">Paradise In Love</h1>
            <p className="mb-1 text-sm">Welcome Back</p>
            <p className="mb-1 text-sm">Please login to your account</p>
            <p className="mb-3 text-sm">Login yourself to stay connected to us</p>
          </div>
          <img
            src="src/assets/img1.png"
            alt="Login Illustration"
            className="w-full h-auto mt-4 rounded"
          />
        </div>

        {/* Right Side */}
        <div className="md:w-3/5 w-full p-6">
          <h2 className="font-serif font-bold text-lg text-center mb-4 text-gray-800">Sign In</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="font-serif font-bold block text-sm mb-1 text-gray-700">
                Email address
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="font-serif font-bold block text-sm mb-1 text-gray-700">
                Password
              </label>
              <input
                type="text"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
                required
              />
            </div>
            <button
              type="submit"
              className="font-serif font-bold w-full py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors"
            >
              Sign In
            </button>
            <p className="text-sm mt-3 text-center text-gray-600 hover:underline">
              <Link to="/forgot-password">Forgot Password?</Link>
            </p>
            <p className="text-sm mt-4 text-center text-gray-700">
              Don't have an account? <Link to="/signup" className="text-rose-500 underline">Sign up</Link>
            </p>
          </form>
        </div>
      </div>
      <ToastContainer autoClose={50} />
    </div>
  );
};

export default SignIn;


