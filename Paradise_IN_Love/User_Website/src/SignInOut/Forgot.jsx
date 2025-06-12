// ForgotPassword.jsx
import React from 'react';

const Forgot = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-center text-gray-800 mb-4">Forgot Password</h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Enter your email address and we’ll send you instructions to reset your password.
        </p>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors font-bold"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default Forgot;