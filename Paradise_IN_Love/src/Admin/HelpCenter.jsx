import React from "react";
import { Link } from "react-router-dom";

const HelpCenter = () => {
  return (
    <div className="min-h-screen bg-pink-50 flex flex-col">
      {/* Header Section */}
      <div className="flex justify-between items-center p-6">
        <div>
          <h2 className="text-3xl font-bold text-stone-700">Help Center</h2>
          <p className="text-gray-600">
            Find answers to your questions or contact support.
          </p>
        </div>
        <Link to="/dashboard" title="Go to Dashboard">
          <div className="bg-white rounded-full p-2 shadow hover:shadow-md transition">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8" />
          </div>
        </Link>
      </div>

      {/* Main Content */}
      <main className="flex-grow p-6">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 space-y-8">
          <section>
            <h3 className="text-xl font-semibold mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg hover:bg-pink-50 transition">
                <h4 className="font-medium">How do I reset my password?</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Go to Settings &gt; Change Password, enter your current password and a new one, then save changes.
                </p>
              </div>
              <div className="p-4 border rounded-lg hover:bg-pink-50 transition">
                <h4 className="font-medium">Where can I track my orders?</h4>
                <p className="text-sm text-gray-600 mt-1">
                  You can track all your orders under the “Orders” section in your dashboard.
                </p>
              </div>
              <div className="p-4 border rounded-lg hover:bg-pink-50 transition">
                <h4 className="font-medium">How do I contact support?</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Scroll down and use the contact form or email us directly at support@paradiseinlove.com.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-4">Contact Support</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  rows="4"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="How can we help you?"
                />
              </div>
              <button
                type="submit"
                className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition"
              >
                Submit
              </button>
            </form>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-pink-200 p-4 text-center text-pink-900">
        &copy; 2025 Paradise in Love
      </footer>
    </div>
  );
};

export default HelpCenter;
