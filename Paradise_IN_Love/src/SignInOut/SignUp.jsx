import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const API_URL = import.meta.env.VITE_RENDER;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const handleChange = e => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    // Clear errors when user starts typing
    if (id === 'password') {
      setPasswordError('');
    }
    if (id === 'confirmPassword') {
      setConfirmPasswordError('');
    }
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return 'Password must be at least 8 characters long';
    }
    if (!hasUpperCase) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!hasLowerCase) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!hasNumber) {
      return 'Password must contain at least one number';
    }
    if (!hasSpecialChar) {
      return 'Password must contain at least one special character';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password strength
    const passwordValidationError = validatePassword(formData.password);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      toast.error(passwordValidationError);
      return;
    }

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setConfirmPasswordError("Passwords do not match!");
      toast.error("Passwords do not match!");
      return;
    }

    // Only proceed with registration if all validations pass
    try {
      const res = await axios.post(`${API_URL}/user/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      }, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        setTimeout(() => {
          navigate('/signin');
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
          <div className="text-xs text-gray-500 mt-1">
            Password must contain:
            <ul className="list-disc pl-5">
              <li>At least 6 characters</li>
              <li>One uppercase letter</li>
              <li>One lowercase letter</li>
              <li>One number</li>
              <li>One special character</li>
            </ul>
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
                required
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
                required
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
                required
              />
              {passwordError && (
                <p className="text-red-500 text-xs mt-1">{passwordError}</p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="font-serif font-bold block text-sm mb-1 text-gray-700">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
              {confirmPasswordError && (
                <p className="text-red-500 text-xs mt-1">{confirmPasswordError}</p>
              )}
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
      <ToastContainer autoClose={50} />
    </div>
  );
};

export default SignUp;   