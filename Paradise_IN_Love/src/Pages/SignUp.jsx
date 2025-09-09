import React, { useState } from 'react';

const SignUp = () => {
  // Step 1: Manage form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const API_URL = import.meta.env.VITE_RENDER;
  const [message, setMessage] = useState(''); // Start with no message

  // Handle input change
  const handleChange = (e) => {
    setMessage(''); // Clear message on new input
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Step 2: Send POST request to backend signup API
      const response = await fetch(`${API_URL}/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Step 3: Handle success
        setMessage('Signup successful! You can now log in.');
        // Optional: redirect user or clear form
        setFormData({ name: '', email: '', password: '' });
      } else {
        // Step 3: Handle errors
        setMessage(data.error || 'Signup failed');
      }
    } catch (error) {
      setMessage('Error connecting to server');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white-100 px-4">
      <div className="flex flex-col md:flex-row w-full max-w-3xl bg-white/70 backdrop-blur-md rounded-lg shadow-md overflow-hidden">
        {/* Left Side */}
        <div className="md:w-2/5 w-full flex flex-col justify-between p-6 bg-gray-200/70 backdrop-blur-md text-gray-800">
          <div>
            <h1 className="text-2xl font-bold mb-2">Paradies In Love</h1>
            <p className="mb-1 text-sm">Hello There!</p>
            <p className="mb-1 text-sm">Create your account</p>
            <p className="mb-3 text-sm">Join us and stay connected</p>
          </div>
          <img
            src="src/assets/img1.png"
            alt="Signup Illustration"
            className="w-full h-auto mt-4 rounded"
          />
        </div>

        {/* Right Side */}
        <div className="md:w-3/5 w-full p-6">
          <h2 className="text-lg text-center font-serif font-bold mb-4 text-gray-800">Sign Up</h2>

          {/* Show message */}
          {message && <p className="text-center mb-4 text-red-600">{message}</p>}

          {/* Updated form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="font-serif font-bold block text-sm mb-1 text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="font-serif font-bold block text-sm mb-1 text-gray-700">
                Email Address
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
            <div className="mb-3">
              <label htmlFor="password" className="font-serif font-bold block text-sm mb-1 text-gray-700">
                Password
              </label>
              <input
                type="password"
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
              Sign Up
            </button>
            <p className="text-sm mt-3 text-center text-gray-700">
              Already have an account?{' '}
              <a href="/" className="text-gray-600 underline hover:text-gray-800">
                SignIn
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
