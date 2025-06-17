import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';  // <-- uncomment this

const SignUp = () => {
  const navigate = useNavigate();  // <-- useNavigate hook
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post('http://localhost:8080/api/user/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      }, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);  // e.g. "User register successfully"
        
        // Navigate after 2 seconds delay
        setTimeout(() => {
          navigate('/signin');  // Adjust path to your SignIn route
        }, 2000);

      } else {
        toast.error(res.data.message || "Registration failed!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed!");
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white-100 px-4">
      <div className="flex flex-col md:flex-row w-full max-w-3xl bg-white/70 backdrop-blur-md rounded-lg shadow-md overflow-hidden">
        <div className="md:w-2/5 w-full flex flex-col justify-between p-6 bg-gray-200/70 backdrop-blur-md text-gray-800">
          <div>
            <h1 className="text-2xl font-bold mb-2">Paradies In Love</h1>
            <p className="mb-1 text-sm">Hello There!</p>
            <p className="mb-1 text-sm">Create your account</p>
            <p className="mb-3 text-sm">Join us and stay connected</p>
          </div>
          <img src="src/assets/img1.png" alt="Signup Illustration" className="w-full h-auto mt-4 rounded" />
        </div>

        <div className="md:w-3/5 w-full p-6">
          <h2 className="text-lg text-center font-serif font-bold mb-4 text-gray-800">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="font-serif font-bold block text-sm mb-1 text-gray-700">Full Name</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="font-serif font-bold block text-sm mb-1 text-gray-700">Email Address</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="font-serif font-bold block text-sm mb-1 text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="font-serif font-bold block text-sm mb-1 text-gray-700">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <button
              type="submit"
              className="font-serif font-bold w-full py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors"
            >
              Sign Up
            </button>
            <p className="text-sm mt-3 text-center text-gray-700">
              Already have an account? <Link to="/signin" className="text-rose-500 underline hover:text-gray-800">SignIn</Link>
            </p>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
